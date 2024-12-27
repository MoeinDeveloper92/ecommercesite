//any server action must be declared with this directive
'use server';

import stripe from '@/lib/stripe';
import { imageUrl } from '@/sanity/lib/imageUrl';
import { BasketItem } from '@/store/store';

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerKUserId: string;
};

export type GroupedbasketItem = {
  product: BasketItem['product'];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedbasketItem[],
  metadata: Metadata
) {
  try {
    //we check if any of these products does not have a price
    const itemsWithoutPrice = items.filter((item) => !item.product.price);
    if (itemsWithoutPrice.length > 0) {
      throw new Error('Some Items do not have a price!!!!');
    }
    //search for existing customer within the stripe system!!!!
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    let customerId: string | undefined;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    const baseUrl =
      process.env.NODE_ENV === 'production'
        ? `https://${process.env.VERCEL_URL}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}`;

    const successUrl = `${baseUrl}/success?session_id{CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;

    const cancelUrl = `${baseUrl}/basket`;
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      //   if there is no customer id , there is no need to create it,. other wise creat it
      customer_creation: customerId ? undefined : 'always',
      customer_email: !customerId ? metadata.customerEmail : undefined,
      metadata,
      mode: 'payment',
      allow_promotion_codes: true,
      //   CHECKSESSION ID will be prefilled by the stripe
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items: items.map((item) => ({
        price_data: {
          currency: 'gbp',
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || 'Unnamed product',
            description: `Product ID: ${item.product._id}`,
            //this id i s gvery impojrntat, because stripe needs it.
            metadata: {
              id: item.product._id,
            },
            images: item.product.image
              ? [imageUrl(item.product.image).url()]
              : undefined,
          },
        },
        quantity: item.quantity,
      })),
    });
    return session.url;
  } catch (error) {
    console.error('Error ', error);
    throw error;
  }
}
