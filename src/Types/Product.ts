


export type ProductReview = {
  rating: number
  comment: string
  date: string
  reviewerName: string
}

export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  thumbnail: string
  brand : string 
  
  image?: string
  rating: number
  images?: string[]
  discountPercentage?: number
  stock?: number
  availabilityStatus?: string
  shippingInformation?: string
  warrantyInformation?: string
  returnPolicy?: string
  reviews?: ProductReview[]
}

export type LoginData ={
  username : string ,
  password : string 
}
export type LoginResponse = { 
  accessToken: string ,
  refreshToken : string
}

export type ProductResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type Category = {
  slug: string
  name: string
  url: string
}