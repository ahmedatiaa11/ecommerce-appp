import { useMutation } from "@tanstack/react-query"
import { Login } from "../Api/products.api"

export const useLogin = ()=>{
    return useMutation({
        mutationFn:  Login
    })
}

