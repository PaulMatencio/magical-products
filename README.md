<div align="center">

# 🧸 Magical Toys Store

**A premium, enterprise-grade products e-commerce platform built with React 19, TypeScript 5.8, and Supabase. The system is designed using Clean Architecture, features a robust composition root for Dependency Injection, and implements hardened server-side transactional security.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite)](https://vitejs.dev)

</div>

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Core Architecture & Dependency Injection](#core-architecture--dependency-injection)
3. [Key Security Hardening & Server-Side Atomicity](#key-security-hardening--server-side-atomicity)
4. [Aesthetics & User Experience](#aesthetics--user-experience)
5. [User Roles (RBAC)](#user-roles-rbac)
6. [Tech Stack](#tech-stack)
7. [Project Directory Map](#project-directory-map)
8. [Getting Started](#getting-started)
9. [Environment Variables](#environment-variables)
10. [Database Setup & Schema](#database-setup--schema)
11. [Supabase Edge Functions Deployment](#supabase-edge-functions-deployment)
12. [Fulfillment Lifecycle](#fulfillment-lifecycle)

---

## 🔍 Overview

Magical Toys Store is a real-time toy e-commerce platform built with **React 19**, **TypeScript**, and **Supabase**. It features a clean **Clean Architecture** design with distinct domain, infrastructure, and presentation layers, enabling a fully functional shopping experience for customers alongside dedicated management portals for administrators and shippers.

---

## 🏛️ Core Architecture & Dependency Injection

The application is structured strictly according to **Clean Architecture** and **Domain-Driven Design (DDD)** principles to decouple core domain logic from UI presentation and database frameworks.

```
       ┌─────────────────────────────────────────────────────────┐
       │                  UI Layer (React/CSS)                   │
       └────────────────────────────┬────────────────────────────┘
                                    │ consumes via useDependencies()
       ┌────────────────────────────▼────────────────────────────┐
       │          Presentation Layer (Hooks & Contexts)          │
       └────────────────────────────┬────────────────────────────┘
                                    │ invokes Use Cases
       ┌────────────────────────────▼────────────────────────────┐
       │           Application Layer (Use Case Interactors)       │
       └────────────────────────────┬────────────────────────────┘
                                    │ operates on Interfaces
       ┌────────────────────────────▼────────────────────────────┐
       │             Domain Layer (Entities & Repositories)      │
       └────────────────────────────▲────────────────────────────┘
                                    │ implements Interfaces
       ┌────────────────────────────┴────────────────────────────┐
       │        Infrastructure Layer (Supabase, LocalStorage)    │
       └─────────────────────────────────────────────────────────┘
```

### 1. The Four Layers
*   **Domain Layer** (`src/domain/`): Houses the pure business models, value objects, domain-specific errors, and abstract repository contracts (interfaces). It contains no dependencies on React, Supabase, or any third-party SDK.
*   **Application Layer** (`src/application/`): Orchestrates business flows via Use Cases (e.g. `CheckoutUseCase`, `ManageOrdersUseCase`, `LoadCatalogUseCase`).
*   **Presentation Layer** (`src/presentation/`): Orchestrates UI state, utilizing custom hooks (`useOrderLogic`, `useAuthLogic`, etc.) to wrap application use cases.
*   **Infrastructure Layer** (`src/infrastructure/`): Implements repository contracts via concrete adapters like `SupabaseOrderRepository`, `AppwriteOrderRepository`, and decorators.

### 2. Dependency Injection & Composition Root
To prevent infrastructure leakage into the UI components, the project implements a **Composition Root** pattern:
*   **Instantiation**: All concrete repositories and use cases are instantiated once inside the `DependenciesProvider` (`src/context/DependenciesContext.tsx`).
*   **Injection**: The UI consumes interfaces exclusively via the custom `useDependencies()` context hook. Views remain completely unaware of the underlying database provider (Supabase vs. Appwrite).
*   **Routing Decoupling**: Global routing transitions are managed using abstract interfaces injected from the root, eliminating dynamic infrastructure imports.

### 3. Synchronization & Decorator Pattern
Offline stability is achieved through a **Repository Decorator Pattern**:
*   The `OfflineOrderRepositoryDecorator` wraps the remote database repository, dynamically writing updates to `localStorage` and queueing synchronization actions so customers can browse history and register updates in disconnected states.

---

## 🛡️ Key Security Hardening & Server-Side Atomicity

Following a comprehensive security audit, the storefront was hardened against client-side orchestration risks and key exposures.

### 1. Transactional Order Cancellation (RPC)
Historically, guest order cancellation relied on sequential client-side TypeScript loops to delete orders and restore inventory stock. If a user closed their browser mid-process, it resulted in database inconsistency.
*   **Solution**: Moved order cancellation entirely to the database layer via the Pl/pgSQL RPC function `cancel_order_with_inventory(p_order_id)`.
*   **Atomicity**: Both the order status transition and stock restoration occur in a single, atomic database transaction (`BEGIN...COMMIT`). If any step fails, the entire transaction rolls back.
*   **BOLA/IDOR Prevention**: Since the function runs as `SECURITY DEFINER` to bypass RLS policies during internal stock increments, it explicitly validates authorization inside the function body. The cancellation is permitted only if the caller's `auth.uid()` matches the order's owner `user_id` or if the caller holds an administrative role (`admin` or `operator`).

### 2. Serverless IPFS Proxy (Supabase Edge Function)
To prevent the leakage of Pinata IPFS credentials to the client bundle, the file upload mechanism was refactored:
*   **Proxy Endpoint**: A custom Deno Supabase Edge Function (`supabase/functions/upload-to-ipfs`) acts as a secure intermediary.
*   **Secret Protection**: The `VITE_PINATA_JWT` secret has been completely removed from client-side environment variables and is now securely configured as an environment secret inside Supabase.
*   **Multipart Stream Forwarding**: The Edge function accepts `multipart/form-data` uploads, injects the server-secured authorization token, and proxies the payload to Pinata securely.

---

## 🎨 Aesthetics & User Experience

*   **Theme-Aware Design Tokens**: The visual architecture uses CSS custom properties (`--background`, `--card`, `--foreground`) to manage colors, avoiding hardcoded Tailwind utilities. This delivers high-contrast surfaces in both light and dark modes.
*   **Premium Interactive Components**: Smooth gradients, glassmorphism, slide-out mobile overlays, and micro-animations provide a native app feel.
*   **3D Interactive Cards**: Product images utilize perspective-tilt hover effects with dynamic reflection highlights.

---

## 👥 User Roles (RBAC)

Access control is managed at the database level and synchronized to the client via `auth.uid()` lookup mappings in `public.user_roles`:

| Role       | Assignment Mechanism                   | Access Permissions                                  |
| ---------- | -------------------------------------- | --------------------------------------------------- |
| `customer` | Auto-assigned on signup via DB trigger | Storefront catalog, cart, checkout, own order logs |
| `admin`    | Manually designated in `user_roles`    | Full dashboard controls, inventory updates, global orders, and bulk uploading |
| `operator` | Manually designated in `user_roles`    | Operator Dashboard (bulk product ingestion and data management) |
| `shipper`  | Manually designated in `user_roles`    | Shipper Portal only (orders in ready/shipped status)|

### Assigning a Role Manually:
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('<user-uuid>', 'admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'admin';
```

---

## 💻 Tech Stack

*   **Frontend core**: React 19, TypeScript 5.8, Vite 6
*   **Style & Motion**: Tailwind CSS 4, Framer Motion (Motion v12), Lucide React Icons
*   **Backend & Database**: Supabase (Postgres, Realtime, Deno Edge Functions)
*   **Asset Storage**: IPFS (via Pinata)
*   **Security & AI**: hCaptcha Protection, Google Gemini API (`@google/genai`)

---

## 📂 Project Directory Map

```text
magical-products/
├── src/
│   ├── AppRouter.tsx                    # Main routing logic & global state orchestration
│   ├── main.tsx                         # Entry point with DI DependenciesProvider
│   ├── types/                           # Common TypeScript typings
│   │
│   ├── domain/                          # Domain Layer (Layer 1 - Core Business Rules)
│   │   ├── entities/                    # Business objects (Order, Product)
│   │   ├── value-objects/               # Immutable values (Email, Price)
│   │   ├── common/                      # DDD base abstract classes
│   │   ├── errors/                      # Domain-specific error declarations
│   │   └── repositories/                # Repository interface declarations
│   │
│   ├── application/                     # Application Layer (Layer 2 - Use Cases)
│   │   ├── use-cases/                   # Interactor implementations
│   │   │   ├── auth/                    # Sign-in/up, Guest migration
│   │   │   └── order/                   # Checkout and cancellations
│   │   └── bff/                         # Backend-For-Frontend gateway
│   │
│   ├── infrastructure/                  # Infrastructure Layer (Layer 3 - Concrete Adapters)
│   │   ├── repositories/                # Supabase, Appwrite, and Offline Decorators
│   │   └── events/                      # DB Trigger outbox & event processing loops
│   │
│   ├── presentation/                    # Presentation Layer (Layer 4 - Controller Hooks)
│   │   └── hooks/                       # UI-bound state hooks
│   │
│   ├── context/                         # Context Providers (State containers)
│   │   ├── DependenciesContext.tsx      # Dependency injection composition root
│   │   ├── AuthContext.tsx              # Sessions, roles, and inactivity timers
│   │   └── CartContext.tsx              # Persisted, multi-device cart operations
│   │
│   ├── features/                        # Feature Views
│   │   ├── admin/                       # Inventory forms & global stats
│   │   ├── shipper/                     # Shipper delivery portal
│   │   └── store/                       # Customer storefront & tracking
│   │
│   ├── services/                        # Shared services (IPFS, sync, notifications)
│   └── config/                          # Configuration constants
│
├── supabase/                            # Edge Function definitions
│   └── functions/
│       ├── deno.d.ts                    # Ambient typings for Deno context in IDEs
│       └── upload-to-ipfs/              # Deno reverse-proxy file upload function
│
├── cancel_order_rpc.sql                 # Secure Order cancellation PL/pgSQL function
├── outbox.sql                           # Transactional Outbox pattern schema
├── products_setup.sql                   # Database catalog schema
└── products_anonymous_cleanup_setup.sql # Guest user lifecycle cleanup script
```

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone <repository-url>
cd magical-products
npm install
```

### 2. Environment Setup
Copy the sample environment file and insert your configuration:
```bash
cp .env.example .env
```
Edit `.env` to include your `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.

### 3. Local Development Server
Start the local Vite dev server:
```bash
npm run dev
```
The app will run at `http://localhost:3000`.

### 4. Build and Production Preview
Compile the optimized production bundle and preview it locally:
```bash
npm run build
npm run preview
```

---

## ⚙️ Environment Variables

The application configures the following environment parameters:

```env
# Supabase connection endpoints (Safe for client bundle exposure)
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>

# Google Gemini AI Integration (Optional)
GEMINI_API_KEY=<your-gemini-key>

# IPFS Storage Gateway configuration
VITE_IPFS_GATEWAY_URL="https://gateway.pinata.cloud/ipfs"

# Legacy/Local Development Direct Pinata mode (Optional - DO NOT use in production)
# VITE_PINATA_JWT=<your-development-only-token>
```

---

## 🗄️ Database Setup & Schema

Execute the following database scripts in order inside the **Supabase SQL Editor**:
### Step 1: Create Language Table  (`product_translations.sql`)
Sets up the base language table.

### Step 2: Brands Schema (`products_brands.sql`)
Sets up the base brand table.

### Step 3: Category  Schema (`products_categories.sql`)
Sets up the base category table.

### Step 4: Product Table (`products_product.sql`)
Sets up  the base product table.

### Step 5: Product  Table with Foreign Keys (`products_setup.sql`)
Sets up the foundational tables (`orders`, `user_roles`) and maps RLS constraints.

### Step 6: Transactional Outbox Schema (`outbox.sql`)
Creates the `domain_events` table and transactional function `create_order_with_outbox` to verify order integrity at checkout.

### Step 7: Guest User Cleanup Configuration (`products_anonymous_cleanup_setup.sql`)
Configures activity log tables and triggers to automatically delete guest records and order caches 7 days after all orders are delivered.

### Step 8: Secure Order Cancellation RPC (`cancel_order_rpc.sql`)
Deploys the transactional Pl/pgSQL RPC function:
```sql
-- Creates the public.cancel_order_with_inventory(p_order_id) function
-- Enforces auth checks, updates order status history, and rolls back product quantities.
```

---

## ☁️ Supabase Edge Functions Deployment

Deploy the IPFS proxy serverless function to prevent frontend key leakage.

### 1. Set the Pinata JWT Secret in Supabase
Store your Pinata access token securely on the Supabase platform:
```bash
npx supabase secrets set PINATA_JWT="your_secure_pinata_jwt_token_here"
```

### 2. Deploy the Deno Function
Run the deployment command from the project root folder. The `--no-verify-jwt` flag is required because client storefront browsers make the requests without a backend service key:
```bash
npx supabase functions deploy upload-to-ipfs --no-verify-jwt
```

---

## 🔄 Fulfillment Lifecycle

Orders flow through a strict state machine. Each state change triggers real-time updates and notification broadcasts:

```text
                                        ┌────────────────────────┐
                                        │  cancelled / refunded  │◄── (If cancelled, payment is refunded
                                        └───────────▲────────────┘     and stock is restored)
                                                    │
                                                    ├──────────────────────────────┐
                                                    │                              │
[Customer places order] ──► pending (Can be cancelled by Owner/Admin)              │ (Can be cancelled)
                              │                                                    │
                              ▼ (Admin accepts)                                    │
                           accepted ───────────────────────────────────────────────┘
                              │
                              ▼ (Admin compiles package)
                            ready (Appears in Shipper Queue)
                              │
                              ▼ (Shipper ships)
                           shipped
                              │
                              ▼ (Shipper delivers)
                          delivered (Removed from Shipper Queue)
```

---

<div align="center">
  <p>Built with ❤️ using Clean Architecture, React, TypeScript & Supabase</p>
</div>
