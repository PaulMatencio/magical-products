/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Application configuration.
 * Edit the values below to customize app behavior.
 */

const appConfig = {
  // ── Backend Provider ──────────────────────────────────────────────

  /**
   * The active database provider.
   * Options: 'supabase' | 'appwrite'
   */
  databaseProvider: (import.meta.env.VITE_DATABASE_PROVIDER as 'supabase' | 'appwrite') || 'supabase',

  // ── Inactivity & Session ──────────────────────────────────────────

  /**
   * Inactivity timeout in minutes.
   * The user will be automatically signed out after this many minutes
   * of no mouse, keyboard, scroll, or touch activity.
   * Set to 0 to disable the forced sign-out.
   */
  inactivityTimeoutMinutes: 120,

  /**
   * Cart auto-clear timeout in minutes.
   * If the user is inactive for this long and has items in their cart,
   * the cart will be emptied and inventory restored.
   * Must be <= inactivityTimeoutMinutes (cart is cleared before sign-out).
   */
  cartInactivityTimeoutMinutes: 90,

  /**
   * How often (in seconds) to check for user inactivity.
   */
  inactivityCheckIntervalSeconds: 180,

  /**
   * Anonymous account cleanup threshold in days.
   * Anonymous users can be removed from the database after this many days
   * of inactivity, but only when all of their orders have been delivered.
   * Keep this value aligned with public.app_settings.anonymous_cleanup_days
   * in Supabase.
   */
  anonymousCleanupInactiveDays: 7,

  // ── Network ───────────────────────────────────────────────────────

  /**
   * Connection timeout in seconds.
   * If the initial data fetch (products + categories) takes longer than
   * this, a timeout error is shown to the user.
   */
  connectionTimeoutSeconds: 30,

  // ── UI / Animations ───────────────────────────────────────────────

  /**
   * Duration in milliseconds for the "Added to cart" confirmation
   * flash that appears on the ToyList add-to-cart button.
   */
  addToCartFlashMs: 1200,

  // ── Crypto / Payments ─────────────────────────────────────────────

  /**
   * Wallet addresses for receiving crypto payments.
   */
  cryptoReceiverAddresses: {
    metamask: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    coinbase: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
    trust: 'bnb136ns6lfw4zs5hg4n85vdthaad7hq5m4gtkgf23',
    phantom: 'HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH',
    // lace: 'addr1q9c8j4tqwqfqv9r8w3y8hqw3l2nqwz5jqwqfqv9r', // mock ADA address
    lace: 'addr_test1qp98z50aselep9dc0rsnfx55l5lvzrjc3k8w5hnuvp98exc4uf3y5cpku5etafrsjtpmyr3uhph67qh6nq9t0vvav6gslc696y',
  },

  // ── IPFS ──────────────────────────────────────────────────────────

  /**
   * Primary public gateway used to build readable URLs after an IPFS upload.
   * Pinata upload credentials and provider endpoint are read from environment
   * variables in src/services/ipfsService.ts.
   */
  ipfsGatewayUrl: import.meta.env.VITE_IPFS_GATEWAY_URL || 'https://gateway.pinata.cloud/ipfs',

  // ── Authentication ────────────────────────────────────────────────

  /**
   * hCaptcha Site Key used for Supabase anonymous login protection.
   * Note: Using the official test key by default. Replace with your
   *  actual key for production.
   */
  hCaptchaSiteKey: "10000000-ffff-ffff-ffff-000000000001",

  // ── Appwrite ──────────────────────────────────────────────────────
  appwrite: {
    endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    collections: {
      products: import.meta.env.VITE_APPWRITE_PRODUCTS_COLLECTION_ID,
      categories: import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID,
      orders: import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID,
    }
  },

  // ── EmailJS ───────────────────────────────────────────────────────
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_xazkrll',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_34vxj9a',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'emsNVSiJb6w9WhEFH',
  },

  // ── Currency / Localization ─────────────────────────────────────────
  currency_symbol: import.meta.env.VITE_CURRENCY_SYMBOL || '$',
  currencySymbol: import.meta.env.VITE_CURRENCY_SYMBOL || '$',

  // ── Cancellation Policies ─────────────────────────────────────────
  cancellation: {
    allowedStatuses: ['pending', 'accepted'],
    defaultPolicyText: 'Read the cancelation and refund policy user guide for more information. Once cancelled, the items are returned to inventory.'
  },

  paymentMethods: ["stripe", "adyen", "paypal", "worldline", "crypto"],

  /**
   * The active fiat payment gateway to use.
   * Options: 'stripe' | 'adyen'
   */
  activeFiatGateway: (import.meta.env.VITE_ACTIVE_FIAT_GATEWAY as 'stripe' | 'adyen') || 'adyen',

  stripe: {
    publishableKey: import.meta.env.VITE_NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
  },

  adyen: {
    clientKey: import.meta.env.VITE_ADYEN_CLIENT_KEY || 'test_8390fdjka8920fhsjakldfhsa738920fh',
    environment: (import.meta.env.VITE_ADYEN_ENVIRONMENT as 'test' | 'live') || 'test',
  },

  // ── Wero Payment Integration ──────────────────────────────────────
  wero: {
    sandboxUrl: "https://api.sandbox.wero-wallet.eu/v1",
    merchantId: "mid_magical_prod_test_90432",
    apiKey: "wero_sb_key_9083fdjklaf984"
  }
};

export default appConfig;
