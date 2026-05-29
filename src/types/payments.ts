export interface Payment {
    id: string;                       // UUID
    user_id: string;                  // UUID (references auth.users)
    order_id: string | null;          // UUID (nullable)

    // Payment classification
    payment_type: 'fiat' | 'crypto';

    // Provider info
    provider: string;                 // 'stripe', 'adyen', 'wero', 'coinbase', 'nowpayments'
    provider_payment_id: string;
    provider_status: string;          // 'pending', 'succeeded', 'failed', 'expired', 'requires_capture'

    // Amounts
    amount_requested: number;         // BIGINT (smallest currency unit: cents or satoshis)
    amount_paid: number | null;
    requested_currency: string;       // 'EUR', 'USD', 'BTC', 'ETH', 'USDC'
    settlement_currency: string | null;

    // Exchange rate tracking
    exchange_rate_at_init: number | null;      // DECIMAL(20,8)
    exchange_rate_at_settlement: number | null;
    fiat_amount_cents: number | null;          // BIGINT

    // Over/under payment tolerance
    expected_amount: number | null;
    overpayment_tolerance: number | null;      // DECIMAL(5,2)
    underpayment_tolerance: number | null;
    excess_amount: number | null;
    shortfall_amount: number | null;

    // Timestamps
    initiated_at: string;             // ISO 8601 timestamp
    completed_at: string | null;
    expires_at: string | null;

    // Crypto-specific
    crypto_address: string | null;
    crypto_transaction_hash: string | null;
    crypto_network: string | null;    // 'bitcoin', 'ethereum', 'polygon', 'solana'
    confirmations_needed: number | null;
    confirmations_received: number | null;

    // Metadata & audit
    customer_ip: string | null;
    metadata: Record<string, any>;    // JSONB
    created_at: string;
    updated_at: string;
}


export interface Refund {
    id: string;                       // UUID
    payment_id: string;               // UUID (references payments.id)
    provider_refund_id: string;
    amount: number;                   // BIGINT (cents or smallest unit)
    reason: string | null;            // 'customer_request', 'fraud', 'duplicate', 'item_not_received'
    status: 'pending' | 'succeeded' | 'failed';
    created_at: string;
    processed_at: string | null;
    metadata: Record<string, any>;
}



export interface CryptoConfirmation {
    id: number;
    payment_id: string;
    transaction_hash: string;
    confirmations: number;
    created_at: string;
    updated_at: string;
}

export interface ConversionLedger {
    id: number;
    payment_id: string;
    fiat_amount_cents: number;
    exchange_rate: number;
    converted_at: string;
}

export interface PaymentEvent {
    id: number;
    payment_id: string;
    event_type: string;
    provider_event_id: string;
    old_status: string;
    new_status: string;
    payload: Record<string, any>;
    created_at: string;
}

export interface SupportedCryptoAsset {
    id: number;
    symbol: string;
    network: string;
    is_active: boolean;
    min_payment: number;
    max_payment: number | null;
    confirmations_required: number;
    expires_minutes: number | null;
    contract_address: string | null;
    explorer_url: string | null;
    logo_url: string | null;
    metadata: Record<string, any>;
}