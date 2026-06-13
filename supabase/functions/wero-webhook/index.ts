/// <reference path="../deno.d.ts" />

import { handleWebhookRequest, corsHeaders } from '../_shared/webhookOrchestrator.ts';
import { PaymentWebhookAdapter, WebhookEventResult } from '../_shared/paymentProvider.ts';

class WeroWebhookAdapter extends PaymentWebhookAdapter {
  providerName = 'wero';

  async parseAndVerifyWebhook(
    req: Request,
    reqBodyText: string,
    _reqHeaders: Headers,
    _supabase: any
  ): Promise<WebhookEventResult[]> {
    const body = JSON.parse(reqBodyText);
    const { wero_tx_id, payment_id, status } = body;

    console.log(`Received Wero Webhook event: tx_id=${wero_tx_id}, payment_id=${payment_id}, status=${status}`);

    if (!payment_id && !wero_tx_id) {
      throw new Error('Missing payment_id or wero_tx_id in webhook payload.');
    }

    const finalStatus = status || 'succeeded';

    if (finalStatus === 'succeeded') {
      return [{
        eventType: 'payment_succeeded',
        paymentId: payment_id || undefined,
        providerPaymentId: wero_tx_id || undefined,
        paymentMethodUsed: 'wero'
      }];
    } else {
      const isCancelled = finalStatus === 'cancelled';
      return [{
        eventType: isCancelled ? 'payment_cancelled' : 'payment_failed',
        paymentId: payment_id || undefined,
        providerPaymentId: wero_tx_id || undefined
      }];
    }
  }

  getResponseForEvent(
    events: WebhookEventResult[],
    paymentRecord?: any
  ): Response {
    const event = events[0];
    const status = event.eventType === 'payment_succeeded' ? 'succeeded' : (event.eventType === 'payment_cancelled' ? 'cancelled' : 'failed');
    const orderId = paymentRecord?.order_id || null;

    return new Response(
      JSON.stringify({ status, order_id: orderId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}

Deno.serve(async (req) => {
  return handleWebhookRequest(req, new WeroWebhookAdapter());
});
