import { create } from 'zustand';
import { supabase } from './supabase';

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  isLoading: true,

  // Called once on app mount to hydrate session from Supabase
  init: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ session, user: session?.user ?? null, isLoading: false });

    // Listen for auth state changes (login, logout, token refresh)
    supabase.auth.onAuthStateChange((_event, session) => {
      set({ session, user: session?.user ?? null });
    });
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    set({ session: data.session, user: data.user });
    return data;
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null });
  },
}));
