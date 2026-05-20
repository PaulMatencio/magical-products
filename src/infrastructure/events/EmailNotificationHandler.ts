import { DomainEvents } from "../../domain/common/DomainEvents";
import { OrderPlacedEvent } from "../../domain/events/OrderPlacedEvent";

/**
 * Handler that reacts to OrderPlacedEvent by sending a notification.
 * In a real app, this would use an Email Service (e.g. SendGrid, SES).
 */
export class EmailNotificationHandler {
  public static register(): void {
    DomainEvents.subscribe(OrderPlacedEvent.name, this.onOrderPlaced);
  }

  private static onOrderPlaced(event: OrderPlacedEvent): void {
    console.log(`[Event-Driven] 📧 Sending confirmation email for Order #${event.orderId.slice(0, 8)}`);
    console.log(`[Event-Driven] Destination: ${event.shippingAddress}`);
    console.log(`[Event-Driven] Total Amount: $${event.totalPrice.toFixed(2)}`);
    
    // Simulate async operation
    setTimeout(() => {
      console.log(`[Event-Driven] ✅ Email successfully sent for Order #${event.orderId.slice(0, 8)}`);
    }, 2000);
  }
}
