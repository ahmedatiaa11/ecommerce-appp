import ProductList from "../Components/ProductsList";
import { useProducts } from "../ProductsHooks/UseProduts";
import { useCategories } from "../ProductsHooks/UseCategories";
import CategoryFilter from "../Components/UI/CategoryFilter";
import { useSearchParams } from "react-router-dom";
import { SearchInput } from "../Components/UI/Search";
import { useDebounce } from "../Components/DebauncedSearch";
import { useEffect, useRef, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import { Navigation } from "swiper/modules";

// import { Pagination } from "swiper/modules";
import "swiper/css/pagination";






export default function ProductsPage() {
  const elementRef = useRef(null);

  const [searchParams, setSearchParams] = useSearchParams();  
  const { data: categories } = useCategories();

  const selectedCategory = searchParams.get("category") || "all";
  // const currentPage = Number(searchParams.get("page")) || 1

  // const search = searchParams.get("search") || ""
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
  const debouncedSearch = useDebounce(searchInput, 500);
  // const queryClient =  useQueryClient()

  useEffect(() => {
    setSearchParams((prev) => {
      if (debouncedSearch) {
        prev.set("search", debouncedSearch);
      } else {
        prev.delete("search");
      }
      return prev;
    });
  }, [debouncedSearch]);

  const {
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
  } = useProducts(selectedCategory, debouncedSearch);

  // console.log("pages of data ", data?.pages);
  const allProducts = data?.pages.flatMap((page) => page.products) || [];
  console.log("allProducts", allProducts);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);
  

  return (
    <>
      

      <div className=" flex flex-col gap-5 ">
        
        <div className=" flex w-full justify-around py-3 ">
         
          <div>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                if(!category) return
                setSearchParams((prev) => {
                  prev.set("category", category );
                  // prev.set("page", "1");
                  return prev;
                });
              }}
            />
          </div>


          <div className="  ">
            <SearchInput
              value={searchInput}
              onSearch={(value) => setSearchInput(value)}
            />
          </div>



        </div>
        {/* <h1 className="mx-auto text-3xl p-3 bg-amber-400 rounded-4xl  ">
          Products
        </h1> */}

        <ProductList products={allProducts} />

        <div ref={elementRef}>Loading ...</div>
      </div>

     
    </>
  );
}


 {/* <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => {
        setSearchParams((prev) => {
          prev.set("page", page.toString());
          return prev;
        });
      }}
    />  */}







{/* modules={[Navigation]} navigation
  <div className="w-150 mx-auto ">
 <Swiper slidesPerView={1} spaceBetween={10}  modules={[Autoplay]  }
    autoplay={{
        delay: 5000,
    }} >
  <SwiperSlide>
    <div className="bg-gray-200  w-full"><img src="./imgs/matthew-osborn-wMRIcT86SWU-unsplash.jpg" alt="Slide 1" /></div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="bg-gray-200 p-4"><img src="./imgs/morgane-leisser-uhVxyRbbkaQ-unsplash.jpg" alt="Slide 2" /></div>
  </SwiperSlide>

  <SwiperSlide>
    <div className="bg-gray-200 p-4"><img src="./imgs/ryan-waring-164_6wVEHfI-unsplash.jpg" alt="Slide 3" /></div>
  </SwiperSlide>
</Swiper>
</div> */}

// import ProductList from "../Components/ProductsList"
// import { useProducts } from "../ProductsHooks/UseProduts"
// import { useCategories } from "../ProductsHooks/UseCategories"
// import CategoryFilter from "../Components/UI/CategoryFilter"
// import { useSearchParams } from "react-router-dom"
// import Loader from "../Utlies/Loader"
// import Pagination from "../Components/UI/Pagination"

// import { SearchInput } from "../Components/UI/Search"
// import { useDebounce } from "../Components/DebauncedSearch"
// import { useEffect, useState } from "react"

// export default function ProductsPage() {
//   const [ searchParams , setSearchParams]=useSearchParams()
//   const {data:categories } =useCategories()

//   const selectedCategory = searchParams.get("category") || "all"
//   const currentPage = Number(searchParams.get("page")) || 1

//   // const search = searchParams.get("search" ) || ""

//    const [searchInput, setSearchInput] =
//     useState(searchParams.get("search") || "")

//       const debouncedSearch  = useDebounce(searchInput , 500)

//   useEffect(() => {
//   setSearchParams((prev) => {
//     if (debouncedSearch) {
//       prev.set("search", debouncedSearch)
//     } else {
//       prev.delete("search")
//     }
//     prev.set("page", "1")
//     return prev
//   })
// }, [debouncedSearch ,setSearchParams])

//   const {data:products  , isLoading , isFetching} = useProducts(selectedCategory , currentPage , debouncedSearch)

//   console.log("products" , products)
//   const totalPages = products? Math.ceil(products.total / products.limit ): 0

//   if(!products) return <Loader/>
//   return (
//     <>
//     <h1 className="text-2xl p-2 mx-5  font-light mb-1">Products</h1>
//     <CategoryFilter categories={categories } selectedCategory={selectedCategory}
//      onCategoryChange={(category)=>{
//       setSearchParams((prev) => {
//         prev.set("category" , category)
//         prev.set("page" , "1")
//       return prev
// })
//      }}/>
//      <SearchInput
//      value={searchInput}
//      onSearch={(value)=>{
//       setSearchInput(value)

//
//      }
//      />
// {/* {isFetching && <Loader />} */}
//      <ProductList products={products?.products || []}/>

//      <Pagination
//      currentPage={currentPage}
//       totalPages={totalPages}
//       onPageChange={(page) =>{
//         setSearchParams((prev)=>{
//         //  const params = new URLSearchParams()
//         //  params.set("page", page.toString())
//         //  return params
//         prev.set("page" , page.toString())
//         return prev
//         })
//       }}
//            />
//      </>
//   )
// }
