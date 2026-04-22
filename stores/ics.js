"use server";

import { supabaseServer } from "@/app/lib/supabase/server";

export async function getIcsToken() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("user_ics_tokens")
    .select("token")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116 means no rows found
    throw new Error(error.message);
  }

  return data?.token || null;
}

export async function refreshIcsToken() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const newToken = crypto.randomUUID();

  const { data, error } = await supabase
    .from("user_ics_tokens")
    .upsert({
      user_id: user.id,
      token: newToken,
    }, {
      onConflict: 'user_id'
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.token;
}

export async function revokeIcsToken() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("user_ics_tokens")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

export async function getCalendarFeedData(token) {
  const supabase = await supabaseServer();

  const { data: subscriptions, error } = await supabase
    .rpc("get_subscriptions_by_ics_token", { feed_token: token });

  if (error || !subscriptions) {
    throw new Error("Invalid or revoked feed token.");
  }

  return subscriptions;
}
