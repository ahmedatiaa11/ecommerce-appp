import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useProductById } from "../ProductsHooks/ProductIdHook";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { addToCart } from "../Redux/CartSlice";
import { selectIsFavourite, toogleFavourite } from "../Redux/FavouriteSlice";
import Container from "../ReusableComp/Container";
import { showSuccess } from "../Utlies/ToastMsg";
import type { Product } from "../Types/Product";

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ProductDetails() {
  const { id } = useParams();
  const productId = Number(id);
  const { data: product, isLoading, isError, error } = useProductById(productId);

  if (!Number.isInteger(productId) || productId <= 0) {
    return (
      <Container>
        <p className="py-20 text-center text-slate-600">This product link is invalid.</p>
      </Container>
    );
  }
  if (isLoading) {
    return <p className="py-20 text-center text-slate-500" role="status">Loading product…</p>;
  }
  if (isError || !product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="font-medium text-rose-700">
            {error?.message || "This product could not be found."}
          </p>
          <Link to="/products" className="mt-4 inline-block text-sm font-semibold text-emerald-800">
            Back to products
          </Link>
        </div>
      </Container>
    );
  }

  return <ProductDetailsView key={product.id} product={product} />;
}

function ProductDetailsView({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const isFavourite = useAppSelector(selectIsFavourite(product.id));
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const images = [...new Set([product.thumbnail, ...(product.images ?? [])].filter(Boolean))];
  const stock = product.stock;
  const maxQuantity = stock ?? Number.MAX_SAFE_INTEGER;
  const canPurchase = stock === undefined || stock > 0;

  return (
    <main className="py-8 sm:py-12">
      <Container>
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-emerald-700">
          <ArrowLeft size={17} /> Back to products
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
          <section>
            <div className="flex min-h-96 items-center justify-center rounded-[2rem] bg-white p-8 shadow-sm sm:min-h-[34rem]">
              <img
                src={selectedImage || product.thumbnail || product.image}
                alt={product.title}
                className="max-h-[30rem] w-full object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    aria-label={`Show another image of ${product.title}`}
                    aria-pressed={selectedImage === image}
                    className={`flex size-20 shrink-0 items-center justify-center rounded-2xl border bg-white p-2 ${
                      selectedImage === image ? "border-emerald-600 ring-2 ring-emerald-100" : "border-slate-200"
                    }`}
                  >
                    <img src={image} alt="" className="size-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </section>

          <section className="py-2 lg:py-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {product.brand || product.category}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Star size={17} className="fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
                {product.reviews?.length ? ` · ${product.reviews.length} reviews` : ""}
              </span>
              <span className={`text-sm font-medium ${canPurchase ? "text-emerald-700" : "text-rose-700"}`}>
                {stock === undefined ? "Availability varies" : canPurchase ? `${stock} in stock` : "Currently unavailable"}
              </span>
            </div>
            <p className="mt-6 text-3xl font-semibold text-slate-900">{currency.format(product.price)}</p>
            <p className="mt-6 leading-7 text-slate-600">{product.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                  aria-label="Decrease quantity"
                  className="flex size-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100"
                >
                  <Minus size={16} />
                </button>
                <span className="min-w-6 text-center font-semibold">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.min(maxQuantity, current + 1))}
                  aria-label="Increase quantity"
                  disabled={quantity >= maxQuantity}
                  className="flex size-9 items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 disabled:opacity-40"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                type="button"
                disabled={!canPurchase}
                onClick={() => {
                  dispatch(addToCart({ ...product, quantity }));
                  showSuccess("Added to cart", { id: "cart-toast" });
                }}
                className="min-w-48 flex-1 rounded-full bg-slate-900 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(toogleFavourite(product));
                  showSuccess(isFavourite ? "Removed from favorites" : "Added to favorites", {
                    id: "favourite-toast",
                  });
                }}
                aria-label={isFavourite ? "Remove from favorites" : "Add to favorites"}
                aria-pressed={isFavourite}
                className={`flex size-12 items-center justify-center rounded-full border transition ${
                  isFavourite
                    ? "border-rose-200 bg-rose-50 text-rose-600"
                    : "border-slate-200 bg-white text-slate-600 hover:text-rose-600"
                }`}
              >
                <Heart size={19} fill={isFavourite ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-8 grid gap-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <p className="flex items-center gap-3"><Truck size={18} className="text-emerald-700" />{product.shippingInformation || "Shipping information provided at checkout"}</p>
              <p className="flex items-center gap-3"><ShieldCheck size={18} className="text-emerald-700" />{product.warrantyInformation || "Shop with confidence"}</p>
              {product.returnPolicy && <p className="text-sm text-slate-500">{product.returnPolicy}</p>}
            </div>

            {product.reviews && product.reviews.length > 0 && (
              <section className="mt-8 border-t border-slate-200 pt-6">
                <h2 className="text-lg font-semibold text-slate-900">Customer reviews</h2>
                <ul className="mt-4 space-y-4">
                  {product.reviews.slice(0, 3).map((review, index) => (
                    <li key={`${review.reviewerName}-${index}`} className="rounded-2xl bg-white p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-medium text-slate-800">{review.reviewerName}</p>
                        <span className="inline-flex items-center gap-1 text-sm text-slate-600">
                          <Star size={14} className="fill-amber-400 text-amber-400" /> {review.rating}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </section>
        </div>
      </Container>
    </main>
  );
}
