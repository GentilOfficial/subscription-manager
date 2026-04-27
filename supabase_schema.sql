-- 1. Create the subscriptions table
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL CHECK (char_length(name) <= 25),
  price NUMERIC NOT NULL CHECK (price > 0),
  interval TEXT NOT NULL CHECK (interval IN ('Weekly', 'Monthly', 'Yearly')),
  status TEXT NOT NULL CHECK (status IN ('Active', 'Paused', 'Cancelled')),
  category TEXT NOT NULL CHECK (category IN ('Entertainment', 'Music', 'Software', 'Shopping', 'Developer', 'Productivity', 'Other')),
  color TEXT NOT NULL CHECK (color IN ('bg-orange-500', 'bg-red-500', 'bg-amber-500', 'bg-teal-500', 'bg-indigo-500', 'bg-slate-700')),
  "renewalDate" DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- 3. Create policies so users can only see and manage their own data
CREATE POLICY "Users can insert their own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own subscriptions"
  ON subscriptions FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Create the user_ics_tokens table
CREATE TABLE user_ics_tokens (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  token UUID DEFAULT gen_random_uuid() NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE user_ics_tokens ENABLE ROW LEVEL SECURITY;

-- 6. Create policies so users can manage their own ICS token
CREATE POLICY "Users can insert their own ics token"
  ON user_ics_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own ics token"
  ON user_ics_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own ics token"
  ON user_ics_tokens FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ics token"
  ON user_ics_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- 7. Secure Token Data Access Function (Bypasses RLS)
CREATE OR REPLACE FUNCTION get_subscriptions_by_ics_token(feed_token UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  price NUMERIC,
  "interval" TEXT,
  category TEXT,
  "renewalDate" DATE,
  currency TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_user_id UUID;
  user_currency TEXT;
BEGIN
  -- Validate token
  SELECT user_id INTO target_user_id
  FROM user_ics_tokens
  WHERE token = feed_token;

  IF target_user_id IS NULL THEN
    RAISE EXCEPTION 'Invalid token';
  END IF;

  -- Get user currency
  SELECT p.currency INTO user_currency
  FROM profiles p
  WHERE p.id = target_user_id;

  -- Return matching active records
  RETURN QUERY
  SELECT s.id, s.name, s.price, s.interval, s.category, s."renewalDate", COALESCE(user_currency, 'EUR')
  FROM subscriptions s
  WHERE s.user_id = target_user_id
    AND s.status = 'Active';
END;
$$;

-- 8. Create the profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT CHECK (char_length(username) <= 20),
  currency TEXT DEFAULT 'EUR' CHECK (currency IN ('EUR', 'USD'))
);

-- 9. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 10. Create policies
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 11. Trigger to create a profile automatically when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id)
  VALUES (new.id);
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
