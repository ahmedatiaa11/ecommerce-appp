import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../Types/Product"; 
import type { RootState } from "./Store";

type CartItem = Product & { quantity: number };
interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product & { quantity?: number }>) => {
      const maxQuantity = action.payload.stock ?? Number.POSITIVE_INFINITY;
      if (maxQuantity <= 0) return;
      const quantity = Math.min(action.payload.quantity ?? 1, maxQuantity);
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, maxQuantity);
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity = Math.min(item.quantity + 1, item.stock ?? Number.POSITIVE_INFINITY);
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (!item) return;
      item.quantity -= 1;
      if (item.quantity <= 0) {
        state.items = state.items.filter((cartItem) => cartItem.id !== action.payload);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalQuantity = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotalPrice = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectIsInCart = (id: number) => (state: RootState) =>
  state.cart.items.some((item) => item.id === id);
