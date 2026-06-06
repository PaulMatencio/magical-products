# Magical Products Installation Guide

This guide explains how to install and run the Magical Products application from scratch on a new machine and a new backend project.

The recommended setup is:

- Frontend: React + TypeScript + Vite
- Backend: Supabase
- Storage uploads: Supabase Edge Function proxy to Pinata/IPFS
- Fiat payments: Adyen, Stripe, Wero (Worldline), PayPal, Digital Euro
- Crypto payments: Cardano ADA through Lace wallet and Blockfrost confirmation

The application also has Appwrite repository adapters, but Supabase is the most complete path and is the default used throughout this guide.

## 1. Prerequisites

Install these locally:

- Node.js 20 or newer
- npm 10 or newer
- Git
- Supabase CLI, optional but recommended
- A Supabase account
- A Pinata account, if you want IPFS product image/metadata uploads
- A Stripe, Adyen, Wero (Worldline), PayPal sandbox account, if you want real fiat checkout testing
- A Blockfrost project ID, if you want Cardano confirmation testing
- Lace or Eternl browser wallet, if you want to test Cardano ADA payments

Check local versions:

```bash
node --version
npm --version
git --version
```

Install the Supabase CLI if needed:

```bash
npm install -g supabase
```

## 2. Clone And Install

```bash
git clone <repository-url>
cd magical-products
npm install
```

The project scripts are:

```bash
npm run dev          # start Vite on port 3000
npm run build        # production build
npm run preview      # preview production build
npm run lint         # TypeScript typecheck
npm run test:run     # run Vitest tests once
```

## 3. Create The Local Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Then edit `.env`. For a Supabase-first install, use this shape:

```env
# Backend provider
VITE_DATABASE_PROVIDER=supabase

# Supabase
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>

# Optional Gemini/product scanner support
GEMINI_API_KEY=<your-gemini-api-key>
VITE_GEMINI_API_KEY=<your-gemini-api-key>

# IPFS/Pinata
VITE_IPFS_GATEWAY_URL=https://gateway.pinata.cloud/ipfs
VITE_PINATA_UPLOAD_URL=https://api.pinata.cloud/pinning/pinFileToIPFS
VITE_PINATA_UNPIN_URL=https://api.pinata.cloud/pinning/unpin

# Fiat gateway selection
VITE_ACTIVE_FIAT_GATEWAY=adyen

# Stripe, required only when VITE_ACTIVE_FIAT_GATEWAY=stripe
VITE_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>

# Adyen, required only when VITE_ACTIVE_FIAT_GATEWAY=adyen
VITE_ADYEN_CLIENT_KEY=<your-adyen-client-key>
VITE_ADYEN_ENVIRONMENT=test

# Worldline/Wero, required only when VITE_ACTIVE_FIAT_GATEWAY=worldline
VITE_WORLDLINE_CLIENT_KEY=<your-worldline-client-key>
VITE_WORLDLINE_ENVIRONMENT=test

# Cardano/Blockfrost, required for Lace ADA confirmation
VITE_BLOCKFROST_PROJECT_ID=<your-blockfrost-preprod-or-mainnet-project-id>

# Optional UI
VITE_CURRENCY_SYMBOL=$
```

Notes:

- Use the Supabase anon/publishable key that starts like a JWT. If the app logs a warning about the key not starting with `eyJ`, you likely copied the wrong key.
- Do not put production secret keys in `.env` with a `VITE_` prefix. `VITE_` variables are bundled into the browser.
- Pinata JWT, Stripe secret keys, Adyen API keys, and Worldline/Wero secrets belong in Supabase Edge Function secrets.

## 4. Create A Supabase Project

1. Open Supabase and create a new project.
2. Save the project reference, URL, anon key, and database password.
3. In Authentication settings, enable email/password sign-in.
4. If you want guest checkout, enable anonymous sign-ins in Supabase Auth.
5. Add your local app URL to allowed redirect URLs:

```text
http://localhost:3000
http://localhost:3000/
```

For deployed sites, also add the production URL, for example:

```text
https://<your-domain>
https://<your-domain>/
```

## 5. Run Database SQL Scripts

Open the Supabase SQL Editor and run the database scripts from the repo root.

Recommended order for a fresh Supabase project:

```text
1. products_langage.sql
2. products_brands.sql
3. products_categories.sql
4. products_product.sql
5. products_setup.sql
6. user_roles_address_setup.sql
7. business_owner_role_setup.sql
8. products_admin_setup.sql
9. products_operator_setup.sql
10. products_shipper_setup.sql
11. products_payment.sql
12. orders_rls_setup.sql
13. orders_status_history_setup.sql
14. products_infrastructure_transactionality.sql
15. outbox.sql
16. cancel_order_rpc.sql
17. cancellation_policy_setup.sql
18. products_realtime_setup.sql
19. products_anonymous.sql
20. products_anonymous_cleanup_setup.sql
```

Optional catalog seed/maintenance scripts:

```text
products_categories_maintenance.sql
products_category_translations.sql
products_italian_brands_shop.sql
products_italian_categorie_shop.sql
products_italian_brands_view.sql
products_italian_brand_ids_sample.sql
products_category_thai_restaurant.sql
products_retailer.sql
products_validation_orders.sql
products_infrastructure_transactionality.sql
products_realtime_setup.sql
```

Important functions created by these scripts:

- `decrement_product_stock(target_product_id, amount)`
- `create_order_with_outbox(...)`
- `cancel_order_with_inventory(p_order_id)`

These functions are required for stock reservation, order creation, outbox events, cancellation, and inventory restoration.

## 6. Enable Realtime

The app expects realtime behavior for orders/categories in Supabase.

Run `products_realtime_setup.sql`, then verify in Supabase:

1. Go to Database -> Replication.
2. Ensure realtime is enabled for tables used by the app, especially orders and categories.
3. Confirm RLS policies allow the intended authenticated role access.

## 7. Configure Supabase Edge Function Secrets

Log in and link the project:

```bash
supabase login
supabase link --project-ref <your-project-ref>
```

Set only the secrets for providers you use.

IPFS/Pinata:

```bash
supabase secrets set PINATA_JWT="<your-pinata-jwt>"
supabase secrets set PINATA_UNPIN_URL="https://api.pinata.cloud/pinning/unpin"
```

Stripe:

```bash
supabase secrets set STRIPE_SECRET_KEY="<your-stripe-secret-key>"
supabase secrets set STRIPE_WEBHOOK_SECRET="<your-stripe-webhook-secret>"
```

Adyen:

```bash
supabase secrets set ADYEN_APIKEY="<your-adyen-api-key>"
supabase secrets set ADYEN_MERCHANT_ACCOUNT="<your-adyen-merchant-account>"
supabase secrets set ADYEN_PAYMENT_URL="https://checkout-test.adyen.com/v72"
```

Worldline/Wero, optional:

```bash
supabase secrets set WORLDLINE_PAYMENT_APIKEY_ID="<your-worldline-api-key-id>"
supabase secrets set WORLDLINE_PAYMENT_APIKEY_SECRET="<your-worldline-api-key-secret>"
supabase secrets set WORLDLINE_PAYMENT_URL="<your-worldline-payment-url>"
supabase secrets set WORLDLINE_MERCHANT_ID="<your-worldline-merchant-id>"
```

## 8. Deploy Supabase Edge Functions

Deploy the functions you need.

Minimum for IPFS uploads:

```bash
supabase functions deploy upload-to-ipfs --no-verify-jwt
```

Stripe:

```bash
supabase functions deploy stripe-checkout --no-verify-jwt
supabase functions deploy stripe-webhook --no-verify-jwt
supabase functions deploy stripe-refund --no-verify-jwt
```

Adyen:

```bash
supabase functions deploy adyen-checkout --no-verify-jwt
supabase functions deploy adyen-webhook --no-verify-jwt
supabase functions deploy adyen-refund --no-verify-jwt
```

Worldline/Wero:

```bash
supabase functions deploy wero-checkout --no-verify-jwt
supabase functions deploy wero-webhook --no-verify-jwt
supabase functions deploy wero-refund --no-verify-jwt
```

Digital Euro sandbox:

```bash
supabase functions deploy digital-euro-checkout --no-verify-jwt
supabase functions deploy digital-euro-refund --no-verify-jwt
```

## 9. Configure Payment Providers

### Adyen

Set:

```env
VITE_ACTIVE_FIAT_GATEWAY=adyen
VITE_ADYEN_CLIENT_KEY=<your-client-key>
VITE_ADYEN_ENVIRONMENT=test
```

Set Supabase secrets:

```bash
supabase secrets set ADYEN_APIKEY="<your-api-key>"
supabase secrets set ADYEN_MERCHANT_ACCOUNT="<your-merchant-account>"
supabase secrets set ADYEN_PAYMENT_URL="https://checkout-test.adyen.com/v72"
```

Deploy:

```bash
supabase functions deploy adyen-checkout --no-verify-jwt
supabase functions deploy adyen-webhook --no-verify-jwt
supabase functions deploy adyen-refund --no-verify-jwt
```

### Stripe

Set:

```env
VITE_ACTIVE_FIAT_GATEWAY=stripe
VITE_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-publishable-key>
```

Set Supabase secrets:

```bash
supabase secrets set STRIPE_SECRET_KEY="<your-secret-key>"
supabase secrets set STRIPE_WEBHOOK_SECRET="<your-webhook-secret>"
```

Deploy:

```bash
supabase functions deploy stripe-checkout --no-verify-jwt
supabase functions deploy stripe-webhook --no-verify-jwt
supabase functions deploy stripe-refund --no-verify-jwt
```

### Wero (Worldline)

Configure Wero sandbox details and credentials.

1. Deploy the Wero edge functions:

```bash
supabase functions deploy wero-checkout --no-verify-jwt
supabase functions deploy wero-webhook --no-verify-jwt
supabase functions deploy wero-refund --no-verify-jwt
```

2. Set Supabase secrets for Worldline Wero integration:

```bash
supabase secrets set WORLDLINE_PAYMENT_APIKEY_ID="<your-worldline-api-key-id>"
supabase secrets set WORLDLINE_PAYMENT_APIKEY_SECRET="<your-worldline-api-key-secret>"
supabase secrets set WORLDLINE_PAYMENT_URL="https://payment.sandbox.pay1.de/wero/v1"
supabase secrets set WORLDLINE_MERCHANT_ID="<your-worldline-merchant-id>"
```

3. Ensure `worldline` is included in the `paymentMethods` array in `src/config/appConfig.ts` to expose it on the checkout page:

```ts
paymentMethods: ["stripe", "adyen", "digital_euro", "paypal", "worldline", "crypto"]
```

### Digital Euro (Sandbox)

Digital Euro is a fully simulated Central Bank Digital Currency (CBDC) payment gateway. It does not require any external provider credentials, making it ideal for simulation and test checkout scenarios.

1. Deploy the Digital Euro edge functions:

```bash
supabase functions deploy digital-euro-checkout --no-verify-jwt
supabase functions deploy digital-euro-refund --no-verify-jwt
```

2. Ensure `digital_euro` is included in the `paymentMethods` array in `src/config/appConfig.ts` to expose it on the checkout page:

```ts
paymentMethods: ["stripe", "adyen", "digital_euro", "paypal", "worldline", "crypto"]
```

### Cardano ADA With Lace And Blockfrost

The Cardano flow is browser-wallet based:

1. Customer selects Crypto.
2. Customer connects Lace.
3. Checkout builds a Mesh `Transaction`.
4. Lace signs and submits the transaction.
5. The app stores the transaction hash in `payments`.
6. `BlockfrostProvider.onTxConfirmed(...)` waits for confirmation.
7. The app marks the payment as succeeded and completes the order.

Configure:

```env
VITE_BLOCKFROST_PROJECT_ID=<your-blockfrost-project-id>
```

For testnet/preprod, keep the receiver address in `src/config/appConfig.ts` aligned with the same Cardano network:

```ts
cryptoReceiverAddresses: {
  lace: 'addr_test...'
}
```

If you use a mainnet Blockfrost project ID, replace the Lace receiver address with a mainnet Cardano address.

## 10. Start The App Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Expected first-run behavior:

- Landing page loads.
- Store can load product/category data if the database has seed products.
- Empty product table displays an inventory-empty message.
- Sign-in/register works if Supabase Auth is configured.
- Cart requires a user or guest session depending on auth flow.

## 11. Create First Users And Roles

1. Open the app.
2. Register a user account.
3. In Supabase SQL Editor, assign a role.

Admin:

```sql
insert into public.user_roles (user_id, role)
values ('<user-uuid>', 'admin')
on conflict (user_id) do update set role = 'admin';
```

Operator:

```sql
insert into public.user_roles (user_id, role)
values ('<user-uuid>', 'operator')
on conflict (user_id) do update set role = 'operator';
```

Shipper:

```sql
insert into public.user_roles (user_id, role)
values ('<user-uuid>', 'shipper')
on conflict (user_id) do update set role = 'shipper';
```

Business owner:

```sql
insert into public.user_roles (user_id, role)
values ('<user-uuid>', 'owner')
on conflict (user_id) do update set role = 'owner';
```

Sign out and sign back in after changing roles.

## 12. Add Products

You have several options:

- Admin dashboard: manually add products and edit inventory.
- Operator dashboard: bulk-load product images and JSON metadata.
- SQL seed scripts: run the optional catalog scripts.

Required product fields include:

- `name`
- `description`
- `price`
- `category_id`
- `quantity`
- `in_stock`
- `image_url`
- `barcode_id`

For IPFS uploads, confirm that:

- `upload-to-ipfs` is deployed.
- `PINATA_JWT` is set as a Supabase secret.
- `VITE_IPFS_GATEWAY_URL` is set in `.env`.

## 13. Validate The Core Flows

Run checks:

```bash
npm run lint
npm run test:run
npm run build
```

Manual smoke test:

1. Register/sign in.
2. Load the store.
3. Add a product to cart.
4. Confirm product quantity decreases.
5. Remove the product from cart.
6. Confirm product quantity is restored.
7. Add product again and go to checkout.
8. Complete a sandbox payment.
9. Confirm an order appears in order history.
10. Sign in as admin and move order from `pending` to `accepted` to `ready`.
11. Sign in as shipper and move order from `ready` to `shipped` to `delivered`.

Cardano smoke test:

1. Install a browser extension wallet such as Lace or Eternl.
2. Use a wallet funded on the same Cardano network as your Blockfrost project (e.g., Cardano Preprod).
3. Set `VITE_BLOCKFROST_PROJECT_ID` in your `.env` file.
4. Confirm `appConfig.cryptoReceiverAddresses.lace` in `src/config/appConfig.ts` is configured with a receiver address on the same network. (Note: `vite-plugin-wasm` and top-level await support are already pre-configured in `package.json` and `vite.config.ts` so no additional plugin installation is needed).
5. Select Crypto checkout in the app and connect your wallet.
6. Submit the ADA transaction through the wallet extension.
7. Wait for the Blockfrost confirmation.
8. Confirm the payment row status changes from `pending` to `succeeded` and checkout completes.

## 14. Optional Appwrite Mode

The app has Appwrite repository adapters. To use them, set:

```env
VITE_DATABASE_PROVIDER=appwrite
VITE_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
VITE_APPWRITE_PROJECT_ID=<your-project-id>
VITE_APPWRITE_DATABASE_ID=<your-database-id>
VITE_APPWRITE_PRODUCTS_COLLECTION_ID=<your-products-collection-id>
VITE_APPWRITE_CATEGORIES_COLLECTION_ID=<your-categories-collection-id>
VITE_APPWRITE_ORDERS_COLLECTION_ID=<your-orders-collection-id>
```

Supabase is still used by parts of the app for auth, roles, payments, Edge Functions, realtime, and direct service calls. Treat Appwrite mode as an advanced/hybrid setup unless you have audited every direct Supabase usage for your target deployment.

## 15. Production Build And Deployment

Build:

```bash
npm run build
```

Preview locally:

```bash
npm run preview
```

Deploy the generated `dist` folder to your host of choice.

For GitHub Pages, the repo has:

```bash
npm run deploy
```

Before production:

- Add your production URL to Supabase Auth redirect URLs.
- Use production provider keys.
- Remove any development-only `VITE_PINATA_JWT`.
- Confirm RLS policies.
- Confirm Edge Function secrets are set.
- Confirm payment webhooks point to deployed Supabase functions.
- Confirm Cardano receiver address and Blockfrost network match.

## 16. Troubleshooting

### App shows Supabase URL/key errors

Check `.env`:

```env
VITE_SUPABASE_URL=https://<project-ref>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
```

Restart `npm run dev` after changing `.env`.

### Product catalog is empty

Run the schema scripts and seed/add products. Also verify RLS policies allow reads for the current user/anon role.

### Add to cart fails

Check that `decrement_product_stock(UUID, INT)` exists and is executable by `anon` and `authenticated`.

### Checkout creates an order but payment does not complete

Check:

- `payments` table exists from `products_payment.sql`.
- The selected Edge Function is deployed.
- Provider secrets are set.
- Browser console and Supabase function logs.

### Cardano payment submits but never confirms

Check:

- `VITE_BLOCKFROST_PROJECT_ID` is set.
- Lace wallet network matches Blockfrost network.
- Receiver address network matches wallet network.
- The transaction appears on Cardanoscan.
- `cryptoPaymentTimeoutMinutes` in `src/config/appConfig.ts` is long enough for the network.

### IPFS upload fails

Check:

- `upload-to-ipfs` is deployed.
- `PINATA_JWT` is set in Supabase secrets.
- The Pinata token has upload permissions.
- The browser request reaches the Supabase Edge Function.

### Role dashboard is inaccessible

Check `public.user_roles` for the signed-in user's UUID and role. Then sign out and sign back in.

## 17. File Map For Installers

Important files:

```text
package.json                         # scripts and dependencies
.env.example                         # example environment variables
src/config/appConfig.ts              # runtime app configuration
src/services/supabase.ts             # Supabase client setup
src/context/DependenciesContext.tsx   # repository/use-case composition root
src/AppRouter.tsx                    # routing, checkout callbacks, payment completion
src/features/store/components/Checkout.tsx
supabase/functions/*                 # Edge Functions
*.sql                                # database setup and maintenance scripts
```

## 18. Minimal Successful Install Checklist

- Dependencies installed with `npm install`
- `.env` created and filled
- Supabase project created
- SQL scripts run
- At least one product exists
- Edge Functions deployed for selected providers
- Secrets set in Supabase
- `npm run lint` passes
- `npm run build` passes
- Local app runs at `http://localhost:3000`
- Admin user role assigned
- Test order can be placed and fulfilled
