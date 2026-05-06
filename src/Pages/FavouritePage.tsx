import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
import { clearFavourite, selectFavorites, toogleFavourite } from "../Redux/FavouriteSlice"
import { addToCart } from "../Redux/CartSlice"
import { toast } from "react-toastify"
import type { Product } from "../Types/Product"
// import { showSuccess } from "../Utils/toast"

export default function FavouritePage() {
    
    const dispatch = useAppDispatch()
    const favourites = useAppSelector(selectFavorites)
    if(favourites.length === 0)
        return      <h2 className="text-center mt-10 text-xl font-semibold">
        No favorite items ❤️
      </h2>
  return (
  <div className="p-6 max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-center">
      ❤️ Your Favorites
    </h1>

    {favourites.length === 0 ? (
      <p className="text-center text-gray-500">No favorites yet</p>
    ) : (
      <div className="flex flex-col gap-5">
        {favourites.map((item: Product) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white shadow-sm hover:shadow-lg transition rounded-xl p-4 group"
          >
            {/* info */}
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="h-20 w-20 object-contain rounded-lg group-hover:scale-105 transition"
              />

              <div>
                <Link to={`/products/${item.id}`}>
                  <h3 className="font-semibold text-lg hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-gray-500 text-sm">
                  ${item.price}
                </p>
              </div>
            </div>

            {/* actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition active:scale-95"
              >
                Add
              </button>

              <button
                onClick={() => {
                  dispatch(toogleFavourite(item))
                  toast.success("Removed from favorites ❌")
                }}
                className="text-red-500 hover:text-red-700 font-semibold transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* clear all */}
    {favourites.length > 0 && (
      <button
        onClick={() => dispatch(clearFavourite())}
        className="mt-8 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition block mx-auto"
      >
        Clear All
      </button>
    )}
  </div>
)
}
