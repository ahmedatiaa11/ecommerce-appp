import { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { useProducts } from "../ProductsHooks/UseProduts";
import { useCategories } from "../ProductsHooks/UseCategories";
import CategoryFilter from "../Components/UI/CategoryFilter";
import ProductList from "../Components/ProductsList";
import Container from "../ReusableComp/Container";

export default function ProductsPage() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories } = useCategories();
  const selectedCategory = searchParams.get("category") || "all";
  const search = searchParams.get("q") || "";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts(selectedCategory, search);
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isFetchingNextPage) {
          void fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <main className="pb-16">
      <section className="mx-4 mt-5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white sm:mx-6 lg:mx-auto lg:max-w-7xl">
        <Container>
          <div className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-emerald-200">
                The everyday edit
              </p>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
                Find your next favorite thing.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                Thoughtful picks, easy browsing, and a smoother way to shop the
                things you love.
              </p>
              <Link
                to="#products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Explore products <ArrowRight size={18} />
              </Link>
            </div>
            <div className="hidden grid-cols-2 gap-4 lg:grid">
              <div className="flex min-h-40 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-6">
                <PackageCheck className="text-emerald-300" size={28} />
                <p className="text-lg font-medium">Curated finds</p>
              </div>
              <div className="mt-10 flex min-h-40 flex-col justify-between rounded-3xl bg-emerald-400 p-6 text-slate-950">
                <Truck size={28} />
                <p className="text-lg font-medium">Simple checkout</p>
              </div>
              <div className="col-span-2 flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-6">
                <ShieldCheck className="shrink-0 text-emerald-300" size={28} />
                <p className="text-sm leading-6 text-slate-300">
                  A clean, secure-feeling demo shopping experience from browse
                  to order confirmation.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <section id="products" className="scroll-mt-28 pt-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                The collection
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Shop all products
              </h2>
              <p className="mt-2 text-slate-500">
                Browse the collection and find something you’ll love.
              </p>
            </div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                if (!category) return;
                setSearchParams((previous) => {
                  const next = new URLSearchParams(previous);
                  next.set("category", category);
                  next.delete("q");
                  return next;
                });
              }}
            />
          </div>

          {isLoading && (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              Loading products…
            </p>
          )}
          {isError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
              <p className="font-medium text-rose-800">
                We couldn’t load the products.
              </p>
              <p className="mt-2 text-sm text-rose-700">{error.message}</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-4 rounded-full bg-rose-700 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-800"
              >
                Try again
              </button>
            </div>
          )}
          {!isLoading && !isError && products.length === 0 && (
            <p className="rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
              No products found in this category.
            </p>
          )}
          {products.length > 0 && <ProductList products={products} />}

          {hasNextPage && (
            <div ref={sentinelRef} className="py-8 text-center text-sm text-slate-500" aria-live="polite">
              {isFetchingNextPage ? "Loading more products…" : "Scroll to see more"}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
}
