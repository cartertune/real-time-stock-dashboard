-- Create watchlist table
CREATE TABLE watchlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  stock_ticker text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc', now())
);

-- Add index to user_id on watchlist table
CREATE INDEX idx_user_id ON watchlist (user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow only authenticated users to access their own watchlist
CREATE POLICY "Allow authenticated users to view their own watchlist" 
ON watchlist 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to insert into their own watchlist" 
ON watchlist 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated users to delete from their own watchlist" 
ON watchlist 
FOR DELETE 
USING (auth.uid() = user_id);


