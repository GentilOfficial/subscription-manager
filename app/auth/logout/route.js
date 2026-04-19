import { supabaseServer } from '@/app/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const supabase = supabaseServer()

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
  }

  return NextResponse.redirect(new URL('/login', request.url), {
    status: 303,
  })
}

export async function GET(request) {
    return POST(request)
}
