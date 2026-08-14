import { useInfiniteQuery } from "@tanstack/react-query"
import { getElementByCategory, getProducts, searchProducts } from "../Api/products.api"

export const useProducts = (
  category: string,
  search: string
) => {
  return useInfiniteQuery({

    queryKey: ["products",category,search],
    queryFn: ({ pageParam }) => {
      if (search) {
        return searchProducts(
          search,
          pageParam
        )
      }

      if (category === "all") {
        return getProducts(
          pageParam
        )
      }

      return getElementByCategory(
        category,
        pageParam
      )
    },

    initialPageParam: 1,

    getNextPageParam:
      (lastPage, pages) => {
        
        const totalPages =
          Math.ceil(
            lastPage.total /
            lastPage.limit
          )

        if (
          pages.length < totalPages
        ) {
          return pages.length + 1
        }

        return undefined          
      }

  })
}









// import { useInfiniteQuery } from "@tanstack/react-query"
// import { getProductsQuery } from './../Api/getProductsQuery';

// // شيلنا الـ page من الـ parameters لأن المكتبة هتديرها داخلياً خلاص
// export const useProducts = (category: string, debouncedSearch: string) => {
//    return useInfiniteQuery({
       
//     // 1. فكينا الـ queryKey والـ queryFn بأسلوبك النظيف:
//     ...getProductsQuery({ category, search: debouncedSearch }),
    
//     // 2. أضفنا الإعدادات الجديدة الخاصة بالـ Infinite Scroll بعدها مباشرة:
//     initialPageParam: 1, 

//     getNextPageParam: (lastPage: any, pages) => {
//       // الحسبة الذكية لمعرفة هل فيه صفحة تانية ولا لأ
//       const totalPages = Math.ceil(lastPage.total / lastPage.limit);
      
//       if (pages.length < totalPages) {
//         return pages.length + 1; // اطلب الصفحة اللي عليها الدور
//       }
//       return undefined; // وقف شحن
//     }
//   }) 
// }

// import { getProductsQuery } from './../Api/getProductsQuery';
// import { keepPreviousData, useQuery } from "@tanstack/react-query"
// // import { getElementByCategory, getProducts, searchProducts } from "../Api/products.api"
// import { type Product } from "../Types/Product"

// export const useProducts = (category:string , page:number , debouncedSearch : string) => {
//    return useQuery<Product[]>({
//     ...getProductsQuery({category , page , search : debouncedSearch}),
//     placeholderData: keepPreviousData
//   }) 
// }