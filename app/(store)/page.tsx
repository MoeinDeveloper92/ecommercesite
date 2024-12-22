import { Button } from '@/components/ui/button';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
import ProductsView from '@/components/ProductsView';
import BlackFridayBanner from '@/components/BlackFridayBanner';
export default async function Home() {
  //in the server side we fetch products and the categories
  //then we pass them down as props to children
  const products = await getAllProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <BlackFridayBanner />
      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}
