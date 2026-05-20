<div align="center">

# 🧸 Magical Toys Store

**A full-stack toy e-commerce application with real-time inventory, multi-role access control, and crypto payment support.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)

</div>

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [State Stabilization](#state-stabilization)
5. [User Roles](#user-roles)
6. [Tech Stack](#tech-stack)

7. [Project Structure](#project-structure)
8. [Getting Started](#getting-started)
9. [Environment Variables](#environment-variables)
10. [Database Setup](#database-setup)
11. [Configuration](#configuration)
12. [Order Lifecycle](#order-lifecycle)
13. [RLS Policy Reference](#rls-policy-reference)


---

## Overview

Magical Toys Store is a real-time toy e-commerce platform built with **React 19**, **TypeScript**, and **Supabase**. It features a clean **Clean Architecture** design with distinct domain, infrastructure, and presentation layers, enabling a fully functional shopping experience for customers alongside dedicated management portals for administrators and shippers.

---

## Features

### 🛍️ Customer Experience

- **Boutique Landing Page**: Premium welcome experience with modern navigation and social integration.
- **Modern Toy Catalog**: Immersive browsing with 3D hover effects (tilt/glare), glassmorphic badges, and dynamic gradients.
- **Responsive Filtering**: Adaptive category selection (horizontal buttons on desktop, sleek dropdown on mobile).
- **Intelligent Cart**: Robust state management with "Save for Later" persistence across sessions for authenticated users.
- **Guest Sessions**: Full shopping experience for guests with a dedicated upgrade path that preserves order history and cart items.
- **Checkout**: Support for **Credit Card** and **Multiple Crypto Wallets** (MetaMask, Coinbase, Trust, Phantom, Lace).
- **Real-time Updates**: Order status changes reflect instantly in history, supported by browser push notifications.
- **Mobile Menu**: Custom slide-out sidebar for a native-app feel on small devices.

### 🛡️ Admin Portal

- Full inventory management: create, edit, and safely delete toys
- View and manage all customer orders globally
- Update order status through the full lifecycle
- Live dashboard with stats (orders, revenue, pending, delivered, products, out-of-stock)
- Stats filterable by: **Today / This Week / This Month / This Year / All Time**

### 🚚 Shipper Portal

- Dedicated portal accessible only to users with the `shipper` role
- View all orders in `ready` or `shipped` status from all customers
- Advance order status: `ready → shipped` or `shipped → delivered`
- Live delivery stats panel with the same period filter options
- Auto-redirected to the portal on login; cannot access the store view

### 🔐 Authentication

- Email/password sign-in and sign-up
- Anonymous (guest) session with upgrade path to full account
- Password recovery via email link
- Inactivity auto-sign-out (configurable, default 60 min)
- Cart auto-clear on inactivity (configurable, default 30 min)
- Anonymous account cleanup after configurable inactivity (default 7 days) once all orders are delivered
- hCaptcha protection on anonymous logins

---

## Architecture

The project adheres to **Clean Architecture** principles, decoupling business logic from external frameworks and UI libraries. This ensures the application is maintainable, testable, and resilient to changes in the tech stack.

### 🏛️ The Four Layers

1.  **Domain Layer** (`src/domain/`): The core "Heart" of the app. Contains repository interfaces (contracts) and business entities. It has zero dependencies on other layers.
2.  **Infrastructure Layer** (`src/infrastructure/`): Implements the Domain contracts. This is where **Supabase**, **IPFS**, and other external services live.
3.  **Presentation Layer** (`src/presentation/`): Contains **Interface Adapters** (React Hooks). These hooks orchestrate the data flow between the UI and the repositories.
4.  **UI Components** (`src/components/`): Purely visual React components styled with **Tailwind CSS 4** and animated with **Motion**.

### 🔄 Dependency Rule
Dependencies flow **inwards**. The UI depends on Hooks; Hooks depend on Repository Interfaces; Infrastructure implements those Interfaces. The Domain layer is completely isolated.

### 🎨 Design System & UX
- **Micro-animations**: Subtle feedback on every interaction (button pulses, cart flashes, slide-in transitions).
- **Glassmorphism**: Modern UI aesthetic using backdrop blurs, thin borders, and translucent surfaces.
- **Mobile-First**: Custom navigation patterns like the 2-row category grid and responsive dropdowns ensure usability on small screens.
- **3D Interactive Cards**: Product listings feature 3D perspective tilts and dynamic glare effects for a premium feel.

---

## State Stabilization

Following a series of architectural refactors to resolve `Maximum update depth exceeded` and `ERR_INSUFFICIENT_RESOURCES` errors, the application now utilizes a highly stable, memoized context architecture.

### 🧩 Key Stabilization Pillars:

1.  **Centralized Role Providers**: Administrative and Shipping logic has been moved from local component hooks to shared global contexts (`AdminProvider`, `ShipperProvider`). This ensures a single source of truth and prevents redundant network fetches across the dashboard views.
2.  **Universal Memoization**: All context providers and custom hooks use strict `useMemo` and `useCallback` patterns. This prevents the "re-render storm" typically seen during authentication state transitions (login/logout).
3.  **Defensive Routing**: The `AppRouter` includes explicit `user` checks and state cleanup logic. This prevents the application from "ping-ponging" between protected dashboards and the landing page during the sensitive moments of the logout flow.
4.  **Atomic State Reset**: Both `useAdminLogic` and `useShipperLogic` expose `reset` functions called immediately by the `AuthProvider` on sign-out, ensuring that sensitive role-based data is purged from memory instantly.

---

## User Roles


| Role       | Assigned by                            | Access                                           |
| ---------- | -------------------------------------- | ------------------------------------------------ |
| `customer` | Auto-assigned on signup via DB trigger | Store, cart, checkout, own order history         |
| `admin`    | Manually set in `user_roles` table     | Admin Dashboard (inventory + all orders) + store |
| `shipper`  | Manually set in `user_roles` table     | Shipper Portal (ready/shipped orders) only       |

> **Assigning a role manually:**
>
> ```sql
> -- Make a user an admin
> INSERT INTO public.user_roles (user_id, role)
> VALUES ('<user-uuid>', 'admin')
> ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
>
> -- Make a user a shipper
> INSERT INTO public.user_roles (user_id, role)
> VALUES ('<user-uuid>', 'shipper')
> ON CONFLICT (user_id) DO UPDATE SET role = 'shipper';
> ```

---

## Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | React 19 + TypeScript 5.8               |
| Build tool     | Vite 6                                  |
| Styling        | Tailwind CSS 4 (utility-first)          |
| Animations     | Motion (Framer Motion v12)              |
| Icons          | Lucide React                            |
| Backend / DB   | Supabase (PostgreSQL + Auth + Realtime) |
| Backend / IPFS | Pinata Gateway IPFS                     |
| Auth captcha   | hCaptcha                                |
| AI integration | Google Gemini API (`@google/genai`)      |

---

## Project Structure

The project follows a **Clean Architecture** pattern, organized to separate core business logic from external frameworks and infrastructure.

```text
magical-toys/
├── src/
│   ├── AppRouter.tsx                    # Main routing logic & global state orchestration
│   ├── main.tsx                         # Entry point with global Provider hierarchy
│   ├── types/                           # Global TypeScript definitions
│   │
│   ├── domain/                          # Core Business Logic (Layer 1)
│   │   ├── entities/                    # Aggregate roots (Order, Toy, etc.)
│   │   ├── value-objects/               # Immutable domain values (Email, Price, Phone)
│   │   ├── common/                      # DDD base classes (Entity, ValueObject)
│   │   ├── errors/                      # Domain-specific error types
│   │   └── repositories/                # Repository interfaces (Contracts)
│   │
│   ├── application/                     # Application Logic (Layer 2)
│   │   ├── use-cases/                   # Feature-specific orchestration logic
│   │   │   ├── auth/                    # Login, Register, Guest flows
│   │   │   ├── catalog/                 # Load inventory, Update stock
│   │   │   ├── order/                   # Place order, Cancel order
│   │   │   └── admin/                   # Dashboard stats, Manage toys
│   │   └── bff/                         # Backend-for-Frontend (AppGateway)
│   │
│   ├── infrastructure/                  # External Tools & Repositories (Layer 3)
│   │   ├── repositories/                # Supabase & LocalStorage implementations
│   │   └── events/                      # Event processor and outbox handlers
│   │
│   ├── presentation/                    # Interface Adapters (Layer 4)
│   │   └── hooks/                       # Domain-aware React hooks (useAdmin, useOrder)
│   │
│   ├── context/                         # React Global State Management
│   │   ├── AuthContext.tsx              # User session & role management
│   │   ├── AdminContext.tsx             # Shared administrative dashboard state
│   │   ├── ShipperContext.tsx           # Shared shipping queue state
│   │   └── CartContext.tsx              # Persistence-aware shopping cart
│   │
│   ├── features/                        # UI Modules & Views
│   │   ├── admin/                       # Admin dashboard, Inventory, Order manager
│   │   ├── shipper/                     # Shipper dashboard & order cards
│   │   └── store/                       # Customer store, Catalog, Checkout, History
│   │
│   ├── services/                        # Infrastructure services (IPFS, Supabase, Sync)
│   ├── components/                      # Shared UI components (Auth, Toast, Landing)
│   ├── shared/                          # Design System (Cards, Buttons, Inputs)
│   └── config/                          # Application runtime configuration
│
├── supabase_setup.sql                   # Full DB schema + initial policies
├── supabase_shipper_setup.sql           # Shipper-specific RLS policies
└── supabase_anonymous_cleanup_setup.sql # Anonymous activity tracking + cleanup function
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) ≥ 18
- A [Supabase](https://supabase.com) project

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd magical-toys

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Edit .env with your Supabase URL and anon key

# 4. Set up the database (see Database Setup below)

# 5. Start the dev server
npm run dev
# App runs at http://localhost:3000
```

### Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start local dev server on port 3000 |
| `npm run build`   | Build production bundle to `dist/`  |
| `npm run preview` | Serve the production build locally  |
| `npm run lint`    | TypeScript type-check (no emit)     |
| `npm run clean`   | Delete the `dist/` directory        |

---

## Environment Variables

Create a `.env` file at the project root (copy from `.env.example`):

```env
# Supabase project URL
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co

# Supabase anon/public key (safe to expose client-side)
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>

# Optional – Google Gemini API key (for AI features)
GEMINI_API_KEY=<your-gemini-key>

# Optional – IPFS uploads through Pinata
# VITE_ values are exposed to the browser; use a scoped token or backend proxy in production.
VITE_PINATA_JWT=<your-limited-pinata-jwt>
VITE_PINATA_UPLOAD_URL=https://api.pinata.cloud/pinning/pinFileToIPFS
VITE_IPFS_GATEWAY_URL=https://gateway.pinata.cloud/ipfs
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore`.

---

## Database Setup

Run the SQL files in this order inside the **Supabase SQL Editor**:

### Step 1 — Base Schema (`supabase_setup.sql`)

Creates the core tables and initial policies:

| Table        | Purpose                                                      |
| ------------ | ------------------------------------------------------------ |
| `toys`       | Product catalog with title, price, stock, category, image    |
| `orders`     | Customer orders with status, items (JSONB), shipping address |
| `categories` | Lookup table for toy categories (code + title)               |
| `user_roles` | Maps `user_id → role` for RBAC                               |

Also seeds sample categories and toy data.

### Step 2 — Admin Policies (`supabase_admin_setup.sql`)

Adds RLS policies so that:

- Only admins can insert/update/delete toys
- Admins can see and update all orders
- A database trigger auto-assigns `customer` role on signup

### Step 3 — Shipper Policies (`supabase_shipper_setup.sql`)

Adds RLS policies for the shipper role:

- Shippers can SELECT orders with status `ready`, `shipped`, or `delivered`
- Shippers can UPDATE orders from `ready → shipped` or `shipped → delivered`
- All previous conflicting UPDATE policies are cleaned up

> **Important:** Run `supabase_shipper_setup.sql` after the base/admin policy scripts. It uses `DROP POLICY IF EXISTS` to ensure no stale conflicting policies remain.

### Step 4 — Anonymous Cleanup (`supabase_anonymous_cleanup_setup.sql`)

Adds:

- `app_settings.anonymous_cleanup_days` with a default value of `7`
- `anonymous_user_activity` for tracking the latest anonymous-user activity
- `cleanup_inactive_anonymous_users()` for removing inactive anonymous auth users and their historical database activity once every order they own is `delivered`

The app records anonymous activity automatically. Cleanup runs opportunistically when the app starts, falls back to auth timestamps for older anonymous users without an activity row, and the SQL file includes optional `pg_cron` lines if you want Supabase to run it daily.

## Infrastructure Transactional Database Functions (`infrastructure_transactionality.sql`)

To guarantee that Order creation and Event publishing happen in a single atomic transaction, we use a Supabase PostgreSQL function.

**What it does:**
1. Receives all order details (items, addresses, etc.) and event data (type, payload).
2. Inserts the Order into the `orders` table.
3. Immediately inserts the corresponding Event into the `domain_events` outbox table.
4. Both operations succeed or fail together. If the app crashes in between, the event never gets written to the outbox, and the background processor won't pick it up.

```sql
-- 1. Create the Domain Events (Outbox) Table
CREATE TABLE IF NOT EXISTS domain_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  payload JSONB NOT NULL,
  occurred_at TIMESTAMPTZ DEFAULT now(),
  processed_at TIMESTAMPTZ,
  metadata JSONB
);

-- 2. Create a Transactional Function to save Order + Event
CREATE OR REPLACE FUNCTION create_order_with_outbox(
  p_items JSONB,
  p_total_price DECIMAL,
  p_payment_method TEXT,
  p_shipping_address TEXT,
  p_user_phone TEXT,
  p_user_id UUID,
  p_event_type TEXT,
  p_event_payload JSONB
) RETURNS JSONB AS $$
DECLARE
  v_order_id UUID;
  v_result JSONB;
BEGIN
  -- 1. Insert the Order
  INSERT INTO orders (
    items, 
    total_price, 
    payment_method, 
    shipping_address, 
    user_phone, 
    user_id,
    status,
    created_at
  ) VALUES (
    p_items, 
    p_total_price, 
    p_payment_method, 
    p_shipping_address, 
    p_user_phone, 
    p_user_id,
    'pending',
    now()
  ) RETURNING id INTO v_order_id;

  -- 2. Insert the Event into the Outbox (in the same transaction)
  INSERT INTO domain_events (
    type, 
    payload
  ) VALUES (
    p_event_type, 
    p_event_payload || jsonb_build_object('id', v_order_id)
  );

  -- 3. Return the created order
  SELECT jsonb_build_object(
    'id', v_order_id,
    'created_at', now(),
    'total_price', p_total_price,
    'status', 'pending'
  ) INTO v_result;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql;
```




## Configuration

All tunable values live in `src/config/appConfig.ts`:

| Key                              | Default                             | Description                                                                                            |
| -------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `inactivityTimeoutMinutes`       | `60`                                | Minutes of inactivity before auto sign-out. Set `0` to disable.                                        |
| `cartInactivityTimeoutMinutes`   | `30`                                | Minutes before an idle cart is emptied and inventory restored.                                         |
| `inactivityCheckIntervalSeconds` | `60`                                | How often the inactivity check runs.                                                                   |
| `anonymousCleanupInactiveDays`   | `7`                                 | Anonymous-user cleanup threshold; keep aligned with `app_settings.anonymous_cleanup_days` in Supabase. |
| `connectionTimeoutSeconds`       | `15`                                | Timeout for the initial inventory fetch.                                                               |
| `addToCartFlashMs`               | `1200`                              | Duration of the "Added!" confirmation flash on the cart button.                                        |
| `cryptoReceiverAddresses`        | (wallets)                           | Wallet addresses shown to the customer during crypto checkout.                                         |
| `ipfsGatewayUrl`                 | `https://gateway.pinata.cloud/ipfs` | Primary gateway base URL used when displaying uploaded IPFS files.                                     |
| `hCaptchaSiteKey`                | (test key)                          | Replace with your real hCaptcha key for production.                                                    |

### IPFS Upload Module

The app includes [ipfsService.ts](/home/paul/react/products/src/services/ipfsService.ts) for uploading browser `File` or `Blob` objects to IPFS through Pinata.

```ts
import { ipfsService } from "./services/ipfsService";

const result = await ipfsService.uploadFile(file, {
  fileName: file.name,
  metadata: { source: "toy-image" },
});

console.log(result.cid, result.ipfsUri, result.gatewayUrl);
```

---

## Order Lifecycle

Orders flow through five statuses. Each role can advance the order to the next valid state:

```
  [Customer places order]
         │
         ▼
      pending  ──────────────────────────────► (deleted by customer or admin)
         │
         │  Admin accepts
         ▼
      accepted
         │
         │  Admin marks ready for pickup/shipping
         ▼
       ready  ◄── Shipper sees order here
         │
         │  Shipper ships
         ▼
      shipped
         │
         │  Shipper confirms delivery
         ▼
     delivered  ◄── Order disappears from shipper queue
```

| Status      | Who sets it         | Visible to shipper     |
| ----------- | ------------------- | ---------------------- |
| `pending`   | Customer (checkout) | ✗                      |
| `accepted`  | Admin               | ✗                      |
| `ready`     | Admin               | ✅                     |
| `shipped`   | Shipper             | ✅                     |
| `delivered` | Shipper             | ✗ (removed from queue) |

---

## RLS Policy Reference

### `toys` table

| Operation | Who        | Condition      |
| --------- | ---------- | -------------- |
| SELECT    | Anyone     | Always         |
| INSERT    | Admin only | Role = `admin` |
| UPDATE    | Admin only | Role = `admin` |
| DELETE    | Admin only | Role = `admin` |

### `orders` table

| Operation | Who              | Condition                                                               |
| --------- | ---------------- | ----------------------------------------------------------------------- |
| SELECT    | Customer         | Own orders (`user_id = auth.uid()`)                                     |
| SELECT    | Admin            | All orders                                                              |
| SELECT    | Shipper          | Status IN (`ready`, `shipped`, `delivered`)                             |
| INSERT    | Customer / Guest | Own orders or `is_guest = true`                                         |
| UPDATE    | Customer         | Own orders, only while `pending`                                        |
| UPDATE    | Admin            | All orders                                                              |
| UPDATE    | Shipper          | Status IN (`ready`, `shipped`) → new status IN (`shipped`, `delivered`) |
| DELETE    | Customer         | Own orders                                                              |
| DELETE    | Admin            | All orders                                                              |

### `user_roles` table

| Operation | Who                 | Condition                             |
| --------- | ------------------- | ------------------------------------- |
| SELECT    | Authenticated users | Own row only (`user_id = auth.uid()`) |

### `anonymous_user_activity` table

| Operation | Who                             | Condition                             |
| --------- | ------------------------------- | ------------------------------------- |
| INSERT    | Anonymous / authenticated users | Own row only (`user_id = auth.uid()`) |
| UPDATE    | Anonymous / authenticated users | Own row only (`user_id = auth.uid()`) |
| SELECT    | User / Admin                    | Own row, or role = `admin`            |

---

## Deployment

The app is configured for deployment via **GitHub Actions** (see `.github/workflows/deploy.yaml`). A production build is generated with:

```bash
npm run build
```

The output in `dist/` can be served by any static hosting provider (Vercel, Netlify, GitHub Pages, etc.) or behind the included Express server.

---

<div align="center">
  <p>Built with ❤️ using React, TypeScript & Supabase</p>
</div>
