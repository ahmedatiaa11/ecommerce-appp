import Container from "../ReusableComp/Container";
import type { Product } from "../Types/Product";
import ProductCard from "./ProductCard";
type productListProps = {
  products: Product[];
};
export default function ProductList({ products }: productListProps) {
  console.log("ProductList Render", products.length);
  if (!products) return null;

  return (
    <Container>
    <div    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto p-4"
>
      {products?.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
    </Container>
    
  );
}
