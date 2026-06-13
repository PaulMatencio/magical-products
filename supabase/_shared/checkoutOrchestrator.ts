import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';
import { PaymentProviderAdapter } from './paymentProvider.ts';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-payment',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

export async function handleCheckoutRequest(
  req: Request,
  adapter: PaymentProviderAdapter,
  supabaseClient?: SupabaseClient // Dependency Injection for testability
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
    const headers = req.headers;
    const { action, payment_id } = body;

    // Allow adapter to intercept custom actions (e.g. submit_tx in Cardano)
    if (action && typeof (adapter as any).handleCustomAction === 'function') {
      const customResponse = await (adapter as any).handleCustomAction(action, body, headers, supabase);
      if (customResponse instanceof Response) {
        return customResponse;
      }
    }

    if (!payment_id) {
      throw new Error('Missing payment_id.');
    }

    // Fetch the payment record
    const { data: paymentRecord, error: fetchErr } = await supabase
      .from('payments')
      .select('*')
      .eq('id', payment_id)
      .single();

    if (fetchErr || !paymentRecord) {
      throw new Error(`Payment record not found: ${fetchErr?.message || 'Unknown error'}`);
    }

    // Determine if we should perform confirmation / status check
    const isConfirm = 
      action === 'confirm' ||
      action === 'simulate' ||
      (payment_id && !body.cart && action !== 'initiate' && action !== 'create'); // For Digital Euro/Wero/Adyen/Stripe

    if (isConfirm) {
      // If already processed in final state, return immediately
      if (['succeeded', 'failed', 'cancelled', 'refunded'].includes(paymentRecord.provider_status)) {
        return new Response(
          JSON.stringify({ status: paymentRecord.provider_status, order_id: paymentRecord.order_id, payment_id }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Verify the payment status using the provider adapter
      const result = await adapter.verifyPaymentStatus(paymentRecord, body.session_id || body.txHash || null, body, headers, supabase);

      let orderId = paymentRecord.order_id;

      if (result.status === 'succeeded') {
        if (!orderId) {
          const meta = paymentRecord.metadata || {};
          const cartItems = meta.cart || [];
          const totalPrice = paymentRecord.amount_requested ? (paymentRecord.amount_requested / 100) : 0;
          const shippingAddress = meta.shipping_address || '';
          const userPhone = meta.user_phone || '';
          const userEmail = meta.invoice_email || paymentRecord.user_email || '';
          const userId = paymentRecord.user_id || null;

          // Transactionally create order via RPC
          const { data: orderData, error: orderError } = await supabase.rpc('create_order_with_outbox', {
            p_items: cartItems,
            p_total_price: totalPrice,
            p_payment_method: result.paymentMethodUsed || adapter.providerName,
            p_shipping_address: shippingAddress,
            p_user_phone: userPhone,
            p_user_email: userEmail,
            p_user_id: userId,
            p_event_type: 'OrderCreated',
            p_event_payload: { items: cartItems, total_price: totalPrice },
            p_payment_id: payment_id
          });

          if (orderError) {
            console.error(`Failed to create order via RPC in confirm:`, orderError);
            throw new Error(`Order creation failed: ${orderError.message}`);
          } else if (orderData?.id) {
            orderId = orderData.id;
          }
        } else {
          // Update order payment method
          const { error: orderUpdateErr } = await supabase
            .from('orders')
            .update({ payment_method: result.paymentMethodUsed || adapter.providerName })
            .eq('id', orderId);
          if (orderUpdateErr) {
            console.error(`Failed to update order ${orderId} payment method:`, orderUpdateErr);
          }
        }

        // Update payment record
        const paymentMetadata = {
          ...(paymentRecord.metadata || {}),
          ...(result.metadata || {})
        };

        const { error: updateErr } = await supabase
          .from('payments')
          .update({
            provider_status: 'succeeded',
            amount_paid: result.amountPaid || paymentRecord.amount_requested,
            completed_at: new Date().toISOString(),
            order_id: orderId || null,
            provider_payment_id: result.providerPaymentId || paymentRecord.provider_payment_id,
            provider: result.paymentMethodUsed || adapter.providerName,
            metadata: paymentMetadata
          })
          .eq('id', payment_id);

        if (updateErr) {
          console.error(`Failed to update payment record ${payment_id}:`, updateErr);
        }

        return new Response(
          JSON.stringify({ status: 'succeeded', order_id: orderId, payment_id }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

      } else if (result.status === 'cancelled' || result.status === 'failed') {
        const dbStatus = result.status;

        await supabase
          .from('payments')
          .update({
            provider_status: dbStatus,
            completed_at: new Date().toISOString()
          })
          .eq('id', payment_id);

        if (paymentRecord.order_id) {
          const { error: cancelErr } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: paymentRecord.order_id
          });
          if (cancelErr) {
            console.error("Failed to cancel order:", cancelErr);
          }
        }

        return new Response(
          JSON.stringify({ status: dbStatus, order_id: paymentRecord.order_id, payment_id, error: result.error }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      } else {
        // Status remains pending / requires action
        if (result.status === 'requires_action' && paymentRecord.order_id) {
          const { error: cancelErr } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: paymentRecord.order_id
          });
          if (cancelErr) {
            console.error("Failed to cancel order on requires_action:", cancelErr);
          }
        }

        return new Response(
          JSON.stringify({ status: result.status, order_id: paymentRecord.order_id, payment_id }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // --- CASE B: INITIATE / CREATE PAYMENT SESSION ---
    if (paymentRecord.provider_status !== 'pending') {
      throw new Error(`Payment record is not pending: ${paymentRecord.provider_status}`);
    }

    const cart = body.cart || [];
    const totalAmountCents = cart.reduce((sum: number, item: any) => {
      const unitAmount = Math.round(Number(item.price || 0) * 100);
      return sum + (unitAmount * Number(item.cart_quantity || 1));
    }, 0);

    const invoiceEmail = body.invoice_email || paymentRecord.user_email || '';

    // Create session using adapter
    const sessionResult = await adapter.createCheckoutSession(
      payment_id,
      totalAmountCents || paymentRecord.amount_requested,
      invoiceEmail,
      cart,
      body,
      headers,
      supabase
    );

    const mergedMetadata = {
      ...(paymentRecord.metadata || {}),
      ...(sessionResult.metadata || {}),
      cart: cart.length > 0 ? cart : (paymentRecord.metadata?.cart || [])
    };

    // Save payment updates
    const { error: dbUpdateErr } = await supabase
      .from('payments')
      .update({
        provider: adapter.providerName,
        provider_payment_id: sessionResult.providerPaymentId,
        metadata: mergedMetadata
      })
      .eq('id', payment_id);

    if (dbUpdateErr) {
      console.error(`Failed to update payment record ${payment_id}:`, dbUpdateErr);
    }

    // Return session creation values
    const responseStatus = (sessionResult as any).status === 402 ? 402 : 200;
    return new Response(
      JSON.stringify({
        ...sessionResult,
        status: (sessionResult as any).status === 402 ? 402 : (paymentRecord.provider_status || 'pending'),
        order_id: paymentRecord.order_id
      }),
      { status: responseStatus, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error(`Checkout Error [${adapter.providerName}]:`, error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
}
