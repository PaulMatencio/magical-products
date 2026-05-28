import { IEventRepository, StoredEvent } from "../../domain/repositories/IEventRepository";
import { DomainEvents } from "../../domain/common/DomainEvents";
import { TraceContext } from "../../domain/common/TraceContext";


/**
 * Background worker that processes events from the persistent outbox.
 */
export class DomainEventProcessor {
  private isProcessing = false;

  constructor(private eventRepo: IEventRepository) {}

  /**
   * Starts the background processing loop.
   */
  public start(intervalMs: number = 5000): void {
    console.log(`[Outbox] ⚙️  Starting Event Processor (Interval: ${intervalMs}ms)...`);
    setInterval(() => this.process(), intervalMs);
    // Trigger initial run
    this.process();
  }

  private async process(): Promise<void> {
    if (this.isProcessing) return;
    
    const unprocessed = await this.eventRepo.getUnprocessed();
    if (unprocessed.length === 0) return;

    this.isProcessing = true;
    console.log(`[Outbox] 🔍 Found ${unprocessed.length} pending events. Processing...`);

    for (const storedEvent of unprocessed) {
      const correlationId = storedEvent.payload?.correlationId || storedEvent.payload?.correlation_id || crypto.randomUUID();
      TraceContext.setCorrelationId(correlationId);
      TraceContext.log(`[Trace: ${correlationId}] [Outbox] Processing event ${storedEvent.type} (ID: ${storedEvent.id}).`);

      try {
        // 1. Reconstruct the event object (simplified for this context)
        // In a complex app, you'd use a registry of event classes.
        const eventData = {
          ...storedEvent.payload,
          correlationId,
          constructor: { name: storedEvent.type }, // Hack to make the static dispatcher happy
          dateTimeOccurred: new Date(storedEvent.occurredAt)
        };

        // 2. Dispatch to memory bus (handlers like EmailNotificationHandler will catch it)
        await DomainEvents.dispatch(eventData as any);

        // 3. Mark as processed in the persistent store
        await this.eventRepo.markAsProcessed(storedEvent.id);
        TraceContext.log(`[Trace: ${correlationId}] [Outbox] Event ${storedEvent.type} marked as processed.`);
        
      } catch (err) {
        TraceContext.error(`[Trace: ${correlationId}] [Outbox] ❌ Failed to process event ${storedEvent.id}:`, err);
        // We don't mark as processed, so it will be retried.
      } finally {
        TraceContext.clear();
      }
    }

    this.isProcessing = false;
  }
}
