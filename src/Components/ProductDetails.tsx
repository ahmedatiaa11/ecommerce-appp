import { useParams } from "react-router-dom"
import { useProductById } from "../ProductsHooks/ProductIdHook"
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
import { addToCart } from "../Redux/CartSlice"
import { selectIsFavourite, toogleFavourite } from "../Redux/FavouriteSlice"
// import type { RootState } from "../Redux/Store"

export default function ProductDetails() {
    const {id} = useParams() 
    const {data: product , isLoading , error} = useProductById(Number(id))
    const dispatch = useAppDispatch()
    const isFavourite = useAppSelector(selectIsFavourite(Number(id)))
    if(isLoading) return <div>Loading ... </div>
  return (
    <div>ProductDetails
      {product &&  <div className="p-6 max-w-5xl mx-auto">
     <div className="grid md:grid-cols-2 gap-8">

        {/* الصورة */}
        <div className="flex justify-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-80 object-contain"
          />
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-xl font-semibold text-green-600">
            ${product.price}
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => dispatch(addToCart(product))}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Add to Cart
            </button>

            <button
              onClick={() => dispatch(toogleFavourite(product))}
              className={`px-4 py-2 rounded text-white transition ${
                 isFavourite? "bg-red-600" : "bg-red-500 hover:bg-red-600"
              }`}
            >
              ❤️ Favorite
            </button>
          </div>
        </div>
      </div>
    </div>
}
    </div>
    
  )
}
