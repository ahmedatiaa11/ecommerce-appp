import ProductList from "../Components/ProductsList"
import { useProducts } from "../ProductsHooks/UseProduts"
import { useCategories } from "../ProductsHooks/UseCategories"
import CategoryFilter from "../Components/UI/CategoryFilter"
import { useSearchParams } from "react-router-dom"
import Loader from "../Utlies/Loader"
import Pagination from "../Components/UI/Pagination"

export default function ProductsPage() {
  const [ searchParams , setSearchParams]=useSearchParams()
  const {data:categories } =useCategories()

  const selectedCategory = searchParams.get("category") || "all"
  const currentPage = Number(searchParams.get("page")) || 1

  const {data:products  , isLoading} = useProducts(selectedCategory , currentPage)

  // console.log("products" , products)
  const totalPages = products? Math.ceil(products.total / products.limit ): 0

  if(isLoading) return <Loader/>
  return (
    <>
    <h1 className="text-2xl p-2 mx-5  font-light mb-1">Products</h1>
    <CategoryFilter categories={categories } selectedCategory={selectedCategory}
     onCategoryChange={(category)=>{
      setSearchParams(() => {
      const params = new URLSearchParams()
      params.set("category", category)  
      params.set("page", "1")          
      return params
})
     }}/>

     <ProductList products={products.products}/>

     <Pagination 
     currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) =>{
        setSearchParams(()=>{
         const params = new URLSearchParams()
         params.set("page", page.toString())
         return params
        })
      }}
           />
     </>
  )
}
