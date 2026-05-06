import type { Product } from "../Types/Product"
import ProductCard from "./ProductCard"
type productListProps ={
    products : Product[]
}
export default function ProductList({products}: productListProps) {
    if(!products) return null
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto p-4 ">
        {
        products?.map((prod)=>(<ProductCard key={prod.id} product={prod}/>) ) 
        }
       
    </div>  
  )
}
