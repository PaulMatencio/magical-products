export interface CartItem {
  id: string;
  price: number;
  cart_quantity: number;
}

export interface PaymentIntentResult {
  providerPaymentId: string;
  clientSecret?: string;
  redirectUrl?: string;
  qrCodeData?: string;
  metadata?: Record<string, any>;
}

export interface VerificationResult {
  status: 'succeeded' | 'failed' | 'cancelled' | 'pending' | 'requires_action';
  amountPaid?: number;
  providerPaymentId?: string;
  paymentMethodUsed?: string;
  error?: string;
  metadata?: Record<string, any>;
}

export abstract class PaymentProviderAdapter {
  abstract providerName: string;

  // Create checkout session / payment intent on the provider's API
  abstract createCheckoutSession(
    paymentId: string,
    amountInCents: number,
    email: string | null,
    cart: CartItem[],
    reqBody: any,
    reqHeaders: Headers,
    supabase: any
  ): Promise<PaymentIntentResult>;

  // Verify checkout status from the provider's API
  abstract verifyPaymentStatus(
    paymentRecord: any,
    sessionIdOrTxHash: string | null,
    reqBody: any,
    reqHeaders: Headers,
    supabase: any
  ): Promise<VerificationResult>;
}

export interface RefundResult {
  status: 'succeeded' | 'pending' | 'failed';
  amountRefunded: number;
  providerRefundId: string;
  metadata?: Record<string, any>;
  recipientAddress?: string; // For crypto refunds
}

export abstract class PaymentRefundAdapter {
  abstract providerName: string;

  abstract executeRefund(
    paymentRecord: any,
    reason: string | null,
    reqBody: any,
    reqHeaders: Headers,
    supabase: any
  ): Promise<RefundResult>;
}

export interface WebhookEventResult {
  eventType: 'payment_succeeded' | 'payment_failed' | 'payment_cancelled' | 'refund_processed' | 'ignore';
  paymentId?: string;
  providerPaymentId?: string;
  amount?: number;
  paymentMethodUsed?: string;
  refundId?: string;
  refundStatus?: 'succeeded' | 'failed' | 'pending';
  metadata?: Record<string, any>;
}

export abstract class PaymentWebhookAdapter {
  abstract providerName: string;

  abstract parseAndVerifyWebhook(
    req: Request,
    reqBodyText: string,
    reqHeaders: Headers,
    supabase: any
  ): Promise<WebhookEventResult[]>;

  abstract getResponseForEvent(
    events: WebhookEventResult[],
    paymentRecord?: any
  ): Response;
}
