import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../DebauncedSearch";
import { useProducts } from "../../ProductsHooks/UseProduts";
import ProductList from "../ProductsList";
import Container from "../../ReusableComp/Container";

export const SearchInput = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get("search") || "");
  const debauncedValue = useDebounce(value, 500);

  const { data } = useProducts("", debauncedValue);
  const allProducts = data?.pages.flatMap((page) => page.products) || [];

  useEffect(() => {
    setSearchParams((prev) => {
      if (debauncedValue) {
        prev.set("q", debauncedValue);
      } else {
        prev.delete("q");
      }
      return prev;
    });
  }, [debauncedValue, setSearchParams]);

  return (
    <>
      <Container>
        <div className=" flex justify-center">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search products.."
            className=" px-5 py-2 my-5 border w-200 rounded-3xl  focus:ring-1"
          />
        </div>
        <div className=" flex justify-center">
          {!data ? <h3 className=" text-2xl">"no products found"</h3> : ""}
        </div>
        <ProductList products={allProducts} />
      </Container>
    </>
  );
};
