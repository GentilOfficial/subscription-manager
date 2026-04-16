import { create } from 'zustand';
import { supabase } from './supabase';

// Helper: get current authenticated user id
async function getUid() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user?.id ?? null;
}

export const useSubscriptionStore = create((set, get) => ({
  subscriptions: [],
  isLoading: true,
  isInitialized: false,

  init: async () => {
    // Only fetch from Supabase. We no longer seed local storage to avoid polluting remote databases.
    await get().fetchSubscriptions();
    set({ isInitialized: true });
  },

  fetchSubscriptions: async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error fetching docs:', error.message);
        set({ subscriptions: [], isLoading: false });
        return;
      }
      set({ subscriptions: data || [], isLoading: false });
    } catch (e) {
      console.error('Failed to fetch subscriptions:', e);
      set({ isLoading: false });
    }
  },

  addSubscription: async (sub) => {
    try {
      const uid = await getUid();
      if (!uid) throw new Error('Not authenticated');
      // Strip any local id; let Supabase generate a UUID
      const { id, user_id, ...rest } = sub;
      const insertData = { ...rest, user_id: uid };
      const { error } = await supabase.from('subscriptions').insert([insertData]);
      if (error) throw error;
      await get().fetchSubscriptions();
    } catch (e) {
      console.error('Failed to add subscription:', e);
    }
  },

  updateSubscription: async (id, updatedFields) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update(updatedFields)
        .eq('id', id);
      if (error) throw error;
      await get().fetchSubscriptions();
    } catch (e) {
      console.error('Failed to update subscription:', e);
    }
  },

  deleteSubscription: async (id) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await get().fetchSubscriptions();
    } catch (e) {
      console.error('Failed to delete subscription:', e);
    }
  },

  importSubscriptions: async (importedSubs) => {
    try {
      const uid = await getUid();
      if (!uid) throw new Error('Not authenticated');

      for (const sub of importedSubs) {
        const { id, user_id, ...rest } = sub;
        await supabase.from('subscriptions').insert([{ ...rest, user_id: uid }]);
      }
      await get().fetchSubscriptions();
    } catch (e) {
      console.error('Failed to import subscriptions:', e);
    }
  }
}));
