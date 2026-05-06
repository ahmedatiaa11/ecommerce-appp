import { useQuery } from "@tanstack/react-query"
import { getElementById } from "../Api/products.api"

export const useProductById = (id:number) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getElementById(id)
    })
}

// import { useQuery } from '@tanstack/react-query';
// import { getProductById } from "../API/products.api";

// export const useProductById = ( id:number)=>{
//     return useQuery({
//         queryKey:["product" , id] ,
//         queryFn: () => getProductById(id) ,
//         enabled: !!id ,
//     })
// }


