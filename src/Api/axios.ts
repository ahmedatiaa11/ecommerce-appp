import axios from "axios"
import { store } from "../Redux/Store"
import { logOut } from '../Redux/AuthSlice';

export const api = axios.create({
  baseURL: "https://dummyjson.com",
})

api.interceptors.request.use((config)=>{
  const state = store.getState()
  const token = state.auth.token
  console.log("token from interceptor "  , token)
  if(token){
    config.headers.Authorization=  `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(

  (response) => {
      console.log(" response successfully "  )

    return response
  },

  (error) => {
          console.log(" response faild "  )

    if(
      error.response?.status === 401
    ){

      store.dispatch(logOut())
      window.location.href =
        "/login"
    }
    return Promise.reject(error)
  }

)