// import ProductCardSkeleton
// from "./ProductCardSkeleton"

// export default function ProductListSkeleton() {

//   return (

//     <div className="
//       grid
//       grid-cols-1
//       sm:grid-cols-2
//       md:grid-cols-3
//       lg:grid-cols-4
//       gap-6
//       p-4
//     ">

//       {Array.from({ length: 8 }).map((_, i) => (

//         <ProductCardSkeleton key={i} />

//       ))}

//     </div>

//   )

// }
import ProductCardSkeleton
from "./ProductCardSkeleton"

export default function ProductListSkeleton() {

  return (

    <div className="grid grid-cols-4 gap-6">

  {Array.from({ length: 8 }, (_, i) => (

    <ProductCardSkeleton key={i} />

  ))}

</div>

  )

}