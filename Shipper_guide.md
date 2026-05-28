# Shipper Portal Operations Guide

Welcome to the Shipper Portal! This guide covers the key features, workflows, and responsibilities of the Shipper role in managing order fulfillment and deliveries.

---

## 1. Overview of the Shipper Portal
The Shipper Portal provides real-time information about orders ready for dispatch and transit updates. Shippers can track their delivery queues, monitor execution statistics across different periods, and update order statuses.

---

## 2. Key Dashboard Features

### A. Delivery Queue Statuses
* **Ready**: Orders fully prepared by the inventory operations team, waiting for pickup at the hub.
* **Shipped**: Orders currently in transit to the customer's delivery address.
* **Delivered**: Completed deliveries successfully dropped off at the shipping destination.
* **Total Handled**: Lifetime or period-scoped sum of all deliveries handled by your account.

### B. Statistical Period Filter
Shippers can filter performance statistics by selecting one of the following scopes from the sidebar dropdown:
* **Today** (last 24 hours)
* **This Week** (last 7 days)
* **This Month** (last 30 days)
* **This Year** (last 365 days)
* **All Time**

---

## 3. Order Management Workflows

### Phase 1: Picking Up an Order (Ready ➔ Shipped)
1. Navigate to the **Orders Ready for Delivery** main feed.
2. Locate the order card containing the desired `Order ID` (e.g. `#d2f9b8a0`).
3. Verify the **Delivery Address** and **Customer Contact** details (if a phone number is provided).
4. Review the **Items** list to ensure all listed packaging items are physically loaded.
5. Click the **Mark as Shipped** button on the bottom of the card. This updates the order state in Supabase and marks it as in-transit.

### Phase 2: Dropping Off an Order (Shipped ➔ Delivered)
1. Once you arrive at the delivery address and hand over the packages to the client, open the Shipper Portal.
2. Locate the active transit order (marked with a blue **shipped** status badge).
3. Click the green **Mark as Delivered** button.
4. The system logs the drop-off time, updates the order status to `delivered`, and removes the completed order from your active dispatch queue.

---

## 4. Troubleshooting & Best Practices
* **Syncing Offline Updates**: If you lose connection in the field, the application safely caches local changes. Click the **Sync Data** button once you are back online to sync state updates.
* **Theme Preference**: Toggle between **Light Mode** and **Dark Mode** via the sidebar button to improve readability under bright sunlight or night shifts.
* **Exiting the Portal**: Use the **Back to Store** button to return to the product store, or click **Sign Out** to terminate your active session securely.
