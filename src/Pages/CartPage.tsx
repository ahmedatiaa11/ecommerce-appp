import { Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from "../Redux/CartSlice";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const totalQuantity = useAppSelector(selectCartTotalQuantity);
  const subtotal = useAppSelector(selectCartTotalPrice);
  const shipping = subtotal >= 100 ? 0 : 5.99;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
          <ShoppingBag size={34} />
        </div>
        <h1 className="mt-6 text-3xl font-semibold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-slate-500">A few good finds are waiting for you.</p>
        <Link
          to="/products"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          <ArrowLeft size={18} /> Explore products
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Your selection
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Shopping cart
          </h1>
          <p className="mt-2 text-slate-500">
            {totalQuantity} {totalQuantity === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Link to="/products" className="text-sm font-semibold text-slate-600 hover:text-emerald-700">
          Continue shopping
        </Link>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4" aria-label="Cart items">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
            >
              <Link
                to={`/products/${item.id}`}
                className="flex min-w-0 flex-1 items-center gap-4"
              >
                <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-2">
                  <img src={item.thumbnail} alt={item.title} className="size-full object-contain" />
                </div>
                <div className="min-w-0">
                  <h2 className="line-clamp-2 font-semibold text-slate-900">{item.title}</h2>
                  <p className="mt-2 text-sm text-slate-500">{item.brand}</p>
                  <p className="mt-2 font-semibold text-slate-900">{currency.format(item.price)}</p>
                </div>
              </Link>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    aria-label={`Decrease ${item.title} quantity`}
                    className="flex size-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="min-w-5 text-center text-sm font-semibold" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    aria-label={`Increase ${item.title} quantity`}
                    className="flex size-8 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <p className="w-24 text-right font-semibold text-slate-900">
                  {currency.format(item.price * item.quantity)}
                </p>
                <button
                  type="button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                  aria-label={`Remove ${item.title} from cart`}
                  className="flex size-10 items-center justify-center rounded-full text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
          <button
            type="button"
            onClick={() => dispatch(clearCart())}
            className="px-1 py-2 text-sm font-medium text-slate-500 hover:text-rose-700"
          >
            Clear cart
          </button>
        </section>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-xl font-semibold text-slate-900">Order summary</h2>
          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span><span>{currency.format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Estimated shipping</span>
              <span>{shipping === 0 ? "Free" : currency.format(shipping)}</span>
            </div>
            {shipping > 0 && (
              <p className="rounded-xl bg-emerald-50 p-3 text-xs leading-5 text-emerald-800">
                Shipping is free on orders of $100 or more.
              </p>
            )}
            <div className="flex justify-between border-t border-slate-100 pt-4 text-base font-semibold text-slate-900">
              <span>Total</span><span>{currency.format(subtotal + shipping)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-7 flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
          >
            Continue to checkout
          </Link>
          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            Demo checkout only. No payment will be processed.
          </p>
        </aside>
      </div>
    </main>
  );
}
