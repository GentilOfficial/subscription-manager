import { create } from 'zustand';
import { supabase } from './supabase';
import { getNextRenewalDate } from '../app/utils/dateUtils';

const STATUS_ORDER = { 'Active': 1, 'Paused': 2, 'Cancelled': 3 };

const sortSubscriptions = (subs) => {
  return [...subs].sort((a, b) => {
    const statusDiff = (STATUS_ORDER[a.status] || 99) - (STATUS_ORDER[b.status] || 99);
    if (statusDiff !== 0) return statusDiff;

    const nextA = getNextRenewalDate(a.renewalDate, a.interval);
    const nextB = getNextRenewalDate(b.renewalDate, b.interval);
    if (!nextA) return 1;
    if (!nextB) return -1;
    return nextA - nextB;
  });
};

async function getUid() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

export const useSubscriptionStore = create((set, get) => ({
  subscriptions: [],
  isLoading: true,
  isInitialized: false,
  error: null,

  init: async () => {
    if (get().isInitialized) return;
    
    await get().fetchSubscriptions();
    set({ isInitialized: true });
  },

  fetchSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*');

      if (error) throw error;
      set({ subscriptions: sortSubscriptions(data || []), isLoading: false });
    } catch (e) {
      console.error('Supabase error fetching docs:', e.message);
      set({ error: e.message, isLoading: false });
    }
  },

  addSubscription: async (sub) => {
    const previousSubs = get().subscriptions;
    try {
      const uid = await getUid();
      if (!uid) throw new Error('Not authenticated');

      const tempId = Math.random().toString(36).substring(7);
      const newSub = { ...sub, id: tempId, user_id: uid, created_at: new Date().toISOString() };
      set({ subscriptions: sortSubscriptions([newSub, ...previousSubs]) });

      const { id, user_id, ...rest } = sub;
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{ ...rest, user_id: uid }])
        .select()
        .single();

      if (error) throw error; 
      
      set({ 
        subscriptions: sortSubscriptions(get().subscriptions.map(s => s.id === tempId ? data : s))
      });
    } catch (e) {
      console.error('Failed to add subscription:', e);
      set({ subscriptions: previousSubs, error: e.message });
      throw e;
    }
  },

  updateSubscription: async (id, updatedFields) => {
    const previousSubs = get().subscriptions;
    try {
      set({
        subscriptions: sortSubscriptions(previousSubs.map(s => s.id === id ? { ...s, ...updatedFields } : s))
      });

      const { error } = await supabase
        .from('subscriptions')
        .update(updatedFields)
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.error('Failed to update subscription:', e);
      set({ subscriptions: previousSubs, error: e.message });
      throw e;
    }
  },

  deleteSubscription: async (id) => {
    const previousSubs = get().subscriptions;
    try {
      set({
        subscriptions: previousSubs.filter(s => s.id !== id)
      });

      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.error('Failed to delete subscription:', e);
      set({ subscriptions: previousSubs, error: e.message });
      throw e;
    }
  },

  importSubscriptions: async (importedSubs) => {
    try {
      const uid = await getUid();
      if (!uid) throw new Error('Not authenticated');

      const insertData = importedSubs.map(sub => {
        const { id, user_id, ...rest } = sub;
        return { ...rest, user_id: uid };
      });

      const { error } = await supabase
        .from('subscriptions')
        .insert(insertData);

      if (error) throw error;
      await get().fetchSubscriptions();
    } catch (e) {
      console.error('Failed to import subscriptions:', e);
      set({ error: e.message });
      throw e;
    }
  }
}));
