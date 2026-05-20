import { IDomainEvent } from "../common/DomainEvents";

export interface StoredEvent {
  id: string;
  type: string;
  payload: any;
  occurredAt: Date;
  processedAt?: Date;
}

export interface IEventRepository {
  /**
   * Saves a domain event to the persistent outbox.
   */
  save(event: IDomainEvent): Promise<void>;

  /**
   * Fetches all unprocessed events from the outbox.
   */
  getUnprocessed(): Promise<StoredEvent[]>;

  /**
   * Marks an event as processed.
   */
  markAsProcessed(eventId: string): Promise<void>;
}
