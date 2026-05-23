import { EmailNotificationHandler } from "./EmailNotificationHandler";

/**
 * Initializes all infrastructure-level event handlers.
 * This should be called once during application startup.
 */
export function initEventHandlers(): void {
  console.log("[Infrastructure] 🛰️  Initializing Domain Event Handlers...");
  
  EmailNotificationHandler.register();
  
  // [ARCHITECTURAL UPDATE]: The background processing loop has been migrated to the database.
  // Events are now handled via database-level triggers (trg_process_domain_event) and cron
  // functions (cron_process_pending_events) in outbox.sql. This ensures reliable event processing
  // even if the user closes their browser tab immediately after checkout.
  //
  // startOutboxProcessor();
}

