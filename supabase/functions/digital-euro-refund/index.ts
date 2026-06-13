/// <reference path="../deno.d.ts" />

import { handleRefundRequest } from '../_shared/refundOrchestrator.ts';
import { PaymentRefundAdapter, RefundResult } from '../_shared/paymentProvider.ts';

class DigitalEuroRefundAdapter extends PaymentRefundAdapter {
  providerName = 'digital_euro';

  async executeRefund(
    paymentRecord: any,
    _reason: string | null,
    _reqBody: any,
    _reqHeaders: Headers,
    _supabase: any
  ): Promise<RefundResult> {
    const refundAmount = paymentRecord.amount_paid || paymentRecord.amount_requested;
    const deuRefundId = `re_deu_${crypto.randomUUID()}`;

    return {
      status: 'succeeded',
      amountRefunded: refundAmount,
      providerRefundId: deuRefundId,
      metadata: { digital_euro_refund_id: deuRefundId }
    };
  }
}

Deno.serve(async (req) => {
  return handleRefundRequest(req, new DigitalEuroRefundAdapter());
});
