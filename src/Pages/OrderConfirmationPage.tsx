import { Link, Navigate, useLocation } from "react-router-dom";
import { Check, PackageCheck } from "lucide-react";
import type { CheckoutOrder } from "../Types/Order";

type ConfirmationState = { order?: CheckoutOrder };
const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function OrderConfirmationPage() {
  const { state } = useLocation();
  const order = (state as ConfirmationState | null)?.order;

  if (!order) return <Navigate to="/products" replace />;

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
        <div className="relative mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
          <PackageCheck size={38} />
          <span className="absolute -right-1 -top-1 flex size-7 items-center justify-center rounded-full bg-emerald-700 text-white">
            <Check size={16} />
          </span>
        </div>
        <p className="mt-7 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Demo order placed
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Thanks, {order.customer.fullName.split(" ")[0]}!
        </h1>
        <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
          Your demo order is confirmed. No payment was taken and no real order was sent to a store.
        </p>

        <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">
          <div className="flex flex-wrap justify-between gap-2 border-b border-slate-200 pb-4 text-sm">
            <span className="text-slate-500">Order reference</span>
            <span className="font-semibold text-slate-900">{order.orderNumber}</span>
          </div>
          <div className="space-y-3 py-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span className="text-slate-600">{item.title} × {item.quantity}</span>
                <span className="font-medium text-slate-900">{currency.format(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-4 font-semibold text-slate-900">
            <span>Total</span><span>{currency.format(order.total)}</span>
          </div>
        </div>
        <p className="mt-5 text-sm text-slate-500">
          Delivery to {order.customer.address}, {order.customer.city} {order.customer.postalCode}
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          Continue shopping
        </Link>
      </section>
    </main>
  );
}
