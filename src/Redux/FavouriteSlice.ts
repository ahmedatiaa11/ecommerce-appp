
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Product } from "../Types/Product";
// import { type RootState } from './Store';

// import {type RootState} from "../redux/Store"



type favouriteState ={
    items:Product[]
}
const initialState :favouriteState ={
    items:[]
}
 const favouriteSlice = createSlice({
    name:"favourites" ,
    initialState:initialState ,
    reducers:{
        toogleFavourite:(state ,action: PayloadAction<Product>)=>{
            const exist = state.items.find((item)=>item.id === action.payload.id)
            if(exist){
                state.items = state.items.filter((item)=> item.id !== action.payload.id)
            }
            else{
                state.items.push(action.payload)
            }
        } ,
        removeFavourite:(state , action: PayloadAction<number>)=>{
            state.items = state.items.filter(
                (item)=>item.id !== action.payload
            )
        },
        clearFavourite:(state )=>{
            state.items =[]
        }
    }
})
export default favouriteSlice.reducer
export const {toogleFavourite , removeFavourite ,clearFavourite} = favouriteSlice.actions

export const selectFavorites = (state: any) => state.favourite.items
// بدل ما تكتب في كل كومبوننت:
// const favorites = useAppSelector(  (state) => state.favourite.items)
// تكتب:
// const favorites = useAppSelector(selectFavorites)


export const selectIsFavourite = (id :number) =>
     (state : any)=>
        state.favourite.items.some((item:Product)=> item.id === id)

// احنا ليه عملنا ال selector  هنا ق ال slice  نفسها 
//كل مرة الكومبوننت يعمل render:
// React هيعمل:
// favorites.some(...)
// ولو عندك:
// 200 product card and 100 favourite 
//  يبقى العمليات دي هتتكرر كتير جدًا لو اتعملت ف ال component
//  فعشان كده نقلناها هنا ف ال slice 



