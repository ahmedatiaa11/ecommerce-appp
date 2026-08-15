import { type Product } from "../Types/Product";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { addToCart } from "../Redux/CartSlice";
import { selectIsFavourite, toogleFavourite } from "../Redux/FavouriteSlice";
import { Link } from "react-router-dom";
import { showSuccess } from "../Utlies/ToastMsg";
import {  motion } from "motion/react";
import { Heart } from "lucide-react";
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  // console.log("ProductCard", product.id);

  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector(selectIsFavourite(product.id));
  return (
    <motion.div>
      <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <Link
          to={`/products/${product.id}`}
          className="flex flex-col items-center"
        >
          <div className="overflow-hidden rounded-xl flex justify-center w-full ">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="h-40 object-contain mb-4 transition-transform duration-300 group-hover:scale-115"
            />
          </div>

          <h3 className=" text-black/80 text-xl font-mono text-center m-3">
            {product.title}
          </h3>
        </Link>

        {/* Price + Rating */}
        <div className="flex justify-between items-center mt-2 p-2">
          <p className="font-bold text-black text-lg">${product.price}</p>

          <p className="text-xs text-gray-500">⭐ {product.rating}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-5 mt-4">
          <button
            onClick={() => {
              dispatch(addToCart(product));
              // toast.success("Added to cart ✅")
              showSuccess("Added to cart ✅", { id: "cart-toast" });
            }}
            className="flex-1 bg-cyan-800 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition active:scale-95"
          >
            Add
          </button>

          <button
            onClick={() => {
              dispatch(toogleFavourite(product));
              // toast.success("Added to favourite ❤️")
              showSuccess("Added to favourite ❤️", { id: "favourite-toast" });
            }}
            className={`px-3 py-2 rounded-lg text-white transition active:scale-95 ${
              isFavourite 
  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105" 
  : "bg-black/30 backdrop-blur-md text-white/80 hover:bg-black/50 hover:text-white border border-white/10"
            }`}
          >
            <Heart/>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
