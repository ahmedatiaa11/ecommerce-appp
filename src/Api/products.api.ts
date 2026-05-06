import type { LoginResponse, Product } from "../Types/Product"
import { api } from "./axios"

export const getProducts = async (page:number): Promise<Product[]> => {
  const limit = 10
  const skip = (page-1) * limit
  const { data } = await api.get<Product[]>(`/products` ,{params:{limit , skip}})
  return data
}


export const getElementById = async (id: number): Promise<Product> =>{ 
  const {data} = await api.get<Product>(`/products/${id}`) 
  return data 
}

export const Login =async (data:{username:string , password:string}) : Promise<LoginResponse> =>{
  const response = await api.post('/auth/login' , data)
  return response.data
}

type Category = {
  slug: string
  name: string
  url: string
}

export const getCategories = async ():Promise<Category[]> =>{
  const {data} = await api.get<Category[]>(`/products/categories`)
  return data
}


export const getElementByCategory = async (category:string , page:number) :Promise<Product[]> =>{
  const limit = 10 
  const skip = (page-1) * limit
  const {data} = await api.get<Product[]> (`/products/category/${category}` , {params:{limit , skip}})
  return data
}
