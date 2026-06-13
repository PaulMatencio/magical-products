/// <reference path="../deno.d.ts" />

import { handleWebhookRequest, corsHeaders } from '../_shared/webhookOrchestrator.ts';
import { PaymentWebhookAdapter, WebhookEventResult } from '../_shared/paymentProvider.ts';

class AdyenWebhookAdapter extends PaymentWebhookAdapter {
  providerName = 'adyen';

  async parseAndVerifyWebhook(
    req: Request,
    reqBodyText: string,
    _reqHeaders: Headers,
    _supabase: any
  ): Promise<WebhookEventResult[]> {
    const body = JSON.parse(reqBodyText);
    console.log("Received Adyen Webhook event:", reqBodyText);

    const notificationItems = body.notificationItems || [];
    if (notificationItems.length === 0) {
      const isManagementWebhook = body.type || body.event;
      if (isManagementWebhook) {
        console.log(`Received Adyen Management/Platform Webhook event of type: ${body.type || body.event}`);
      } else {
        console.log("Received empty or unrecognized Adyen Webhook event payload structure.");
      }
      return [{ eventType: 'ignore' }];
    }

    const item = notificationItems[0]?.NotificationRequestItem;
    if (!item) {
      throw new Error('Invalid Adyen webhook structure: NotificationRequestItem missing.');
    }

    const { eventCode, merchantReference, pspReference, success, amount } = item;

    console.log(`Processing Adyen webhook item: eventCode=${eventCode}, merchantReference=${merchantReference}, success=${success}`);

    if (!merchantReference) {
      console.warn("No merchantReference (payment_id) found in webhook payload. Skipping.");
      return [{ eventType: 'ignore' }];
    }

    if (eventCode === 'AUTHORISATION') {
      const isSuccess = success === 'true' || success === true;
      if (isSuccess) {
        const amountPaidCents = amount?.value;
        return [{
          eventType: 'payment_succeeded',
          paymentId: merchantReference,
          providerPaymentId: pspReference,
          amount: amountPaidCents,
          paymentMethodUsed: 'adyen'
        }];
      } else {
        return [{
          eventType: 'payment_failed',
          paymentId: merchantReference
        }];
      }
    } else if (eventCode === 'REFUND') {
      const isSuccess = success === 'true' || success === true;
      const refundStatus = isSuccess ? 'succeeded' : 'failed';

      return [{
        eventType: 'refund_processed',
        paymentId: merchantReference,
        refundId: pspReference,
        refundStatus
      }];
    }

    return [{ eventType: 'ignore' }];
  }

  getResponseForEvent(
    _events: WebhookEventResult[],
    _paymentRecord?: any
  ): Response {
    return new Response('[accepted]', {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
}

Deno.serve(async (req) => {
  return handleWebhookRequest(req, new AdyenWebhookAdapter());
});
