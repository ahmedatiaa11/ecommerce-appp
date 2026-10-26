import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { clearFavourite, selectFavorites, toogleFavourite } from "../Redux/FavouriteSlice";
import { addToCart } from "../Redux/CartSlice";
import { showSuccess } from "../Utlies/ToastMsg";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function FavouritePage() {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(selectFavorites);

  if (favourites.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-rose-50 text-rose-600">
          <Heart size={34} />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">Your favorites are waiting</h1>
        <p className="mt-3 text-slate-500">Save products here to find them again later.</p>
        <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-emerald-800">
          <ShoppingBag size={18} /> Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-700">Saved for later</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Your favorites</h1>
        </div>
        <button
          type="button"
          onClick={() => dispatch(clearFavourite())}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-rose-700"
        >
          <Trash2 size={16} /> Clear all
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {favourites.map((item) => (
          <article key={item.id} className="flex min-w-0 items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <Link to={`/products/${item.id}`} className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-2">
              <img src={item.thumbnail || item.image} alt={item.title} className="size-full object-contain" loading="lazy" />
            </Link>
            <div className="min-w-0 flex-1">
              <Link to={`/products/${item.id}`} className="line-clamp-2 font-semibold text-slate-900 hover:text-emerald-800">
                {item.title}
              </Link>
              <p className="mt-2 text-sm font-semibold text-slate-700">{currency.format(item.price)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    dispatch(addToCart(item));
                    showSuccess("Added to cart", { id: "cart-toast" });
                  }}
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(toogleFavourite(item));
                    showSuccess("Removed from favorites", { id: "favourite-toast" });
                  }}
                  aria-label={`Remove ${item.title} from favorites`}
                  className="flex size-8 items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-700"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
