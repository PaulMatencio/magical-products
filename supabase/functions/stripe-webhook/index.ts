/// <reference path="../deno.d.ts" />

//  To view execution logs for this function in the cloud, navigate to:
//  https://supabase.com/dashboard/project/cejwvvmvdjnbgrckjczg/functions/stripe-webhook/logs
//
//  To deploy stripe-webhook:
//  npx supabase functions deploy stripe-webhook --no-verify-jwt --project-ref cejwvvmvdjnbgrckjczg
//
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.8';
import Stripe from 'https://esm.sh/stripe@16.12.0?target=denonext';

Deno.serve(async (req) => {
  const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
  const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');

  if (!stripeSecretKey) {
    console.error('STRIPE_SECRET_KEY is not configured in Supabase env variables.');
    return new Response('Stripe configuration missing', { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-06-20',
    httpClient: Stripe.createFetchHttpClient(),
  });

  const signature = req.headers.get('stripe-signature');

  try {
    const body = await req.text();
    let event;

    if (stripeWebhookSecret && signature) {
      event = await stripe.webhooks.constructEventAsync(
        body,
        signature,
        stripeWebhookSecret
      );
    } else {
      console.warn('STRIPE_WEBHOOK_SECRET or stripe-signature header is missing. Parsing payload directly (sandbox-only).');
      event = JSON.parse(body);
      if (event.livemode) {
        console.error('Direct payload parsing is disabled in live mode.');
        return new Response('Signature verification required for live mode', { status: 400 });
      }
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Received Stripe event: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;

      if (paymentId) {
        // 1. Fetch the payment record to get its metadata and existing order_id
        const { data: paymentRecord, error: fetchErr } = await supabase
          .from('payments')
          .select('*')
          .eq('id', paymentId)
          .maybeSingle();

        if (fetchErr) {
          console.error(`Failed to fetch payment record ${paymentId}:`, fetchErr);
          return new Response('DB fetch failed', { status: 500 });
        }

        // 2. If it doesn't have an order_id, create the order now!
        let orderId = paymentRecord?.order_id;
        if (paymentRecord && !orderId) {
          const meta = paymentRecord.metadata || {};
          const cartItems = meta.cart || [];
          const totalPrice = paymentRecord.amount_requested ? (paymentRecord.amount_requested / 100) : 0;
          const shippingAddress = meta.shipping_address || '';
          const userPhone = meta.user_phone || '';
          const userEmail = meta.invoice_email || paymentRecord.user_email || '';
          const userId = paymentRecord.user_id || null;

          const { data: orderData, error: orderError } = await supabase.rpc('create_order_with_outbox', {
            p_items: cartItems,
            p_total_price: totalPrice,
            p_payment_method: 'card',
            p_shipping_address: shippingAddress,
            p_user_phone: userPhone,
            p_user_email: userEmail,
            p_user_id: userId,
            p_event_type: 'OrderCreated',
            p_event_payload: { items: cartItems, total_price: totalPrice },
            p_payment_id: paymentId
          });

          if (orderError) {
            console.error(`Failed to create order via RPC in webhook:`, orderError);
          } else if (orderData?.id) {
            orderId = orderData.id;
            console.log(`Order created successfully via webhook: ${orderId}`);
          }
        }

        // 3. Update the payment record to succeeded and set its order_id
        const { error } = await supabase
          .from('payments')
          .update({
            provider_status: 'succeeded',
            amount_paid: session.amount_total,
            completed_at: new Date().toISOString(),
            order_id: orderId || null
          })
          .eq('id', paymentId);

        if (error) {
          console.error(`Failed to update payment record ${paymentId}:`, error);
          return new Response('DB update failed', { status: 500 });
        }
        console.log(`Payment ${paymentId} successfully updated to succeeded via webhook.`);
      }
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const paymentId = session.metadata?.payment_id;

      if (paymentId) {
        const { data: paymentRecord } = await supabase
          .from('payments')
          .select('order_id')
          .eq('id', paymentId)
          .maybeSingle();

        const { error } = await supabase
          .from('payments')
          .update({
            provider_status: 'cancelled',
            completed_at: new Date().toISOString()
          })
          .eq('id', paymentId);

        if (error) {
          console.error(`Failed to mark payment ${paymentId} as cancelled:`, error);
          return new Response('DB update failed', { status: 500 });
        }
        console.log(`Payment ${paymentId} marked as cancelled.`);

        if (paymentRecord?.order_id) {
          const { error: cancelOrderError } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: paymentRecord.order_id
          });
          if (cancelOrderError) {
            console.error(`Failed to cancel order ${paymentRecord.order_id} via RPC:`, cancelOrderError);
          } else {
            console.log(`Order ${paymentRecord.order_id} and its inventory stock restored successfully.`);
          }
        }
      }
    } else if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object as Stripe.PaymentIntent;
      const paymentId = intent.metadata?.payment_id;

      if (paymentId) {
        const { data: paymentRecord } = await supabase
          .from('payments')
          .select('order_id')
          .eq('id', paymentId)
          .maybeSingle();

        const { error } = await supabase
          .from('payments')
          .update({
            provider_status: 'failed',
            completed_at: new Date().toISOString()
          })
          .eq('id', paymentId);

        if (error) {
          console.error(`Failed to mark payment ${paymentId} as failed:`, error);
          return new Response('DB update failed', { status: 500 });
        }
        console.log(`Payment ${paymentId} marked as failed.`);

        if (paymentRecord?.order_id) {
          const { error: cancelOrderError } = await supabase.rpc('cancel_order_with_inventory', {
            p_order_id: paymentRecord.order_id
          });
          if (cancelOrderError) {
            console.error(`Failed to cancel order ${paymentRecord.order_id} via RPC:`, cancelOrderError);
          } else {
            console.log(`Order ${paymentRecord.order_id} and its inventory stock restored successfully.`);
          }
        }
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error(`Webhook verification failed: ${err.message}`);
    return new Response(`Webhook verification failed: ${err.message}`, { status: 400 });
  }
});
