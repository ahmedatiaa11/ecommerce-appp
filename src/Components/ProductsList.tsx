import type { Product } from "../Types/Product";
import ProductCard from "./ProductCard";
type productListProps = {
  products: Product[];
};
export default function ProductList({ products }: productListProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}
