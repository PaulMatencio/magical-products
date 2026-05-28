# 👑 Magical Toys Store — Administrative & Management Guide

This guide is designed for store administrators, managers, and operational personnel who manage inventory, orchestrate order fulfillment pipelines, and configure storefront data.

---

## 📋 Table of Contents
1. [Overview & Role Permissions](#1-overview--role-permissions)
2. [Navigating the Admin Dashboard](#2-navigating-the-admin-dashboard)
3. [Managing Orders & Fulfillment Pipeline](#3-managing-orders--fulfillment-pipeline)
   * [Reviewing Incoming Orders](#reviewing-incoming-orders)
   * [Transitioning Order Statuses](#transitioning-order-statuses)
   * [Handling Cancellations](#handling-cancellations)
4. [Catalog & Inventory Management](#4-catalog--inventory-management)
   * [Adding & Editing Products](#adding--editing-products)
   * [Advanced Attributes & Circular Specifications](#advanced-attributes--circular-specifications)
   * [Uploading Media to IPFS](#uploading-media-to-ipfs)
5. [Retailer Configuration & Settings](#5-retailer-configuration--settings)
6. [Database Maintenance & RBAC SQL Snippets](#6-database-maintenance--rbac-sql-snippets)

---

## 1. Overview & Role Permissions

The administrative console is built on role-based security configurations. To access these management views, a user profile must hold the `admin` role mapping in the database (`public.user_roles`).

### Permissions Mapping
* **Admins** hold complete authority: creating/editing catalog items, transitioning orders, adjusting global storefront settings, and switching to the Operator panel for bulk ingestion.
* **Operators** are focused on bulk data loading (CSV/JSON) and specifications.
* **Shippers** handle logistical state updates once orders are ready.

---

## 2. Navigating the Admin Dashboard

Upon logging in with an account containing admin permissions, the application reveals a sidebar menu with five central management modules:

1. **Dashboard Statistics (Global Panel)**: Displays real-time metrics showing total store revenue, pending items, accepted order counts, and out-of-stock indicators.
2. **Order Manager**: The pipeline control center where you review, print, and process orders.
3. **Inventory Manager**: The catalog view for creating new products, updating stock counts, search, and editing advanced attributes.
4. **Retailer Config**: Manage general support contact information and storefront defaults.
5. **Switch to Operator View**: A quick link allowing admins to open the Operator Console to access drag-and-drop file imports without losing administrative status.

---

## 3. Managing Orders & Fulfillment Pipeline

Magical Toys Store uses a real-time order state engine. When customers place orders, they appear in the queue instantly.

### Reviewing Incoming Orders
* Navigate to **Order Manager**.
* Use the search bar to locate specific orders using the **Order ID** or **Customer Email**.
* Use status filters to view orders by current phase (`pending`, `accepted`, `ready`, `shipped`, `delivered`, `cancelled`).

### Transitioning Order Statuses
Admin users drive the initial half of the order state machine:
1. **Accepting Orders**: Review new orders under the `pending` list. Verify inventory and customer requirements, then click **Accept Order** (transitions status from `pending` -> `accepted`).
2. **Marking Ready**: When items have been packed and are ready for pickup, click **Mark as Ready** (transitions status from `accepted` -> `ready`). 
   * *Note*: Marking an order `ready` automatically pushes it to the **Shipper Portal** queue for delivery drivers.

### Handling Cancellations
* Orders can be cancelled while in the `pending` or `accepted` states.
* Clicking **Cancel Order** triggers a secure backend transaction that restores the reserved quantities to the product stock instantly, keeping catalog inventory accurate.

---

## 4. Catalog & Inventory Management

The **Inventory Manager** supports comprehensive editing of all product specifications.

### Adding & Editing Products
1. Click **Add Product** in the Inventory screen.
2. Provide core specifications: **Name**, **SKU**, **Category**, **Price**, **Stock Quantity**, and **Product State** (`active` / `phasing_out` / `discontinued`).
3. For existing items, click **Edit** on the product row to update individual records.

### Advanced Attributes & Circular Specifications
To support digital passport specifications, each item includes comprehensive manufacturing and life-cycle options:
* **Durability Details**: Record estimated lifespan, reliability metrics, and recycled material percentages.
* **Repairability Metrics**: Add ease-of-repair ratings, maintenance manual links, and spare parts availability.
* **Manufacturing Origins**: Input country of origin, chemical compositions, and potential substances of concern.
* **Carbon Footprint**: Log carbon footprints and water usage metrics to display on storefront cards.

### Uploading Media to IPFS
Magical Toys Store utilizes decentralized storage (IPFS via Pinata) for product images:
1. Click **Upload Image** in the product form.
2. Select your local file.
3. The client uploads the image to a Deno Serverless Edge Function proxy. This proxy automatically injects the secure JWT and forwards the image to the IPFS network, returning a decentralized Content Identifier (CID).
4. The system stores the resulting CID securely, ensuring the client bundle never exposes secret keys.

---

## 5. Retailer Configuration & Settings

The **Retailer Manager** controls global contacts displayed in modals and footers:
* **Support Email / Phone**: Update support address points.
* **Operating Hours**: Specify warehouse operational days.
* **Terms of Service**: Configure policy summaries.

---

## 6. Database Maintenance & RBAC SQL Snippets

To promote users or review roles manually, run the following commands inside the **Supabase SQL Editor**:

### Promote a User to Admin
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER-UUID-HERE', 'admin')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin';
```

### Demote or Change a Role
```sql
UPDATE public.user_roles
SET role = 'customer'
WHERE user_id = 'USER-UUID-HERE';
```

### Inspect All Active Staff Accounts
```sql
SELECT u.id, u.email, r.role 
FROM auth.users u
JOIN public.user_roles r ON u.id = r.user_id
WHERE r.role IN ('admin', 'operator', 'shipper');
```
