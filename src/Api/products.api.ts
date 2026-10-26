import type {
  Category,
  LoginData,
  LoginResponse,
  Product,
  ProductResponse,
} from "../Types/Product"
import { api } from "./axios"

export const getProducts = async (pageParam:number): Promise<ProductResponse> => {
  const limit = 10
  const skip = (pageParam-1) * limit
  const { data } = await api.get<ProductResponse>(`/products` ,{params:{limit , skip}})
  return data
}


export const getElementById = async (id: number): Promise<Product> =>{ 

  const {data} = await api.get<Product>(`/products/${id}`) 
  return data 
}

export const Login =async (data:LoginData) : Promise<LoginResponse> =>{
  const response = await api.post<LoginResponse>('/auth/login' , data)
  return response.data
}

export const getCategories = async ():Promise<Category[]> =>{
  const {data} = await api.get<Category[]>(`/products/categories`)
  return data
}


export const getElementByCategory = async (category:string , page:number) :Promise<ProductResponse> =>{
  const limit = 10 
  const skip = (page-1) * limit
  const {data} = await api.get<ProductResponse> (`/products/category/${encodeURIComponent(category)}` , {params:{limit , skip}})
  return data
}


export const searchProducts = async (search : string , page : number): Promise<ProductResponse>=>{
  const limit = 10 
  const skip = (page-1) * limit 
  const {data} = await api.get<ProductResponse>(`/products/search` , {params:{q : search , limit , skip}})
  return data
}
