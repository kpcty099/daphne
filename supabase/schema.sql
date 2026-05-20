-- Supabase SQL Schema for Interior Design Lead Gen

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table for Leads
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text,
  email text,
  phone text,
  city text,
  project_type text,
  budget text,
  visit_count integer DEFAULT 1,
  interested boolean DEFAULT false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table for Reels
CREATE TABLE IF NOT EXISTS reels (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  reel_url text NOT NULL,
  caption text,
  is_featured boolean DEFAULT false,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Table for Visitors Tracking (Optional Server-Side Tracking)
CREATE TABLE IF NOT EXISTS visitors (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id text,
  fingerprint text,
  user_id uuid,
  visit_count integer DEFAULT 1,
  last_seen timestamp with time zone default timezone('utc'::text, now()),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS (Row Level Security) Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE reels ENABLE ROW LEVEL SECURITY;

-- Allow public inserts for leads (since visitors will submit forms)
CREATE POLICY "Allow public insert to leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Allow public read for reels
CREATE POLICY "Allow public read for reels" ON reels
  FOR SELECT USING (true);
