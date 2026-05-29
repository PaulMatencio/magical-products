import { supabase } from './supabase';
import appConfig from '../config/appConfig';

/**
 * Fetches the custom cancellation policy from Supabase public.app_settings.
 * Falls back to the appConfig local default if there is an error or it does not exist.
 */
export async function fetchCancellationPolicy(): Promise<string> {
  try {
    // If the provider is not Supabase, immediately fallback to local config
    if (appConfig.databaseProvider !== 'supabase') {
      return appConfig.cancellation.defaultPolicyText;
    }

    const { data, error } = await supabase
      .from('app_settings')
      .select('value')
      .eq('key', 'cancellation_policy')
      .maybeSingle();

    if (error) {
      console.warn("SettingsService: Failed to fetch cancellation policy, using local config fallback:", error);
      return appConfig.cancellation.defaultPolicyText;
    }

    return data?.value || appConfig.cancellation.defaultPolicyText;
  } catch (err) {
    console.warn("SettingsService: Error in fetchCancellationPolicy, using local config fallback:", err);
    return appConfig.cancellation.defaultPolicyText;
  }
}
