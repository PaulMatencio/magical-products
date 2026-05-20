import { EmailNotificationHandler } from "./EmailNotificationHandler";
import { startOutboxProcessor } from "./registry";

/**
 * Initializes all infrastructure-level event handlers.
 * This should be called once during application startup.
 */
export function initEventHandlers(): void {
  console.log("[Infrastructure] 🛰️  Initializing Domain Event Handlers...");
  
  EmailNotificationHandler.register();
  
  // Start the Persistent Outbox Processor
  startOutboxProcessor();
}

