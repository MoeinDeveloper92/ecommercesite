import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';

export const getMyOrders = async (userId: string) => {
  //by below approach we exapn our refrences
  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc){
        ...,
        products[]{
            ...,
            product->
        }
    } 
    `);

  try {
    const myOrders = await sanityFetch({
      query: MY_ORDERS_QUERY || [],
      params: { userId },
    });

    return myOrders.data || [];
  } catch (error) {
    console.error('Error while fetching orders from server', error);
    throw new Error('Error fetching orders.');
  }
};
