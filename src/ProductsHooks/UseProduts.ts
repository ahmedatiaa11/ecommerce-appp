import { useQuery } from "@tanstack/react-query"
import { getElementByCategory, getProducts } from "../Api/products.api"
import { type Product } from "../Types/Product"

export const useProducts = (category:string , page:number) => {
  return useQuery<Product[]>({
    queryKey: ["products" , category , page],
     queryFn: () => {
      if ( category === "all") {
        return getProducts(page)
      }
      return getElementByCategory(category , page)
    },
  })
}


/*
import { useQuery } from "@tanstack/react-query"
import { getElementByCategory, getProducts } from "../Api/products.api"
import { type Product } from "../Types/Product"

export const useProducts = (category:string , page:number) => {
  return useQuery<Product[]>({
    queryKey: ["products" , category , page],
     queryFn: async () => {
      if ( category === "all") {
        return getProducts(page)
      }
      const product = await getElementByCategory(category , page)
      return [product]
    },
  })
}*/