-- Migration 001: Properties table
-- Run this in Supabase Dashboard > SQL Editor

CREATE TABLE IF NOT EXISTS properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  price_label TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Venta', 'Alquiler')),
  location TEXT NOT NULL,
  beds INTEGER NOT NULL DEFAULT 0,
  baths NUMERIC NOT NULL DEFAULT 0,
  area TEXT,
  image_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT false,
  agent_name TEXT,
  agent_phone TEXT,
  agent_email TEXT,
  agent_photo_url TEXT,
  amenities TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Public read access (any visitor can see properties)
CREATE POLICY "properties_public_select"
  ON properties FOR SELECT
  TO anon, authenticated
  USING (true);

-- Only authenticated agents can insert/update/delete
CREATE POLICY "properties_agent_insert"
  ON properties FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "properties_agent_update"
  ON properties FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "properties_agent_delete"
  ON properties FOR DELETE
  TO authenticated
  USING (true);

-- Index for common filters
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties (type);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties (price);
CREATE INDEX IF NOT EXISTS idx_properties_featured ON properties (featured);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties (created_at DESC);
