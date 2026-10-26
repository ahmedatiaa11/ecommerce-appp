import axios from "axios"
import { store } from "../Redux/Store"
import { logOut } from '../Redux/AuthSlice';

export const api = axios.create({
  baseURL: "https://dummyjson.com",
})

api.interceptors.request.use((config)=>{
  const state = store.getState()
  const token = state.auth.token
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})


api.interceptors.response.use(

  (response) => {
      console.log(" response successfully "  )

    return response
  },

  (error) => {
    const url = error.config.url
          console.log(" response faild "  )
                    console.log(" errrrrrror =  "  , url)


    if(
      error.response?.status === 401 && !url.includes("/login")
    ){
      store.dispatch(logOut())
      window.location.href =
        "/login"
    }
    return Promise.reject(error)
    // هو بيقول للجزء اللي استدعى الطلب: الطلب فشل، وكمّل تمرير الخطأ بدل ما تعتبره ناجحًا.
  }

)