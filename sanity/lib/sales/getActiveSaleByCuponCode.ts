import { defineQuery } from 'next-sanity';
import { CouponCode } from './couponCodes';
import { sanityFetch } from '../live';
import { ACTIVE_SALE_BY_COUPON_CODEResult } from '@/sanity.types';

export const getActiveSalesByCouponCode = async (
  couponCode: CouponCode
): Promise<ACTIVE_SALE_BY_COUPON_CODEResult> => {
  const ACTIVE_SALE_BY_COUPON_CODE = defineQuery(`
        *[
            _type == "sale"
            && isActive == true
            && couponCode == $couponCode
        ] | order(validFrom desc){
            _id,
            title,
            description,
            discountAmount,
            couponCode,
            validFrom,
            validUntil,
            isActive
        }[0]
    `);

  try {
    const activeSale = await sanityFetch({
      query: ACTIVE_SALE_BY_COUPON_CODE,
      params: {
        couponCode,
      },
    });
    return activeSale ? activeSale.data : null;
  } catch (error) {
    console.error('Error fetching active sale bu copun code', error);
    return null;
  }
};
