import { create } from 'zustand';
import { supabaseBrowser } from '@/app/lib/supabase/client';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isLoading: true,

  // Initialize from existing session (called on mount)
  init: async () => {
    const { data: { session } } = await supabaseBrowser.auth.getSession();
    set({ session, user: session?.user ?? null, isLoading: false });

    // Listen for auth state changes
    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });

    return () => subscription.unsubscribe();
  },

  setSession: (session) => {
    set({ session, user: session?.user ?? null, isLoading: false });
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

