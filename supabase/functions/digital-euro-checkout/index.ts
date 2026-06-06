/// <reference path="../deno.d.ts" />

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const finalStatuses = new Set(['succeeded', 'failed', 'cancelled']);

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { action, payment_id, status, return_url } = body;

    if (!payment_id) {
      throw new Error('Missing payment_id.');
    }

    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', payment_id)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    if (paymentRecord.provider !== 'digital_euro') {
      throw new Error(`Payment ${payment_id} is not a Digital Euro payment.`);
    }

    if (action === 'initiate') {
      const digitalEuroTxId = paymentRecord.provider_payment_id?.startsWith('deu_tx_')
        ? paymentRecord.provider_payment_id
        : `deu_tx_${crypto.randomUUID()}`;

      const redirectUrl = `digital-euro://authorize?id=${digitalEuroTxId}&payment_id=${payment_id}&return_url=${encodeURIComponent(return_url || '')}`;
      const metadata = {
        ...(paymentRecord.metadata || {}),
        digital_euro_tx_id: digitalEuroTxId,
        digital_euro_mode: 'sandbox',
        simulated_psp: 'internal',
        redirect_url: redirectUrl
      };

      const { error: updateErr } = await supabase
        .from('payments')
        .update({
          provider_payment_id: digitalEuroTxId,
          metadata
        })
        .eq('id', payment_id);

      if (updateErr) {
        throw new Error(`Failed to initialize Digital Euro payment: ${updateErr.message}`);
      }

      return new Response(
        JSON.stringify({
          status: paymentRecord.provider_status || 'pending',
          digital_euro_tx_id: digitalEuroTxId,
          redirectUrl,
          order_id: paymentRecord.order_id
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (action === 'confirm' || action === 'simulate') {
      const finalStatus = finalStatuses.has(status) ? status : 'succeeded';
      const amountPaid = finalStatus === 'succeeded' ? paymentRecord.amount_requested : 0;
      const metadata = {
        ...(paymentRecord.metadata || {}),
        digital_euro_mode: 'sandbox',
        simulated_psp: 'internal',
        simulated_status: finalStatus,
        simulated_at: new Date().toISOString()
      };

      const { error: updateErr } = await supabase
        .from('payments')
        .update({
          provider_status: finalStatus,
          amount_paid: amountPaid,
          completed_at: new Date().toISOString(),
          metadata
        })
        .eq('id', payment_id);

      if (updateErr) {
        throw new Error(`Failed to confirm Digital Euro payment: ${updateErr.message}`);
      }

      if (finalStatus === 'succeeded' && paymentRecord.order_id) {
        const { error: orderUpdateErr } = await supabase
          .from('orders')
          .update({ payment_method: 'digital_euro' })
          .eq('id', paymentRecord.order_id);

        if (orderUpdateErr) {
          console.error(`Failed to update order payment method for ${paymentRecord.order_id}:`, orderUpdateErr);
        }
      }

      return new Response(
        JSON.stringify({
          status: finalStatus,
          order_id: paymentRecord.order_id,
          payment_id
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        status: paymentRecord.provider_status || 'pending',
        order_id: paymentRecord.order_id,
        payment_id
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('digital-euro-checkout error:', err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : 'Unknown Digital Euro checkout error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
