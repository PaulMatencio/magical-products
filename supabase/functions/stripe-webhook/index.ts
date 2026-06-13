/// <reference path="../deno.d.ts" />

import Stripe from 'https://esm.sh/stripe@16.12.0?target=denonext';
import { handleWebhookRequest, corsHeaders } from '../../_shared/webhookOrchestrator.ts';
import { PaymentWebhookAdapter, WebhookEventResult } from '../../_shared/paymentProvider.ts';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

class StripeWebhookAdapter extends PaymentWebhookAdapter {
  providerName = 'stripe';

  async parseAndVerifyWebhook(
    req: Request,
    reqBodyText: string,
    reqHeaders: Headers,
    _supabase: SupabaseClient
  ): Promise<WebhookEventResult[]> {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured in env variables.');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2026-04-22.dahlia',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const signature = reqHeaders.get('stripe-signature');
    let event;

    if (stripeWebhookSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(
        reqBodyText,
        signature,
        stripeWebhookSecret
      );
    } else {
      console.warn('STRIPE_WEBHOOK_SECRET or stripe-signature header is missing. Parsing payload directly (sandbox-only).');
      event = JSON.parse(reqBodyText);
      if (event.livemode) {
        throw new Error('Signature verification required for live mode');
      }
    }

    console.log(`Received Stripe event: ${event.type}`);

    if (event.type === 'checkout.session.completed' || event.type === 'payment_intent.succeeded') {
      let paymentId: string | undefined;
      let paymentIntentId: string;
      let amountTotal: number;
      let paymentMethodUsed = 'card';

      if (event.type === 'payment_intent.succeeded') {
        const intent = event.data.object as Stripe.PaymentIntent;
        paymentId = intent.metadata?.payment_id;
        paymentIntentId = intent.id;
        amountTotal = intent.amount;
        paymentMethodUsed = intent.payment_method_types?.[0] || 'card';
      } else {
        const session = event.data.object as Stripe.Checkout.Session;
        paymentId = session.metadata?.payment_id;
        paymentIntentId = session.id;
        if (session.payment_intent) {
          paymentIntentId = typeof session.payment_intent === 'string'
            ? session.payment_intent
            : (session.payment_intent as any).id || session.id;
        }
        amountTotal = session.amount_total ?? 0;
        paymentMethodUsed = session.metadata?.payment_method || 'card';

        try {
          const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
            expand: ['payment_intent']
          });
          const pi = fullSession.payment_intent as any;
          if (pi && pi.payment_method_types && pi.payment_method_types.length > 0) {
            paymentMethodUsed = pi.payment_method_types[0];
          }
        } catch (err) {
          console.error("Failed to retrieve expanded session in webhook:", err);
        }
      }

      return [{
        eventType: 'payment_succeeded',
        paymentId,
        providerPaymentId: paymentIntentId,
        amount: amountTotal,
        paymentMethodUsed
      }];

    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;

      return [{
        eventType: 'payment_cancelled',
        paymentId
      }];

    } else if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const paymentId = intent.metadata?.payment_id;

      return [{
        eventType: 'payment_failed',
        paymentId
      }];
    }

    return [{ eventType: 'ignore' }];
  }

  getResponseForEvent(
    _events: WebhookEventResult[],
    _paymentRecord?: any
  ): Response {
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}

Deno.serve(async (req) => {
  return handleWebhookRequest(req, new StripeWebhookAdapter());
});
