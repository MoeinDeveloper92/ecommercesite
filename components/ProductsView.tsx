import { Category, Product } from '@/sanity.types';
import React from 'react';
import ProductGrid from './ProductGrid';
import { CategorySelectorComponent } from './ui/category-selector';

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}
const ProductsView = ({ products, categories }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/* categoriez */}
      <div className="w-full sm:w-[200px]">
        <CategorySelectorComponent categories={categories} />
      </div>

      {/* producst */}
      <div className="flex-1">
        <div>
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
