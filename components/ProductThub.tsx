import { Product } from '@/sanity.types';
import { imageUrl } from '@/sanity/lib/imageUrl';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ProductProp {
  product: Product;
}

const ProductThub = ({ product }: ProductProp) => {
  const isOutOfStuck = product.stock !== null && product?.stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current}`}
      className={`group flex flex-col bg-white py-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStuck ? 'bg-gray-200' : ''} }`}
    >
      <div className="relative aspect-square w-full h-full overflow-hidden">
        {/* we should make sure image is available */}
        {product.image && (
          <Image
            className="object-contain transition-transform duration-300 group-hover:scale-105"
            src={imageUrl(product.image).url()}
            alt={product.name || 'Product Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        {isOutOfStuck && (
          <div className=" absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col items-center sm:items-start">
        <h2 className="text-lg max-sm:text-[18px] font-bold text-gray-800 truncate ">
          {product.name}
        </h2>
        {/* line.clamp will create .... text */}
        <p className="mt-2 text-sm text-gray-600 line-clamp-1 ">
          {product.description?.map((block) =>
            block._type === 'block'
              ? block.children?.map((child) => child.text).join('')
              : ''
          )}
        </p>
        <p className=" font-semibold mt-2 text-gray-900">
          ${product.price?.toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default ProductThub;
