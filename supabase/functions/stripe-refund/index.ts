/// <reference path="../deno.d.ts" />

import Stripe from 'https://esm.sh/stripe@16.12.0?target=denonext';
import { handleRefundRequest } from '../_shared/refundOrchestrator.ts';
import { PaymentRefundAdapter, RefundResult } from '../_shared/paymentProvider.ts';

class StripeRefundAdapter extends PaymentRefundAdapter {
  providerName = 'stripe';

  private getStripe() {
    const key = Deno.env.get('STRIPE_SECRET_KEY');
    if (!key) throw new Error('STRIPE_SECRET_KEY secret is not configured.');
    return new Stripe(key, {
      apiVersion: '2026-04-22.dahlia',
      httpClient: Stripe.createFetchHttpClient(),
    });
  }

  async executeRefund(
    paymentRecord: any,
    reason: string | null,
    _reqBody: any,
    _reqHeaders: Headers,
    _supabase: any
  ): Promise<RefundResult> {
    const stripe = this.getStripe();
    let paymentIntentId = paymentRecord.provider_payment_id;
    if (!paymentIntentId) {
      throw new Error('No provider_payment_id found on payment record.');
    }

    let stripeRefund: any;
    const isSimulated = paymentIntentId.startsWith('pay_');

    if (isSimulated) {
      console.log(`Payment ${paymentRecord.id} is a simulated/local payment. Simulating Stripe refund...`);
      stripeRefund = {
        id: `re_sim_${Math.random().toString(36).substring(2, 11)}`,
        amount: paymentRecord.amount_paid || paymentRecord.amount_requested,
        reason: reason || 'requested_by_customer',
        status: 'succeeded',
        currency: paymentRecord.requested_currency || 'EUR'
      };
    } else {
      if (paymentIntentId.startsWith('cs_')) {
        console.log(`provider_payment_id is a Checkout Session: ${paymentIntentId}. Retrieving session to extract Payment Intent...`);
        const session = await stripe.checkout.sessions.retrieve(paymentIntentId, {
          expand: ['payment_intent']
        });
        if (session.payment_intent) {
          paymentIntentId = typeof session.payment_intent === 'string'
            ? session.payment_intent
            : (session.payment_intent as any).id;
          console.log(`Extracted Payment Intent ID: ${paymentIntentId}`);
        } else {
          throw new Error(`Failed to extract payment_intent from checkout session ${session.id}`);
        }
      }

      console.log(`Initiating Stripe refund for payment intent: ${paymentIntentId}`);

      stripeRefund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        reason: (reason || 'requested_by_customer') as any,
      });
    }

    console.log(`Stripe refund processed: ${stripeRefund.id}`);

    return {
      status: stripeRefund.status === 'succeeded' ? 'succeeded' : 'pending',
      amountRefunded: stripeRefund.amount,
      providerRefundId: stripeRefund.id,
      metadata: { stripe_refund: stripeRefund }
    };
  }
}

Deno.serve(async (req) => {
  return handleRefundRequest(req, new StripeRefundAdapter());
});
