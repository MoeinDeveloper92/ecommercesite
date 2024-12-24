import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { PRODUCT_BY_CATEGPRY_QUERYResult } from '@/sanity.types';

export const getAllProductsByCtegory = async (
  categorySlug: string
): Promise<PRODUCT_BY_CATEGPRY_QUERYResult> => {
  const PRODUCT_BY_CATEGPRY_QUERY = defineQuery(`
    *[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc)
    `);

  try {
    //Use sanity fetch to send the query and pass the ategory sluig
    const products = await sanityFetch({
      query: PRODUCT_BY_CATEGPRY_QUERY,
      params: {
        categorySlug,
      },
    });
    return products.data || [];
  } catch (error) {
    console.error('Error fetching profucts from sanuty');
    return [];
  }
};
