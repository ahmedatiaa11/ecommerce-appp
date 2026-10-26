import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { clearCart, selectCartItems, selectCartTotalPrice } from "../Redux/CartSlice";
import type { CheckoutOrder } from "../Types/Order";

type CheckoutFormData = CheckoutOrder["customer"];
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function CheckoutPage() {
  const orderId = useId().replace(/[^a-z0-9]/gi, "").toUpperCase();
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartTotalPrice);
  const shipping = subtotal >= 100 ? 0 : 5.99;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  if (items.length === 0 && !orderSubmitted) return <Navigate to="/cart" replace />;

  const submitOrder = (customer: CheckoutFormData) => {
    const order: CheckoutOrder = {
      orderNumber: `DEMO-${orderId}`,
      createdAt: new Date().toISOString(),
      customer,
      items,
      subtotal,
      shipping,
      total: subtotal + shipping,
      paymentMethod: "Cash on delivery (demo)",
    };
    setOrderSubmitted(true);
    dispatch(clearCart());
    navigate("/order-confirmation", { replace: true, state: { order } });
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100";
  const labelClass = "block text-sm font-medium text-slate-700";

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700">
        <ArrowLeft size={17} /> Back to cart
      </Link>
      <div className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">Almost there</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">Checkout</h1>
      </div>

      <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
        <form
          onSubmit={handleSubmit(submitOrder)}
          className="space-y-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8"
        >
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Contact and delivery details</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className={labelClass}>
                Full name
                <input
                  autoComplete="name"
                  placeholder="Your full name"
                  className={inputClass}
                  {...register("fullName", { required: "Enter your full name." })}
                />
                {errors.fullName && <span className="mt-1 block text-xs text-rose-700">{errors.fullName.message}</span>}
              </label>
              <label className={labelClass}>
                Email address
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                  {...register("email", {
                    required: "Enter your email address.",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email address." },
                  })}
                />
                {errors.email && <span className="mt-1 block text-xs text-rose-700">{errors.email.message}</span>}
              </label>
              <label className={labelClass}>
                Phone number
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="+1 555 123 4567"
                  className={inputClass}
                  {...register("phone", { required: "Enter your phone number." })}
                />
                {errors.phone && <span className="mt-1 block text-xs text-rose-700">{errors.phone.message}</span>}
              </label>
              <label className={labelClass}>
                City
                <input
                  autoComplete="address-level2"
                  placeholder="City"
                  className={inputClass}
                  {...register("city", { required: "Enter your city." })}
                />
                {errors.city && <span className="mt-1 block text-xs text-rose-700">{errors.city.message}</span>}
              </label>
              <label className={`${labelClass} sm:col-span-2`}>
                Street address
                <input
                  autoComplete="street-address"
                  placeholder="Street, building, apartment"
                  className={inputClass}
                  {...register("address", { required: "Enter your delivery address." })}
                />
                {errors.address && <span className="mt-1 block text-xs text-rose-700">{errors.address.message}</span>}
              </label>
              <label className={labelClass}>
                Postal code
                <input
                  autoComplete="postal-code"
                  placeholder="Postal code"
                  className={inputClass}
                  {...register("postalCode", { required: "Enter your postal code." })}
                />
                {errors.postalCode && <span className="mt-1 block text-xs text-rose-700">{errors.postalCode.message}</span>}
              </label>
            </div>
          </section>

          <section className="border-t border-slate-100 pt-6">
            <h2 className="text-lg font-semibold text-slate-900">Payment method</h2>
            <div className="mt-4 rounded-2xl border border-emerald-300 bg-emerald-50 p-4">
              <p className="font-medium text-slate-900">Cash on delivery</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Demo option only. This project does not connect to a payment provider or charge you.
              </p>
            </div>
          </section>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-800"
          >
            Place demo order
          </button>
        </form>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-28">
          <h2 className="text-lg font-semibold text-slate-900">Your order</h2>
          <ul className="mt-5 max-h-80 space-y-4 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <img src={item.thumbnail} alt="" className="size-14 rounded-xl bg-slate-50 object-contain p-1" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium text-slate-800">{item.title}</p>
                  <p className="mt-1 text-xs text-slate-500">Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-slate-800">{currency.format(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
            <p className="flex justify-between text-slate-600"><span>Subtotal</span><span>{currency.format(subtotal)}</span></p>
            <p className="flex justify-between text-slate-600"><span>Shipping</span><span>{shipping === 0 ? "Free" : currency.format(shipping)}</span></p>
            <p className="flex justify-between border-t border-slate-100 pt-4 text-base font-semibold text-slate-900">
              <span>Total</span><span>{currency.format(subtotal + shipping)}</span>
            </p>
          </div>
          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
            <LockKeyhole size={14} /> Demo checkout — no payment details collected
          </p>
        </aside>
      </div>
    </main>
  );
}
