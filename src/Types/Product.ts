


export  type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  brand : string 
  
  image: string
  rating: number
}

export type LoginData ={
  username : string ,
  password : string 
}
export type LoginResponse = { 
  accessToken: string 
}