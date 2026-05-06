import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "./Store"


const tokenFromStorage = localStorage.getItem('token')

 type authState = {
    token : string | null
}
const initialState:authState ={
    token : tokenFromStorage || null
}

 const authSlice = createSlice({
    name : 'auth', 
    initialState ,
    reducers:{
        setToken : (state , action : PayloadAction<string | null>)=>{
            state.token = action.payload
        } ,
        logOut : ( state) =>{
            state.token = null 
        }
    }
 })
  export const {setToken ,logOut} = authSlice.actions
  export default authSlice.reducer

  export const  isAuth = (state:RootState) => Boolean(state.auth.token) 

    
  