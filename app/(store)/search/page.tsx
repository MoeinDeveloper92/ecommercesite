import React from 'react';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';
import NotFoundSeachResult from '@/components/NotFoundSeachResult';
import ProductGrid from '@/components/ProductGrid';
//here we have dymanic parameter
//it's a bit different how we create query params
//we do not use useParams here, since we want to leave it as server side component
const SearchPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);
  if (!products.length) {
    return <NotFoundSeachResult query={query} />;
  }
  return (
    <div className="flex flex-col items-start justify-center min-h-screen bg-gray-100 p-4 ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 tex-center">
          Search result for {query}
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
};

export default SearchPage;
