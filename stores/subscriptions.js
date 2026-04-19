import { create } from 'zustand';
import { supabase } from './supabase';
import { getNextRenewalDate } from '../app/utils/dateUtils';

// Helper: get current authenticated user id
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
    // Optimization: Cache check
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

      // Calculate next renewal and sort
      const processed = (data || []).map(sub => {
        const nextRenewal = getNextRenewalDate(sub.renewalDate, sub.interval);
        return { 
          ...sub, 
          computedNextRenewal: nextRenewal 
        };
      }).sort((a, b) => {
        // Handle null dates: push to end
        if (!a.computedNextRenewal) return 1;
        if (!b.computedNextRenewal) return -1;
        return a.computedNextRenewal - b.computedNextRenewal;
      });

      set({ subscriptions: processed, isLoading: false });
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

      // Optimistic update
      const tempId = Math.random().toString(36).substring(7);
      const newSub = { ...sub, id: tempId, user_id: uid, created_at: new Date().toISOString() };
      set({ subscriptions: [newSub, ...previousSubs] });

      const { id, user_id, ...rest } = sub;
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{ ...rest, user_id: uid }])
        .select()
        .single();

      if (error) throw error; 
      
      // Replace temp item with real item from DB
      set({ 
        subscriptions: get().subscriptions.map(s => s.id === tempId ? data : s) 
      });
    } catch (e) {
      console.error('Failed to add subscription:', e);
      set({ subscriptions: previousSubs, error: e.message });
    }
  },

  updateSubscription: async (id, updatedFields) => {
    const previousSubs = get().subscriptions;
    try {
      // Optimistic update
      set({
        subscriptions: previousSubs.map(s => s.id === id ? { ...s, ...updatedFields } : s)
      });

      const { error } = await supabase
        .from('subscriptions')
        .update(updatedFields)
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.error('Failed to update subscription:', e);
      set({ subscriptions: previousSubs, error: e.message });
    }
  },

  deleteSubscription: async (id) => {
    const previousSubs = get().subscriptions;
    try {
      // Optimistic update
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
    }
  },

  importSubscriptions: async (importedSubs) => {
    try {
      const uid = await getUid();
      if (!uid) throw new Error('Not authenticated');

      // Optimization: Bulk Insert
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
    }
  }
}));
