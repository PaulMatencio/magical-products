import { LocalStorageEventRepository } from "../repositories/outbox/LocalStorageEventRepository";
import { DomainEventProcessor } from "./DomainEventProcessor";

// Singletons for the Persistent Outbox system
export const eventRepository = new LocalStorageEventRepository();
export const eventProcessor = new DomainEventProcessor(eventRepository);

/**
 * Convenience function to start the persistent event processing.
 */
export function startOutboxProcessor(): void {
  eventProcessor.start(5000); // Process every 5 seconds
}
