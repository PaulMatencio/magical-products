-- Payments (core table)
CREATE TABLE payments (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    order_id            UUID REFERENCES orders(id) ON DELETE RESTRICT,
    
    -- Payment classification
    payment_type        TEXT NOT NULL CHECK (payment_type IN ('fiat', 'crypto')),
    
    -- Provider info
    provider            TEXT NOT NULL,          -- 'stripe', 'adyen', 'wero', 'coinbase', 'nowpayments'
    provider_payment_id TEXT NOT NULL,
    provider_status     TEXT NOT NULL,
    
    -- Amounts (fiat: cents | crypto: smallest unit)
    amount_requested     BIGINT NOT NULL,
    amount_paid          BIGINT,
    requested_currency   TEXT NOT NULL,         -- 'EUR', 'USD', 'BTC', 'ETH', 'USDC'
    settlement_currency  TEXT,
    
    -- Exchange rate tracking
    exchange_rate_at_init DECIMAL(20,8),
    exchange_rate_at_settlement DECIMAL(20,8),
    fiat_amount_cents     BIGINT,
    
    -- Over/under payment tolerance
    expected_amount       BIGINT,
    overpayment_tolerance DECIMAL(5,2) DEFAULT 2.5,
    underpayment_tolerance DECIMAL(5,2) DEFAULT 2.5,
    excess_amount         BIGINT DEFAULT 0,
    shortfall_amount      BIGINT DEFAULT 0,
    
    -- Timestamps
    initiated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at        TIMESTAMPTZ,
    expires_at          TIMESTAMPTZ,
    
    -- Crypto-specific fields
    crypto_address       TEXT,
    crypto_transaction_hash TEXT,
    crypto_network       TEXT,
    confirmations_needed INT DEFAULT 3,
    confirmations_received INT DEFAULT 0,
    
    -- Metadata & audit
    customer_ip          TEXT,                 -- Supabase-friendly (INET works too, but TEXT is simpler)
    metadata            JSONB DEFAULT '{}',
    
    -- Supabase-specific
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(provider, provider_payment_id)
);

-- Indexes
CREATE INDEX idx_payments_user_id ON payments(user_id);
CREATE INDEX idx_payments_payment_type ON payments(payment_type);
CREATE INDEX idx_payments_provider_status ON payments(provider, provider_status);
CREATE INDEX idx_payments_crypto_address ON payments(crypto_address) WHERE payment_type = 'crypto';
CREATE INDEX idx_payments_transaction_hash ON payments(crypto_transaction_hash);
CREATE INDEX idx_payments_expires_at ON payments(expires_at) WHERE completed_at IS NULL;
CREATE INDEX idx_payments_initiated_at ON payments(initiated_at DESC);



-- Refunds (for refunds/chargebacks)

CREATE TABLE refunds (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    payment_id          UUID NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
    
    provider_refund_id  TEXT NOT NULL,
    amount              BIGINT NOT NULL,
    reason              TEXT,
    
    status              TEXT NOT NULL CHECK (status IN ('pending', 'succeeded', 'failed')),
    
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    processed_at        TIMESTAMPTZ,
    
    metadata            JSONB DEFAULT '{}',
    
    UNIQUE(provider_refund_id)
);

CREATE INDEX idx_refunds_payment_id ON refunds(payment_id);
CREATE INDEX idx_refunds_status ON refunds(status);


-- Crypto Confirmations Tracker

CREATE TABLE crypto_confirmations (
    id                  BIGSERIAL PRIMARY KEY,
    payment_id          UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    
    transaction_hash    TEXT NOT NULL,
    block_height        BIGINT,
    confirmations_count INT NOT NULL,
    target_confirmations INT NOT NULL,
    
    is_finalized        BOOLEAN DEFAULT FALSE,
    detected_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE(payment_id, block_height)
);

CREATE INDEX idx_crypto_confirmations_payment_id ON crypto_confirmations(payment_id);
CREATE INDEX idx_crypto_confirmations_hash ON crypto_confirmations(transaction_hash);


-- Conversion Ledger (for crypto → fiat accounting)

CREATE TABLE conversion_ledger (
    id                  BIGSERIAL PRIMARY KEY,
    payment_id          UUID NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
    
    from_currency       TEXT NOT NULL,
    to_currency         TEXT NOT NULL,
    from_amount         BIGINT NOT NULL,
    to_amount_cents     BIGINT NOT NULL,
    
    exchange_rate       DECIMAL(20,8) NOT NULL,
    conversion_fee_cents BIGINT DEFAULT 0,
    conversion_source   TEXT,
    
    converted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversion_ledger_payment_id ON conversion_ledger(payment_id);



-- Supported Crypto Assets (Reference Table)

CREATE TABLE supported_crypto_assets (
    id                  SERIAL PRIMARY KEY,
    symbol              TEXT NOT NULL UNIQUE,
    network             TEXT NOT NULL,
    
    is_active           BOOLEAN DEFAULT TRUE,
    min_payment         BIGINT NOT NULL,
    max_payment         BIGINT,
    confirmations_required INT DEFAULT 3,
    expires_minutes     INT DEFAULT 30,
    
    contract_address    TEXT,
    explorer_url        TEXT,
    logo_url            TEXT,
    
    metadata            JSONB DEFAULT '{}'
);

CREATE INDEX idx_crypto_assets_active ON supported_crypto_assets(is_active) WHERE is_active = TRUE;


--  Payment Events Log (Audit Trail)

CREATE TABLE payment_events (
    id                  BIGSERIAL PRIMARY KEY,
    payment_id          UUID NOT NULL REFERENCES payments(id) ON DELETE CASCADE,
    
    event_type          TEXT NOT NULL,
    provider_event_id   TEXT UNIQUE,
    old_status          TEXT,
    new_status          TEXT,
    
    payload             JSONB NOT NULL,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payment_events_payment_id ON payment_events(payment_id);
CREATE INDEX idx_payment_events_created_at ON payment_events(created_at DESC);

-- Link payment_id to orders table
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS payment_id UUID REFERENCES public.payments(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);