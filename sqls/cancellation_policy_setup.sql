-- 📜 Customizable Cancellation Policy Setup
--
-- Run this SQL in your Supabase SQL Editor to store the policy in the database
-- and update the RLS policies so any user (guest or registered) can read it.

-- 1. Insert the default cancellation policy if it doesn't exist
INSERT INTO public.app_settings (key, value)
VALUES (
  'cancellation_policy', 
  'Orders can only be cancelled while in "pending" or "accepted" status. When an order is accepted, a cancellation fee will be applied. Moreover, if cancelling a crypto payment, all extra fees will be charged to the user. Once cancelled, the items are returned to inventory.'
)
ON CONFLICT (key) 
DO UPDATE SET value = EXCLUDED.value;

-- 2. Update SELECT policy on app_settings to allow public read access (all users)
-- Since app_settings contains general non-sensitive configuration parameters (like cleanup threshold and policy text),
-- it is safe and necessary to allow anyone to read these settings.
DROP POLICY IF EXISTS "Admins can view app settings" ON public.app_settings;
DROP POLICY IF EXISTS "Anyone can view app settings" ON public.app_settings;

CREATE POLICY "Anyone can view app settings"
ON public.app_settings
FOR SELECT
USING (true);

-- Ensure anon and authenticated roles have SELECT access
GRANT SELECT ON public.app_settings TO anon, authenticated;
