

 import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../Api/products.api"


type Category = {
  slug: string
  name: string
  url: string
}

export const useCategories = ()=>{
    return useQuery<Category[]>({
        queryKey: ["categories"] ,
        queryFn: getCategories
    })
}
