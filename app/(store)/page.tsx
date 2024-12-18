import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts';
export default async function Home() {
  const products = await getAllProducts();
  console.log(products);
  return (
    <div>
      <h1>Hello World</h1>
      <div></div>
      {/* render All products */}
      <Button>Click Me</Button>
    </div>
  );
}
