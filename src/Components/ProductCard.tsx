
import { type Product } from "../Types/Product"
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
import { addToCart } from "../Redux/CartSlice"
import { selectIsFavourite, toogleFavourite } from "../Redux/FavouriteSlice"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { showSuccess } from "../Utlies/ToastMsg"

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch()
  const isFavourite = useAppSelector(selectIsFavourite(product.id))
  return (
  <div className="group border rounded-2xl p-4 bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
    
    <Link
      to={`/products/${product.id}`}
      className="flex flex-col items-center"
    >
      <div className="overflow-hidden rounded-xl">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-40 object-contain mb-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <h3 className="font-semibold text-lg text-center mb-2 line-clamp-2">
        {product.title}
      </h3>
    </Link>

    {/* Price + Rating */}
    <div className="flex justify-between items-center mt-2">
      <p className="font-bold text-blue-600 text-lg">
        ${product.price}
      </p>

      <p className="text-xs text-gray-500">
        ⭐ {product.rating}
      </p>
    </div>

    {/* Buttons */}
    <div className="flex gap-2 mt-4">
      
      <button
        onClick={() => {
          dispatch(addToCart(product))
          // toast.success("Added to cart ✅")
          showSuccess("Added to cart ✅" , {id:"cart-toast"})
        }}
        className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition active:scale-95"
      >
        Add
      </button>

      <button
        onClick={() => {
          dispatch(toogleFavourite(product))
          // toast.success("Added to favourite ❤️")
          showSuccess("Added to favourite ❤️" , {id:"favourite-toast"})
        }}
        className={`px-3 py-2 rounded-lg text-white transition active:scale-95 ${
          isFavourite ? "bg-red-600" : "bg-red-500 hover:bg-red-600"
        }`}
      >
        ❤️
      </button>
    </div>
  </div>
)
}