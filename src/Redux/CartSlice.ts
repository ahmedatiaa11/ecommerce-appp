// import { type RootState } from "./Store"

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../Types/Product"; 
 interface cartItem extends Product {
    quantity : number
 }
 interface cartState {
    items: cartItem[]
 }
 const initialState:cartState ={
    items : []
 }
 const cartSlice =createSlice({
  name: "cart",
  initialState:initialState ,
  reducers:{ 
   addToCart:(state, action: PayloadAction<Product>)=>{
      const exixt = state.items.find((item)=>item.id === action.payload.id)
      if(exixt){
         exixt.quantity +=1
      }
      else{
         state.items.push({...action.payload ,quantity :1} )
      }
   },
   removeFromCart:(state ,action: PayloadAction<number>) =>{
      const exixt = state.items.find((item)=>item.id === action.payload)
      if(!exixt) return
      state.items =state.items.filter((item) => item.id !== action.payload)
   } ,
   increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      )

      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      )

      if (item) {
        item.quantity -= 1

        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.id !== action.payload
          )
        }
      }
    }, 
    clearCart:(state) => {
      state.items = []
    }
   }  

 })


export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer
 
// Selectors (احترافي جداً)

export const selectCartItems = (state: any) => state.cart.items

export const selectCartTotalQuantity = (state: any) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0) 

export const selectCartTotalPrice = (state: any) =>
  state.cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

export const selectIsInCart =
  (id: number) => (state: any) =>
    state.cart.items.some((item) => item.id === id)


