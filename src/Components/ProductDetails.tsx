import { useParams } from "react-router-dom"
import { useProductById } from "../ProductsHooks/ProductIdHook"
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
import { addToCart } from "../Redux/CartSlice"
import { selectIsFavourite, toogleFavourite } from "../Redux/FavouriteSlice"
import Container from "../ReusableComp/Container"
import { showSuccess } from "../Utlies/ToastMsg"
import { Heart } from "lucide-react"

export default function ProductDetails() {
    const {id} = useParams() 
    const {data: product , isLoading } = useProductById(Number(id))
    const dispatch = useAppDispatch()
    const isFavourite = useAppSelector(selectIsFavourite(Number(id)))
    if(isLoading) return <div className="flex justify-center text-2xl pt-3">Loading ... </div>
  return (
    <Container>
    <div>
      <h3 className=" text-2xl p-5 w-fit font-light"> Product Details</h3>
      {product &&  <div className="p-6 max-w-5xl mx-auto">
     <div className="grid md:grid-cols-2 gap-8">

        {/* الصورة */}
        <div className="flex justify-center items-center">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-90 object-contain"
          />
        </div>

        {/* التفاصيل */}
        <div className="flex flex-col gap-6 mt-10">
          <h1 className="text-3xl font-normal">{product.title}</h1>

          <p className="text-gray-600 text-xl">{product.description}</p>

          <p className="text-xl font-semibold text-cyan-600">
            ${product.price}
          </p>

          <div className="flex gap-3 mt-4">
              <button
            onClick={() => {
              dispatch(addToCart(product));
              // toast.success("Added to cart ✅")
              showSuccess("Added to cart ✅", { id: "cart-toast" });
            }}
            className="flex- w-50 bg-cyan-800 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition active:scale-95"
          >
            Add To Cart
          </button>

            <button
            onClick={() => {
              dispatch(toogleFavourite(product));
              // toast.success("Added to favourite ❤️")
              showSuccess("Added to favourite ❤️", { id: "favourite-toast" });
            }}
            className={`px-3 py-2 rounded-lg text-white transition active:scale-95 ${
              isFavourite 
  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30 scale-105" 
  : "bg-black/30 backdrop-blur-md text-white/80 hover:bg-black/50 hover:text-white border border-white/10"
            }`}
          >
            <Heart/>
          </button>
          </div>
        </div>
      </div>
    </div>
}
    </div>
    </Container>
    
  )
}
