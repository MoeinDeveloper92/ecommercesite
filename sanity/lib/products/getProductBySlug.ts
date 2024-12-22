import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import {
  PRODUCT_BY_ID_QUERYResult,
  PRODUCT_SEARCH_QUERYResult,
} from '@/sanity.types';

export const getProductBySlug = async (
  slug: string
): Promise<PRODUCT_BY_ID_QUERYResult> => {
  //whetver we pass as param we should define insanityFetch
  const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug ] | order(name asc) [0]
    `);

  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });
    console.log(product.data);
    return product.data || null;
  } catch (error) {
    console.error('Error faced whuile fetching data from sanity', error);
    return null;
  }
};
