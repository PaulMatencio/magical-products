import { IEventRepository, StoredEvent } from "../../../domain/repositories/IEventRepository";
import { IDomainEvent } from "../../../domain/common/DomainEvents";

const STORAGE_KEY = 'product_catalogue_outbox';

export class LocalStorageEventRepository implements IEventRepository {
  async save(event: IDomainEvent): Promise<void> {
    const outbox = this.getRawOutbox();

    const storedEvent: StoredEvent = {
      id: crypto.randomUUID(),
      type: event.constructor.name,
      payload: this.serialize(event),
      occurredAt: event.dateTimeOccurred || new Date(),
    };

    outbox.push(storedEvent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(outbox));

    console.log(`[Outbox] 💾 Event ${storedEvent.type} persisted to local storage.`);
  }

  async getUnprocessed(): Promise<StoredEvent[]> {
    const outbox = this.getRawOutbox();
    return outbox.filter(e => !e.processedAt);
  }

  async markAsProcessed(eventId: string): Promise<void> {
    const outbox = this.getRawOutbox();
    const event = outbox.find(e => e.id === eventId);

    if (event) {
      event.processedAt = new Date();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(outbox));
      console.log(`[Outbox] ✅ Event ${event.id} marked as processed.`);
    }
  }

  private getRawOutbox(): StoredEvent[] {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error("[Outbox] Failed to parse outbox data, clearing storage.", err);
      return [];
    }
  }

  private serialize(event: any): any {
    // Simple serialization for demo. 
    // In production, you'd use a more robust way to handle nested objects/dates.
    return JSON.parse(JSON.stringify(event));
  }
}
