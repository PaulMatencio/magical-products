/// <reference path="../deno.d.ts" />

import Stripe from 'https://esm.sh/stripe@16.12.0?target=denonext';
import { handleCheckoutRequest } from '../../_shared/checkoutOrchestrator.ts';
import { PaymentProviderAdapter, CartItem, PaymentIntentResult, VerificationResult } from '../../_shared/paymentProvider.ts';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

class StripeAdapter extends PaymentProviderAdapter {
  providerName = 'stripe';

  private getStripe() {
    const key = Deno.env.get('STRIPE_SECRET_KEY');
    if (!key) throw new Error('STRIPE_SECRET_KEY secret is not configured.');
    return new Stripe(key, {
      apiVersion: '2026-04-22.dahlia',
      httpClient: Stripe.createFetchHttpClient(),
    });
  }

  async createCheckoutSession(
    paymentId: string,
    amountInCents: number,
    email: string | null,
    _cart: CartItem[],
    _reqBody: Record<string, unknown>,
    _reqHeaders: Headers,
    _supabase: SupabaseClient
  ): Promise<PaymentIntentResult> {
    const stripe = this.getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      description: `Order payment for ID: ${paymentId}`,
      receipt_email: email || undefined,
      metadata: {
        payment_id: paymentId,
        is_sandbox: 'true',
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      providerPaymentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret || undefined
    };
  }

  async verifyPaymentStatus(
    paymentRecord: any,
    sessionIdOrTxHash: string | null,
    _reqBody: Record<string, unknown>,
    _reqHeaders: Headers,
    _supabase: SupabaseClient
  ): Promise<VerificationResult> {
    const stripe = this.getStripe();
    const activePaymentIntentId = sessionIdOrTxHash || paymentRecord.provider_payment_id;
    if (!activePaymentIntentId) {
      throw new Error('No Stripe PaymentIntent ID found for this payment confirmation.');
    }

    const pi = await stripe.paymentIntents.retrieve(activePaymentIntentId);

    let status: 'succeeded' | 'failed' | 'cancelled' | 'pending' = 'pending';
    if (pi.status === 'succeeded') {
      status = 'succeeded';
    } else if (pi.status === 'canceled') {
      status = 'cancelled';
    } else if (pi.status === 'requires_payment_method' || pi.last_payment_error) {
      status = 'failed';
    } else if (pi.status === 'requires_action') {
      status = 'requires_action' as any;
    }

    return {
      status,
      amountPaid: pi.amount_received,
      providerPaymentId: pi.id,
      paymentMethodUsed: pi.payment_method_types?.[0] || 'card',
      error: pi.last_payment_error?.message
    };
  }
}

Deno.serve(async (req) => {
  return handleCheckoutRequest(req, new StripeAdapter());
});
