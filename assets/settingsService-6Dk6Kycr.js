import { a, v as c } from "./index-1DhPta5-.js";
async function n() {
  try {
    a.databaseProvider;
    const { data: e, error: l } = await c.from("app_settings").select("value").eq("key", "cancellation_policy").maybeSingle();
    return l ? (console.warn("SettingsService: Failed to fetch cancellation policy, using local config fallback:", l), a.cancellation.defaultPolicyText) : (e == null ? void 0 : e.value) || a.cancellation.defaultPolicyText;
  } catch (e) {
    return console.warn("SettingsService: Error in fetchCancellationPolicy, using local config fallback:", e), a.cancellation.defaultPolicyText;
  }
}
export {
  n as f
};
