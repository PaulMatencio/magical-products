-- ============================================================
-- RETAILER TABLE SETUP
-- Run this entire file in the Supabase SQL Editor.
-- ============================================================

-- 1. Create the retailer table
CREATE TABLE IF NOT EXISTS public.retailer (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL DEFAULT '',
  phone         TEXT NOT NULL DEFAULT '',   -- phone or WhatsApp number
  whatsapp      TEXT NOT NULL DEFAULT '',   -- dedicated WhatsApp link/number
  street        TEXT NOT NULL DEFAULT '',
  city          TEXT NOT NULL DEFAULT '',
  zip           TEXT NOT NULL DEFAULT '',
  country       TEXT NOT NULL DEFAULT '',
  map_url       TEXT NOT NULL DEFAULT '',   -- Google Maps / Apple Maps link
  latitude      DOUBLE PRECISION,
  longitude     DOUBLE PRECISION,
  support_email TEXT NOT NULL DEFAULT '',
  website       TEXT NOT NULL DEFAULT '',
  description   TEXT NOT NULL DEFAULT '',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_retailer_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_retailer_updated_at ON public.retailer;
CREATE TRIGGER trg_retailer_updated_at
  BEFORE UPDATE ON public.retailer
  FOR EACH ROW
  EXECUTE FUNCTION update_retailer_updated_at();

-- 3. Enable Row Level Security
ALTER TABLE public.retailer ENABLE ROW LEVEL SECURITY;

-- 4. Public read policy (so the storefront can display retailer info)
DROP POLICY IF EXISTS "Anyone can view retailer info" ON public.retailer;
CREATE POLICY "Anyone can view retailer info"
  ON public.retailer
  FOR SELECT
  USING (is_active = TRUE);

-- 5. Admin write policy (uses user_roles to check admin flag)
DROP POLICY IF EXISTS "Admins can manage retailer info" ON public.retailer;
CREATE POLICY "Admins can manage retailer info"
  ON public.retailer
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role = 'admin'
    )
  );

-- 6. Grant permissions
GRANT SELECT ON public.retailer TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.retailer TO authenticated;

-- 7. Real-time replication (optional – enables live updates in the UI)
ALTER TABLE public.retailer REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.retailer;

-- 8. Seed with one default retailer row (edit as needed)
INSERT INTO public.retailer (
  name, phone, whatsapp, street, city, zip, country,
  map_url, support_email, website, description
)
VALUES (
  'Tots & Trends',
  '+31614129165',
  '+31614129165',
  'De IJsvogel 21',
  'Purmerend',
  '1441KA',
  'Netherlands',
  'https://maps.google.com/?q=Tots+%26+Trends+Purmerend',
  'paul.devries@totsandtrends.com',
  'https://totsandtrends.com',
  'Premium tots and trends for all agesnd kids.'
)
ON CONFLICT DO NOTHING;
