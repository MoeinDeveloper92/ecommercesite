import { TagIcon } from '@sanity/icons';

import { defineType, defineField } from 'sanity';

export const salesType = defineType({
  name: 'sale',
  type: 'document',
  title: 'Sale',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Sale Title',
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Sale Description',
    }),
    defineField({
      name: 'discountAmount',
      type: 'number',
      title: 'Discount Amount',
      description: 'Amount off in percentage or fixed value',
    }),
    defineField({
      name: 'couponCode',
      type: 'string',
      title: 'Coupon Code',
    }),
    defineField({
      name: 'validForm',
      type: 'datetime',
      title: 'Valid Form',
    }),
    defineField({
      name: 'validUntil',
      type: 'datetime',
      title: 'Valid Until',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      description: 'Toggle to activate/deactivate the sale',
      title: 'Is Active',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discountAmount: 'discountAmount',
      couponCode: 'couponCode',
      isActive: 'isActive',
    },
    prepare(select) {
      //here we do data calculation to be shown ion the preview section
      const { title, discountAmount, couponCode, isActive } = select;
      const status = isActive ? 'Active' : 'Inactive';
      return {
        title,
        subtitle: `${discountAmount}% off - code ${couponCode} - ${status}`,
      };
    },
  },
});
