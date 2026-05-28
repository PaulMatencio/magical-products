import { TraceContext } from "./TraceContext";

export interface IDomainEvent {
  dateTimeOccurred: Date;
  correlationId?: string;
  getAggregateId(): string;
}

export type DomainEventCallback = (event: any) => void | Promise<void>;

/**
 * Static class to manage Domain Event subscriptions and dispatching.
 */
export class DomainEvents {
  private static handlersMap: Map<string, DomainEventCallback[]> = new Map();

  /**
   * Register a handler for a specific event class name.
   */
  public static subscribe(eventClassName: string, callback: DomainEventCallback): void {
    if (!this.handlersMap.has(eventClassName)) {
      this.handlersMap.set(eventClassName, []);
    }
    this.handlersMap.get(eventClassName)!.push(callback);
  }

  /**
   * Dispatch an event to all registered handlers.
   */
  public static async dispatch(event: IDomainEvent): Promise<void> {
    const eventClassName = event.constructor.name;
    const handlers = this.handlersMap.get(eventClassName) || [];
    const correlationId = event.correlationId || TraceContext.getCorrelationId();
    
    TraceContext.log(`[Trace: ${correlationId}] [EventBus] 🚀 Dispatching event ${eventClassName} for aggregate ${event.getAggregateId()}`);
    
    for (const handler of handlers) {
      await Promise.resolve(handler(event));
    }
  }

  public static clearHandlers(): void {
    this.handlersMap.clear();
  }
}
