import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';
import { PaymentRefundAdapter } from './paymentProvider.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export async function handleRefundRequest(
  req: Request,
  adapter: PaymentRefundAdapter,
  supabaseClient?: any // Dependency Injection for testability
) {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  // Use DI client or instantiate default client
  const supabase = supabaseClient || createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const body = await req.json().catch(() => ({}));
    const { payment_id, order_id, reason } = body;
    const headers = req.headers;

    let paymentRecord;
    if (payment_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('id', payment_id)
        .single();
      if (error || !data) {
        throw new Error(`Payment record not found for ID ${payment_id}: ${error?.message}`);
      }
      paymentRecord = data;
    } else if (order_id) {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('order_id', order_id)
        .maybeSingle();
      if (error || !data) {
        throw new Error(`Payment record not found for Order ID ${order_id}: ${error?.message}`);
      }
      paymentRecord = data;
    } else {
      throw new Error('Either payment_id or order_id must be provided.');
    }

    // Double-refund prevention: If already processed/pending, return immediately
    if (paymentRecord.provider_status === 'refunded' || paymentRecord.provider_status === 'pending_refund') {
      return new Response(
        JSON.stringify({ success: true, message: 'Payment refund already registered or processed.', status: paymentRecord.provider_status }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Only allow refunds for succeeded payments
    if (paymentRecord.provider_status !== 'succeeded') {
      throw new Error(`Cannot refund payment in state: ${paymentRecord.provider_status}`);
    }

    // Execute provider-specific refund integration
    const result = await adapter.executeRefund(paymentRecord, reason, body, headers, supabase);

    const finalPaymentStatus = result.status === 'succeeded' ? 'refunded' : 'pending_refund';

    // 1. Insert record into refunds table
    const { error: refundInsertErr } = await supabase
      .from('refunds')
      .insert({
        payment_id: paymentRecord.id,
        provider_refund_id: result.providerRefundId,
        amount: result.amountRefunded,
        reason: reason || 'requested_by_customer',
        status: result.status,
        processed_at: new Date().toISOString(),
        metadata: {
          ...(result.metadata || {}),
          recipient_address: result.recipientAddress || undefined
        }
      });

    if (refundInsertErr) {
      console.error('Failed to insert refund record:', refundInsertErr);
    }

    // 2. Update payment status
    const { error: paymentUpdateErr } = await supabase
      .from('payments')
      .update({
        provider_status: finalPaymentStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', paymentRecord.id);

    if (paymentUpdateErr) {
      console.error('Failed to update payment status:', paymentUpdateErr);
    }

    // 3. Log a refund event explicitly in the payment_events table
    const { error: eventErr } = await supabase
      .from('payment_events')
      .insert({
        payment_id: paymentRecord.id,
        event_type: 'payment.refunded',
        old_status: paymentRecord.provider_status,
        new_status: finalPaymentStatus,
        payload: {
          refund_id: result.providerRefundId,
          amount_refunded: result.amountRefunded,
          currency: paymentRecord.requested_currency || 'EUR',
          reason: reason || 'requested_by_customer',
          provider: adapter.providerName,
          ...(result.metadata || {})
        }
      });

    if (eventErr) {
      console.error('Failed to insert payment event:', eventErr);
    }

    // 4. Update the order status to 'refunded' if linked
    if (paymentRecord.order_id && finalPaymentStatus === 'refunded') {
      const { error: orderErr } = await supabase
        .from('orders')
        .update({ status: 'refunded' })
        .eq('id', paymentRecord.order_id);

      if (orderErr) {
        console.error('Failed to update order status to refunded:', orderErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true, refund_id: result.providerRefundId, status: result.status }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error(`Refund error [${adapter.providerName}]:`, error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
