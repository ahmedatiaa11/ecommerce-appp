
 import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "./CartSlice"
import favouriteReducer from "./FavouriteSlice"
import authReducer from './AuthSlice'

  export const store = configureStore({
    reducer:{
        cart: cartReducer ,
        favourite:favouriteReducer ,
        auth: authReducer
        
    }
 })

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch