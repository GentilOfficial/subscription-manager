"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser client – uses the publishable (public) key
// This client is used in Client Components. It automatically handles session sync with cookies via the browser.
export const supabaseBrowser = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);
