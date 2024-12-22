import { Product } from '@/sanity.types';
import { div } from 'framer-motion/client';
import Link from 'next/link';
import React from 'react';

interface ProductProp {
  product: Product;
}

const ProductThub = ({ product }: ProductProp) => {
  const isOutOfStuck = product.stock !== null;
  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStuck ? 'bg-gray-200' : ''} }`}
    >
      <div className="relative">
        {isOutOfStuck && (
          <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
    </Link>
  );
};

export default ProductThub;
