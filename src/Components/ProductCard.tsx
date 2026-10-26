import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { addToCart } from "../Redux/CartSlice";
import { selectIsFavourite, toogleFavourite } from "../Redux/FavouriteSlice";
import type { Product } from "../Types/Product";
import { showSuccess } from "../Utlies/ToastMsg";

type Props = { product: Product };
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector(selectIsFavourite(product.id));
  const discountedPrice =
    product.discountPercentage && product.discountPercentage > 0
      ? product.price / (1 - product.discountPercentage / 100)
      : null;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
      <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-5">
        <Link
          to={`/products/${product.id}`}
          className="flex h-full w-full items-center justify-center"
          aria-label={`View ${product.title}`}
        >
          <img
            src={product.thumbnail || product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </Link>
        {product.discountPercentage && product.discountPercentage > 0 ? (
          <span className="absolute left-3 top-3 rounded-full bg-emerald-800 px-3 py-1 text-xs font-semibold text-white">
            {Math.round(product.discountPercentage)}% off
          </span>
        ) : null}
        {product.stock === 0 && (
          <span className="absolute bottom-3 left-3 rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
        <button
          type="button"
          disabled={product.stock === 0}
          onClick={() => {
            dispatch(toogleFavourite(product));
            showSuccess(isFavourite ? "Removed from favorites" : "Added to favorites", {
              id: "favourite-toast",
            });
          }}
          aria-label={isFavourite ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
          aria-pressed={isFavourite}
          className={`absolute right-3 top-3 flex size-10 items-center justify-center rounded-full shadow-sm transition ${
            isFavourite
              ? "bg-rose-600 text-white"
              : "bg-white/90 text-slate-600 hover:bg-white hover:text-rose-600"
          }`}
        >
          <Heart size={18} fill={isFavourite ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {product.brand || product.category}
        </p>
        <Link to={`/products/${product.id}`} className="mt-1">
          <h2 className="line-clamp-2 min-h-12 font-medium leading-6 text-slate-900 transition hover:text-emerald-800">
            {product.title}
          </h2>
        </Link>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-slate-900">{currency.format(product.price)}</span>
            {discountedPrice && (
              <span className="ml-2 text-xs text-slate-400 line-through">
                {currency.format(discountedPrice)}
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-sm text-slate-600">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            {product.rating.toFixed(1)}
          </span>
        </div>
        <button
          type="button"
          onClick={() => {
            dispatch(addToCart(product));
            showSuccess("Added to cart", { id: "cart-toast" });
          }}
          className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {product.stock === 0 ? "Unavailable" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
