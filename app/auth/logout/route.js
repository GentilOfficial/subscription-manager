import { supabaseServer } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const supabase = supabaseServer()

  // Check if session exists before signing out
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', request.url), {
    status: 303,
  })
}

// Support GET for simple links if needed, though POST is safer
export async function GET(request) {
    return POST(request)
}
