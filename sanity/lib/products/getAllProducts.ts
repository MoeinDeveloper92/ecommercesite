import { defineQuery } from 'next-sanity';
// to fetch data
import { sanityFetch } from '../live';
import { Product } from '@/sanity.types';

export const getAllProducts = async (): Promise<Product[]> => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
        *[
            _type=="product"
        ] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: ALL_PRODUCTS_QUERY,
    });
    return products.data || [];
  } catch (error) {
    console.error('Error fetching all rprocust from sanity', error);
    return [];
  }
};
