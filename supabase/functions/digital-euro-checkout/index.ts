/// <reference path="../deno.d.ts" />

import { handleCheckoutRequest } from '../../_shared/checkoutOrchestrator.ts';
import { PaymentProviderAdapter, CartItem, PaymentIntentResult, VerificationResult } from '../../_shared/paymentProvider.ts';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

class DigitalEuroAdapter extends PaymentProviderAdapter {
  providerName = 'digital_euro';

  async createCheckoutSession(
    paymentId: string,
    _amountInCents: number,
    _email: string | null,
    _cart: CartItem[],
    reqBody: Record<string, unknown>,
    _reqHeaders: Headers,
    supabase: SupabaseClient
  ): Promise<PaymentIntentResult> {
    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    if (paymentRecord.provider !== 'digital_euro') {
      throw new Error(`Payment ${paymentId} is not a Digital Euro payment.`);
    }

    const digitalEuroTxId = paymentRecord.provider_payment_id?.startsWith('deu_tx_')
      ? paymentRecord.provider_payment_id
      : `deu_tx_${crypto.randomUUID()}`;

    const redirectUrl = `digital-euro://authorize?id=${digitalEuroTxId}&payment_id=${paymentId}&return_url=${encodeURIComponent((reqBody.return_url as string) || '')}`;
    const metadata = {
      ...(paymentRecord.metadata || {}),
      digital_euro_tx_id: digitalEuroTxId,
      digital_euro_mode: 'sandbox',
      simulated_psp: 'internal',
      redirect_url: redirectUrl
    };

    return {
      providerPaymentId: digitalEuroTxId,
      redirectUrl,
      metadata
    };
  }

  async verifyPaymentStatus(
    paymentRecord: any,
    _sessionIdOrTxHash: string | null,
    reqBody: Record<string, unknown>,
    _reqHeaders: Headers,
    _supabase: SupabaseClient
  ): Promise<VerificationResult> {
    if (paymentRecord.provider !== 'digital_euro') {
      throw new Error(`Payment ${paymentRecord.id} is not a Digital Euro payment.`);
    }

    const action = reqBody.action as string | undefined;
    const status = reqBody.status as string | undefined;
    const finalStatuses = new Set(['succeeded', 'failed', 'cancelled']);

    // If action is confirm, but no status is provided, do not force-succeed. Just return current status.
    if (action === 'confirm' && !status) {
      return {
        status: paymentRecord.provider_status || 'pending',
        amountPaid: paymentRecord.amount_paid || 0,
        providerPaymentId: paymentRecord.provider_payment_id,
        paymentMethodUsed: 'digital_euro'
      };
    }

    const finalStatus = status && finalStatuses.has(status) ? status : 'succeeded';
    const amountPaid = finalStatus === 'succeeded' ? paymentRecord.amount_requested : 0;
    const metadata = {
      ...(paymentRecord.metadata || {}),
      digital_euro_mode: 'sandbox',
      simulated_psp: 'internal',
      simulated_status: finalStatus,
      simulated_at: new Date().toISOString()
    };

    return {
      status: finalStatus as any,
      amountPaid,
      providerPaymentId: paymentRecord.provider_payment_id,
      paymentMethodUsed: 'digital_euro',
      metadata
    };
  }
}

Deno.serve(async (req) => {
  return handleCheckoutRequest(req, new DigitalEuroAdapter());
});
