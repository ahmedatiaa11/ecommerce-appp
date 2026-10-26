import { Heart, House, LogIn, LogOut, Menu, Search, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sheet as SheetPrimitive,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../@/components/ui/sheet";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks";
import { isAuth, logOut } from "../Redux/AuthSlice";

const mobileLink =
  "flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800";

export default function Sheet() {
  const authenticated = useAppSelector(isAuth);
  const dispatch = useAppDispatch();

  return (
    <SheetPrimitive>
      <SheetTrigger aria-label="Open navigation menu" className="flex size-10 items-center justify-center rounded-full text-slate-700 hover:bg-slate-200">
        <Menu size={21} />
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(20rem,85vw)] bg-white">
        <SheetHeader>
          <SheetTitle className="text-left text-xl font-semibold text-slate-900">ahm3t shop</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile navigation">
          <SheetClose><NavLink to="/products" className={mobileLink}><House size={19} /> Shop</NavLink></SheetClose>
          <SheetClose><NavLink to="/search" className={mobileLink}><Search size={19} /> Search</NavLink></SheetClose>
          <SheetClose><NavLink to="/favorites" className={mobileLink}><Heart size={19} /> Favorites</NavLink></SheetClose>
          <SheetClose><NavLink to="/cart" className={mobileLink}><ShoppingCart size={19} /> Cart</NavLink></SheetClose>
          {authenticated ? (
            <button
              type="button"
              onClick={() => dispatch(logOut())}
              className={`${mobileLink} text-left`}
            >
              <LogOut size={19} /> Log out
            </button>
          ) : (
            <SheetClose><NavLink to="/login" className={mobileLink}><LogIn size={19} /> Log in</NavLink></SheetClose>
          )}
        </nav>
      </SheetContent>
    </SheetPrimitive>
  );
}
