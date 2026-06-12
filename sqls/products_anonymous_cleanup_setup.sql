-- Anonymous user activity tracking and cleanup
--
-- Run this after products_setup.sql,, and
-- products_shipper_setup.sql.




--### Here is why it works correctly:

--1.  **Threshold Sync**: The script creates an `app_settings` table with `anonymous_cleanup_days` set to `7`. This matches your `anonymousCleanupInactiveDays: 7` in the config.
--2.  **Safety First**: The cleanup function (`cleanup_inactive_anonymous_users`) has a built-in safety check (lines 137-142). It will **never** delete a guest user 
--     if they have an order that hasn't been `delivered` yet. This prevents deleting a customer while their toy is still in the mail!
--3.  **Inactivity Check**: It calculates inactivity by looking at the `last_active_at` timestamp. If a user hasn't touched the app in 7 days, they become a candidate for cleanup.
--4.  **Automatic Scheduling**: The script includes a `pg_cron` schedule (line 170) to run this cleanup every night at 3:00 AM automatically.
--
--Implemented the "Heartbeat" logic to ensure your guest users aren't accidentally deleted while they are still active.
--
--How it works:
--Active Tracking: I added an updateLastActivity method to the Auth Repository.
--Automatic Ping: In App.tsx, I added a useEffect that detects when a Guest is using the store. It sends a small "ping" to the database to update their last_active_at timestamp.
--Cleanup Safety: Now, the 7-day cleanup script you reviewed will see that the guest was "active today" and will leave their account (and history) untouched.



-- ── 1. Configurable cleanup threshold ───────────────────────────────
CREATE TABLE IF NOT EXISTS public.app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO public.app_settings (key, value)
VALUES ('anonymous_cleanup_days', '7')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view app settings" ON public.app_settings;
CREATE POLICY "Admins can view app settings"
ON public.app_settings
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
);

DROP POLICY IF EXISTS "Admins can update app settings" ON public.app_settings;
CREATE POLICY "Admins can update app settings"
ON public.app_settings
FOR UPDATE
USING (
  EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
);

GRANT SELECT, UPDATE ON public.app_settings TO authenticated;

-- To change the threshold later:
-- UPDATE public.app_settings
-- SET value = '14', updated_at = NOW()
-- WHERE key = 'anonymous_cleanup_days';


-- ── 2. Anonymous last-activity table ────────────────────────────────
CREATE TABLE IF NOT EXISTS public.anonymous_user_activity (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_anonymous_user_activity_last_active
ON public.anonymous_user_activity(last_active_at);

ALTER TABLE public.anonymous_user_activity ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can record own anonymous activity" ON public.anonymous_user_activity;
CREATE POLICY "Users can record own anonymous activity"
ON public.anonymous_user_activity
FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own anonymous activity" ON public.anonymous_user_activity;
CREATE POLICY "Users can update own anonymous activity"
ON public.anonymous_user_activity
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view anonymous activity" ON public.anonymous_user_activity;
CREATE POLICY "Admins can view anonymous activity"
ON public.anonymous_user_activity
FOR SELECT
USING (
  auth.uid() = user_id
  OR EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
);

GRANT SELECT, INSERT, UPDATE ON public.anonymous_user_activity TO authenticated;


-- ── 3. Cleanup function ─────────────────────────────────────────────
CREATE OR REPLACE FUNCTION public.cleanup_inactive_anonymous_users()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
DECLARE
  cleanup_days INTEGER;
  deleted_count INTEGER := 0;
BEGIN
  SELECT CASE
    WHEN value ~ '^[0-9]+$' THEN value::INTEGER
    ELSE 7
  END
  INTO cleanup_days
  FROM public.app_settings
  WHERE key = 'anonymous_cleanup_days';

  cleanup_days := GREATEST(COALESCE(cleanup_days, 7), 1);

  CREATE TEMP TABLE IF NOT EXISTS cleanup_anonymous_user_candidates (
    user_id UUID PRIMARY KEY
  ) ON COMMIT DROP;

  TRUNCATE cleanup_anonymous_user_candidates;

  INSERT INTO cleanup_anonymous_user_candidates (user_id)
  SELECT auth_user.id
  FROM auth.users auth_user
  LEFT JOIN public.anonymous_user_activity activity
    ON activity.user_id = auth_user.id
  WHERE COALESCE(auth_user.is_anonymous, FALSE) = TRUE
    AND COALESCE(activity.last_active_at, auth_user.last_sign_in_at, auth_user.created_at) < NOW() - (cleanup_days || ' days')::INTERVAL
    AND NOT EXISTS (
      SELECT 1
      FROM public.orders order_row
      WHERE order_row.user_id = auth_user.id
        AND order_row.status <> 'delivered'
    );

  DELETE FROM public.orders order_row
  USING cleanup_anonymous_user_candidates candidate
  WHERE order_row.user_id = candidate.user_id;

  DELETE FROM public.anonymous_user_activity activity
  USING cleanup_anonymous_user_candidates candidate
  WHERE activity.user_id = candidate.user_id;

  DELETE FROM auth.users auth_user
  USING cleanup_anonymous_user_candidates candidate
  WHERE auth_user.id = candidate.user_id;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  RETURN deleted_count;
END;
$$;

REVOKE ALL ON FUNCTION public.cleanup_inactive_anonymous_users() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_inactive_anonymous_users() TO anon, authenticated;


-- ── 4. Optional scheduled cleanup ───────────────────────────────────
-- Supabase projects with pg_cron enabled can schedule the cleanup daily.
-- Run these lines manually if pg_cron is available in your project:
--
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;SELECT cron.schedule(
  'cleanup-inactive-anonymous-users',
  '0 3 * * *',
   $$SELECT public.cleanup_inactive_anonymous_users();$$
);


 
/*

### Here is why it works correctly:

1.  **Threshold Sync**: The script creates an `app_settings` table with `anonymous_cleanup_days` set to `7`. This matches your `anonymousCleanupInactiveDays: 7` in the config.
2.  **Safety First**: The cleanup function (`cleanup_inactive_anonymous_users`) has a built-in safety check (lines 137-142). It will **never** delete a guest user 
     if they have an order that hasn't been `delivered` yet. This prevents deleting a customer while their toy is still in the mail!
3.  **Inactivity Check**: It calculates inactivity by looking at the `last_active_at` timestamp. If a user hasn't touched the app in 7 days, they become a candidate for cleanup.
4.  **Automatic Scheduling**: The script includes a `pg_cron` schedule (line 170) to run this cleanup every night at 3:00 AM automatically.

Implemented the "Heartbeat" logic to ensure your guest users aren't accidentally deleted while they are still active.

How it works:
Active Tracking: I added an updateLastActivity method to the Auth Repository.
Automatic Ping: In App.tsx, I added a useEffect that detects when a Guest is using the store. It sends a small "ping" to the database to update their last_active_at timestamp.
Cleanup Safety: Now, the 7-day cleanup script you reviewed will see that the guest was "active today" and will leave their account (and history) untouched.


*/