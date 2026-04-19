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
