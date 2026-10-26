import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../DebauncedSearch";
import { useProducts } from "../../ProductsHooks/UseProduts";
import ProductList from "../ProductsList";
import Container from "../../ReusableComp/Container";

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlQuery = searchParams.get("q") || searchParams.get("search") || "";
  const [value, setValue] = useState(urlQuery);
  const debouncedValue = useDebounce(value, 400);
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProducts("", debouncedValue);
  const products = data?.pages.flatMap((page) => page.products) ?? [];

  useEffect(() => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (debouncedValue.trim()) {
        next.set("q", debouncedValue.trim());
      } else {
        next.delete("q");
      }
      next.delete("search");
      return next;
    });
  }, [debouncedValue, setSearchParams]);

  return (
    <main className="py-12">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Find what you’re looking for
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Search products
          </h1>
        </div>
        <div className="mx-auto mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-sm focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-100">
          <SearchIcon className="shrink-0 text-slate-400" size={20} />
          <input
            type="search"
            aria-label="Search products"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Try headphones, skincare, or home…"
            className="w-full bg-transparent py-4 text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>

        <section className="mt-10">
          {isLoading && debouncedValue.trim() && (
            <p className="py-12 text-center text-slate-500" aria-live="polite">
              Searching products…
            </p>
          )}
          {isError && (
            <p className="py-12 text-center text-rose-700">
              Search failed: {error.message}
            </p>
          )}
          {!debouncedValue.trim() && (
            <p className="py-12 text-center text-slate-500">
              Enter a product name to start searching.
            </p>
          )}
          {debouncedValue.trim() && !isLoading && !isError && products.length === 0 && (
            <p className="py-12 text-center text-slate-500">
              No products matched “{debouncedValue}”. Try a different search.
            </p>
          )}
          {products.length > 0 && <ProductList products={products} />}
          {hasNextPage && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => void fetchNextPage()}
                disabled={isFetchingNextPage}
                className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-600 hover:text-emerald-700 disabled:opacity-60"
              >
                {isFetchingNextPage ? "Loading…" : "Load more results"}
              </button>
            </div>
          )}
        </section>
      </Container>
    </main>
  );
};
