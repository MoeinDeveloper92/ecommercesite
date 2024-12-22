import { defineQuery } from 'next-sanity';
import { sanityFetch } from '../live';
import { PRODUCT_SEARCH_QUERYResult } from '@/sanity.types';

export const searchProductsByName = async (
  searchParam: string
): Promise<PRODUCT_SEARCH_QUERYResult> => {
  //Here we should have a GROQ query
  //Keep in mind that deifne query is vital, if you ignore it, typegen won't pick your type up
  const PRODUCT_SEARCH_QUERY = defineQuery(
    `*[_type == "product" && name match $searchParam] | order(name asc)`
  );
  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: {
        //Append wildcard for partial match
        searchParam: `${searchParam}*`,
      },
    });

    //return te kist of procuts and it reutj nukl if not found
    return products.data || null;
  } catch (error) {
    console.error('Error fetching producs', error);
    return [];
  }
};
