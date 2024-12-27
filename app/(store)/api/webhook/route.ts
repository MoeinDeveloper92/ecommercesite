import { Metadata } from '@/actions/createCheckoutSession';
import stripe from '@/lib/stripe';
import { backendClient } from '@/sanity/lib/backendClient';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing for this route
  },
};

export const POST = async (request: NextRequest) => {
  const webHookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webHookSecret) {
    console.log('Stripe Webhook secret is not yet set!!!');
    return new Response(
      JSON.stringify({ error: 'Stripe Webhook secret is not set!' }),
      { status: 400 }
    );
  }

  const sig = request.headers.get('stripe-signature');
  if (!sig) {
    return new Response(JSON.stringify({ error: 'No Signature' }), {
      status: 400,
    });
  }

  let event: Stripe.Event;

  try {
    // Get raw body from the request
    const bodyBuffer = await request.arrayBuffer();
    const rawBody = Buffer.from(bodyBuffer);

    // Validate webhook signature
    event = stripe.webhooks.constructEvent(rawBody, sig, webHookSecret);
  } catch (error) {
    console.error('Webhook verification signature failed:', error);
    return new Response(JSON.stringify({ error: 'Webhook Signature error' }), {
      status: 400,
    });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    try {
      const order = await createOrderInSanity(session);
      console.log('Order created in Sanity:', order);
    } catch (error) {
      console.error('Error creating order in Sanity:', error);
      return new Response(JSON.stringify({ error: 'Error creating Order' }), {
        status: 500,
      });
    }
  }

  return new Response(JSON.stringify({ received: true }));
};

async function createOrderInSanity(session: Stripe.Checkout.Session) {
  const {
    id,
    amount_total,
    currency,
    metadata,
    payment_intent,
    customer,
    total_details,
  } = session;
  const { orderNumber, customerEmail, clerKUserId, customerName } =
    metadata as Metadata;

  const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
    id,
    {
      expand: ['data.price.product'],
    }
  );

  const sanityProducts = lineItemsWithProduct.data.map((item) => ({
    _key: crypto.randomUUID(),
    product: {
      _type: 'reference',
      _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
    },
    quantity: item.quantity || 0,
  }));

  const order = backendClient.create({
    _type: 'order',
    orderNumber,
    stripeCheckoutSessionId: id,
    stripePatmentIntentId: payment_intent,
    customerName,
    stripeCustomerID: customer,
    clerkUserId: clerKUserId,
    email: customerEmail,
    currency,
    amountDiscount: total_details?.amount_discount
      ? total_details.amount_discount / 100
      : 0,
    products: sanityProducts,
    totalPrice: amount_total ? amount_total / 100 : 0,
    status: 'paid',
    orderDate: new Date().toISOString(),
  });

  return order;
}
