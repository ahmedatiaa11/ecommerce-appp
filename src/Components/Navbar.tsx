import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { selectCartTotalQuantity } from "../Redux/CartSlice";
import { selectFavorites } from "../Redux/FavouriteSlice";
import { isAuth, logOut } from "../Redux/AuthSlice";
import Sheet from "../Components/Sheet";


export default function Navbar() {
  const cartCount = useAppSelector(selectCartTotalQuantity);
  const favourites = useAppSelector(selectFavorites);
  const isAuthi = useAppSelector(isAuth);
  const dispatch = useAppDispatch();

  return (
    <nav className="sticky top-0 left-0 z-50 flex items-center justify-between bg-white/50 px-6 py-4 text-white shadow-md backdrop-blur-md">
      {/* Mobile Menu */}
      <div className="lg:hidden">
        <Sheet /> 
      </div>

      {/* Logo */}
      <h1 className="cursor-pointer text-black text-2xl font-bold tracking-wide hove:text-yellow-400 transition">
        AHMED'S SHOP
      </h1>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "text-cyan-500 font-semibold text-2xl "
              : "hover:text-gray-300 text-2xl"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favouites"
          className="relative group"
        >
          <span className="text-lg transition group-hover:scale-110">
            ❤️
          </span>

          {favourites.length > 0 && (
            <span className="absolute -right-3 -top-2 rounded-full bg-red-500 px-1.5 py-0.5 text-xs">
              {favourites.length}
            </span>
          )}
        </NavLink>

      </div>

      {/* Actions */}
      <div className="flex items-center gap-5">

        {/* Cart (كل الشاشات) */}
        <NavLink
          to="/cart"
          className="relative group "
        >
          <span className="text-lg  transition group-hover:scale-110">
            🛒
          </span>

          {cartCount > 0 && (
            <span className="absolute -right-3 -top-2 rounded-full bg-green-500 px-1.5 py-0.5 text-xs">
              {cartCount}
            </span>
          )}
        </NavLink>

        {/* Desktop Auth */}
        {!isAuthi ? (
          <NavLink
            to="/login"
            className="hidden rounded-lg bg-yellow-400 px-4 py-1.5 font-medium text-black transition hover:bg-yellow-300 lg:block"
          >
            Login
          </NavLink>
        ) : (
          <button
            onClick={() => dispatch(logOut())}
            className="hidden rounded-lg bg-red-500 px-4 py-1.5 transition hover:bg-red-600 active:scale-95 lg:block"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}












// import { Link, NavLink } from "react-router-dom"
// import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
// import { selectCartTotalQuantity } from "../Redux/CartSlice"
// import { selectFavorites } from "../Redux/FavouriteSlice"
// import { isAuth, logOut } from "../Redux/AuthSlice"
// // import { logOut, selectIsAuth } from "../Redux/authSlice"
// import Sheet from "../Components/Sheet"



// export default function Navbar() {
//    const cartCount = useAppSelector(selectCartTotalQuantity)
//    const favourits = useAppSelector(selectFavorites)
//    const isAuthi = useAppSelector(isAuth)
//    const dispatch = useAppDispatch()

//   return (
//   <nav className="bg-gray-900/80 backdrop-blur-md text-white px-6 py-4 flex justify-between items-center sticky top-0 left-0 w-full z-50 shadow-md">

//     {/* Logo */}
//     <h1 className="text-2xl font-bold tracking-wide cursor-pointer hover:text-yellow-400 transition">
//       AHMED'S SHOP

//     </h1>
//     {/* <Link to="/sheet">Sheet For Testing </Link> */}
//     {/* <div className="lg:hidden md:hidden " > <Sheet/> </div> */}

//     {/* 🔍 SEARCH INPUT PLACE (حط search هنا)
//     <div className="flex-1 mx-6">
//         <input 
//           type="text" 
//           placeholder="Search products..." 
//           className="w-full px-4 py-2 rounded-lg text-white outline-none bg-gray-950 placeholder:text-gray-400"
          
//         />
//     </div> */}

//     {/* Links */}
//     <div className="flex items-center gap-6 hidden  md:flex">

//       {/* Home */}
//       <NavLink
//         to="/products"
//         className={({ isActive }) =>
//           `relative transition ${
//             isActive
//               ? "text-yellow-400 font-semibold"
//               : "hover:text-gray-300"
//           }`
//         }
//       >
//         Home
//       </NavLink>

//       {/* Favorites */}
//       <NavLink
//         to="/favouites"
//         className="relative group"
//       >
//         <span className="text-lg group-hover:scale-110 transition inline-block">
//           ❤️
//         </span>

//         {favourits.length > 0 && (
//           <span className="absolute -top-2 -right-3 bg-red-500 text-xs px-1.5 py-0.5 rounded-full animate-bounce">
//             {favourits.length}
//           </span>
//         )}
//       </NavLink>

//       {/* Cart */}
//       {/* <NavLink
//         to="/cart"
//         className="relative group"
//       >
//         <span className="text-lg group-hover:scale-110 transition inline-block">
//           🛒
//         </span>

//         {cartCount > 0 && (
//           <span className="absolute -top-2 -right-3 bg-green-500 text-xs px-1.5 py-0.5 rounded-full animate-bounce">
//             {cartCount}
//           </span>
//         )}
//       </NavLink> */}

//       {/* Auth */}
//       {/* {!isAuthi ? (
//         <NavLink
//           to="/login"
//           className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-yellow-300 transition"
//         >
//           Login
//         </NavLink>
//       ) : (
//         <button
//           onClick={() => dispatch(logOut())}
//           className="bg-black text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition active:scale-95"
//         >
//           Logout
//         </button>
//       )} */}
//     </div>
//     <div className="flex items-center gap-4 ">
//       {/* Cart */}
//       <NavLink
//         to="/cart"
//         className="relative group"
//       >
//         <span className="text-lg group-hover:scale-110 transition inline-block">
//           🛒
//         </span>

//         {cartCount > 0 && (
//           <span className="absolute -top-2 -right-3 bg-green-500 text-xs px-1.5 py-0.5 rounded-full animate-bounce">
//             {cartCount}
//           </span>
//         )}
//       </NavLink>
//        {!isAuthi ? (
//         <NavLink
//           to="/login"
//           className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg font-medium hover:bg-yellow-300 transition hidden md:flex "
//         >
//           Login
//         </NavLink>
//       ) : (
//         <button
//           onClick={() => dispatch(logOut())}
//           className="bg-black text-white px-4 py-1.5 rounded-lg hover:bg-red-600 transition active:scale-95  hidden md:flex "
//         >
//           Logout
//         </button>
//       )}
//     </div>
//         <div className="lg:hidden md:hidden " > <Sheet/> </div>

//   </nav>
// )
// }
