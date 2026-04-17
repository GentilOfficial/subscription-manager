import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side client generator to be called in Server Components, Route Handlers, or Server Actions.
// This is strictly for server-side usage.
export function supabaseServer() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Can be ignored if handled by middleware/proxy.
          }
        },
        remove(name, options) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // Can be ignored if handled by middleware/proxy.
          }
        },
      },
    }
  );
}
