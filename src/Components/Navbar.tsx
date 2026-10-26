import { Heart, LogOut, Search, ShoppingCart } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { selectCartTotalQuantity } from "../Redux/CartSlice";
import { selectFavorites } from "../Redux/FavouriteSlice";
import { isAuth, logOut } from "../Redux/AuthSlice";
import Sheet from "../Components/Sheet";
import Container from "../ReusableComp/Container";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition ${
    isActive ? "text-emerald-800" : "text-slate-600 hover:text-emerald-800"
  }`;

export default function Navbar() {
  const cartCount = useAppSelector(selectCartTotalQuantity);
  const favoriteCount = useAppSelector(selectFavorites).length;
  const authenticated = useAppSelector(isAuth);
  const dispatch = useAppDispatch();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#f8f9f6]/90 backdrop-blur-xl">
      <Container>
        <nav className="flex min-h-18 items-center justify-between gap-4" aria-label="Main navigation">
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet />
          </div>
          <Link to="/products" className="shrink-0 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            ahm<span className="text-emerald-700">3t</span> shop
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <NavLink to="/products" className={linkClass}>Shop</NavLink>
            <NavLink to="/favorites" className={linkClass}>Favorites</NavLink>
            <NavLink to="/search" className={linkClass}>Search</NavLink>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/search"
              aria-label="Search"
              className="flex size-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200 lg:hidden"
            >
              <Search size={19} />
            </Link>
            <Link
              to="/favorites"
              aria-label={`Favorites${favoriteCount ? `, ${favoriteCount} items` : ""}`}
              className="relative flex size-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200"
            >
              <Heart size={20} />
              {favoriteCount > 0 && (
                <span className="absolute right-0 top-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-semibold text-white">
                  {favoriteCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label={`Shopping cart${cartCount ? `, ${cartCount} items` : ""}`}
              className="relative flex size-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-200"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-emerald-700 px-1 text-[11px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {authenticated ? (
              <button
                type="button"
                onClick={() => dispatch(logOut())}
                className="ml-1 hidden items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-900 hover:text-slate-900 sm:inline-flex"
              >
                <LogOut size={16} /> Log out
              </button>
            ) : (
              <Link
                to="/login"
                className="ml-1 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800"
              >
                Log in
              </Link>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}
