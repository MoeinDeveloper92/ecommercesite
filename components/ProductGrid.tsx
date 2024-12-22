'use client';
//cause of framer motion 
import { Product } from '@/sanity.types'; // Verify this file exports Product
import React from 'react';
import ProductThub from './ProductThub'; // Ensure this path and export are correct
import { AnimatePresence, motion } from 'framer-motion';

const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProductThub product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
