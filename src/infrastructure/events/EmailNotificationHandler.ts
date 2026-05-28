import { DomainEvents } from "../../domain/common/DomainEvents";
import { OrderPlacedEvent } from "../../domain/events/OrderPlacedEvent";
import { TraceContext } from "../../domain/common/TraceContext";

/**
 * Handler that reacts to OrderPlacedEvent by sending a notification.
 * In a real app, this would use an Email Service (e.g. SendGrid, SES).
 */
export class EmailNotificationHandler {
  public static register(): void {
    DomainEvents.subscribe(OrderPlacedEvent.name, this.onOrderPlaced);
  }

  private static onOrderPlaced(event: OrderPlacedEvent): void {
    const correlationId = event.correlationId || TraceContext.getCorrelationId();
    TraceContext.log(`[Trace: ${correlationId}] [Event-Driven] 📧 Sending confirmation email for Order #${event.orderId.slice(0, 8)}`);
    TraceContext.log(`[Trace: ${correlationId}] [Event-Driven] Destination: ${event.shippingAddress}`);
    TraceContext.log(`[Trace: ${correlationId}] [Event-Driven] Total Amount: $${event.totalPrice.toFixed(2)}`);
    
    // Simulate async operation
    setTimeout(() => {
      TraceContext.log(`[Trace: ${correlationId}] [Event-Driven] ✅ Email successfully sent for Order #${event.orderId.slice(0, 8)}`);
    }, 2000);
  }
}
