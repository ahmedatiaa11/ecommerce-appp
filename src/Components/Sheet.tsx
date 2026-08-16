import {
  Sheet,
  SheetClose,
  // SheetClose,
  SheetContent,

  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../@/components/ui/sheet"
import { Button } from "../../@/components/ui/button"
// import { Input } from "../../@/components/ui/input"
// import { Label } from "../../@/components/ui/label"
import { NavLink } from "react-router-dom"
import { Heart, House, LogIn, LogOut, Menu, MenuIcon, ShoppingCart } from "lucide-react"
import { useAppDispatch, useAppSelector } from "../Redux/ReduxHooks"
import {  isAuth, logOut } from "../Redux/AuthSlice"

export default function sheetForTesting() {
  const isAuthi = useAppSelector(isAuth);
    const dispatch = useAppDispatch();
  
    
 return (
    
     
        <div className="flex justify-center items-center">
    <Sheet  >
      <SheetTrigger className="m-3" render={<Menu className="" />} /> 
      <SheetContent side="left" >
        <SheetHeader>
          {/* <SheetTitle className=" text-3xl text-white"><Menu /></SheetTitle> */}
        </SheetHeader>
       <nav className="flex flex-col gap-4 m-2">

        <SheetClose >
        <NavLink to="/products"   className=" flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-300 transition">
        <House size={20}/>
        Home</NavLink>
        </SheetClose>

        <SheetClose>
        <NavLink to="/cart"   className=" flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-300 transition" >
         <ShoppingCart size={20} />
        Cart</NavLink>
         </SheetClose> 

         <SheetClose>
        <NavLink to="/favouites" className=" flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-300 transition">
          <Heart size={20} />
          Favourites
        </NavLink></SheetClose>
         {!isAuthi ? (
                  <NavLink
                    to="/login"
                    className="flex gap-3 rounded-lg  px-4 py-1.5 font-medium text-gray-700 hover:bg-gray-300 transition  "
                  >           <LogIn size={20} />
                    <span>  Login </span>
                  </NavLink>
                ) : (
                  <button
                    onClick={() => dispatch(logOut())}
                    className=" flex gap-3 items-center rounded-lg  px-4 py-1.5 transition text-gray-700 hover:bg-gray-300 active:scale-95 "
                  >
                    <LogOut/>
                  <span> Logout </span>  
                  </button>
                )}
        {/* <NavLink to="/login" className=" flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-300 transition">
          <LogIn size={20} />

          Login
        </NavLink> */}

       </nav>


        {/* <SheetFooter>
          <Button type="submit" className="text-lg font-semibold text-amber-50">
            Save changes
          </Button>
          <SheetClose className="text-lg font-semibold text-amber-50" render={<Button variant="outline">Close</Button>} />
        </SheetFooter> */}












































        


      </SheetContent>
    </Sheet>
    {/* <div className=" flex justify-center ">
      
    <div className="  font-semibold bg-rose-200 cursor-pointer p-3 rounded-2xl  text-black text-5xl"> love you shosha</div>
    </div> */}
    </div>
  )
}
