import { NextResponse } from 'next/server';

/**
 * La protezione delle route è gestita client-side nel dashboard layout,
 * perché Supabase JS v2 salva la sessione in localStorage (non nei cookie),
 * quindi il proxy server-side non può leggerla.
 *
 * Il redirect login→dashboard è invece gestito client-side in app/page.js e app/login/page.js.
 */
export function proxy() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
