import { toast } from "react-toastify"

type toastProps ={
    id?: string
}

 export const showSuccess = (msg :string , options? : toastProps)=>{
     return toast.success(
        msg ,
        { id: options?.id}
    )

 }
 export const ShowError = (msg:string ,options? :toastProps)=>{
    toast.error(msg , {
        id: options?.id
    })
 }