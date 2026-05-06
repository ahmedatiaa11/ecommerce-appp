
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart, selectCartTotalPrice, selectCartTotalQuantity } from "../Redux/CartSlice"
import  {  type RootState } from "../Redux/Store"

export default function CartPage() {
    const dispatch = useAppDispatch()
    const items = useAppSelector((state:RootState)=>state.cart.items)
    const totalQuantity = useAppSelector(selectCartTotalQuantity)
    const totalPrice = useAppSelector(selectCartTotalPrice)

    if(items.length === 0)
        return ( <h2 className="text-center mt-10 text-xl font-semibold">
        Your cart is empty 🛒
      </h2> )
    


  return (
  <div className="p-6 max-w-5xl mx-auto">
    <h1 className="text-3xl font-bold mb-8 text-center">
      🛒 Your Cart
    </h1>

    {items.length === 0 ? (
      <p className="text-center text-gray-500">Your cart is empty</p>
    ) : (
      <>
        <div className="flex flex-col gap-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-sm hover:shadow-lg transition rounded-xl p-4 group"
            >
              {/* info */}
              <div className="flex items-center gap-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-20 w-20 object-contain rounded-lg group-hover:scale-105 transition"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    ${item.price}
                  </p>
                </div>
              </div>

              {/* controls */}
              <div className="flex items-center gap-3 bg-gray-100 px-3 py-1 rounded-lg">
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="px-2 py-1 bg-white rounded hover:bg-gray-200 transition"
                >
                  -
                </button>

                <span className="font-semibold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="px-2 py-1 bg-white rounded hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              {/* remove */}
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="text-red-500 hover:text-red-700 font-semibold transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* totals */}
        <div className="mt-10 bg-white shadow-md rounded-xl p-6 flex flex-col gap-3 text-lg font-semibold">
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>

        {/* clear cart */}
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-6 bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition block mx-auto"
        >
          Clear Cart
        </button>
      </>
    )}
  </div>
)
}

