import { create } from 'zustand';
import { supabaseBrowser } from '@/app/lib/supabase/client';
import { currencies } from '@/app/config/content';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  profile: null,
  isLoading: true,

  // Initialize from existing session (called on mount)
  init: async () => {
    const { data: { session } } = await supabaseBrowser.auth.getSession();
    set({ session, user: session?.user ?? null, isLoading: false });
    
    if (session?.user) {
      get().fetchProfile(session.user.id);
    }

    // Listen for auth state changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
      if (session?.user) {
        get().fetchProfile(session.user.id);
      } else {
        set({ profile: null });
      }
    });

    return () => subscription.unsubscribe();
  },

  setSession: (session) => {
    set({ session, user: session?.user ?? null, isLoading: false });
    if (session?.user) {
      get().fetchProfile(session.user.id);
    } else {
      set({ profile: null });
    }
  },

  fetchProfile: async (userId) => {
    const { data, error } = await supabaseBrowser
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (!error && data) {
      set({ profile: data });
    }
  },

  updateProfile: async (updates) => {
    const user = get().user;
    if (!user) return;
    const { error } = await supabaseBrowser
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    if (error) throw error;
    await get().fetchProfile(user.id);
  },

  getCurrencySymbol: () => {
    const code = get().profile?.currency || 'EUR';
    return currencies.find(c => c.code === code)?.symbol || '€';
  },

  signIn: async (email, password) => {
    const { data, error } = await supabaseBrowser.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ session: data.session, user: data.user });
    return data;
  },

  signUp: async (email, password) => {
    const { data, error } = await supabaseBrowser.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    await supabaseBrowser.auth.signOut();
    set({ session: null, user: null });
  },

  updatePassword: async (newPassword) => {
    const { error } = await supabaseBrowser.auth.updateUser({ password: newPassword });
    if (error) throw error;
  },
}));

