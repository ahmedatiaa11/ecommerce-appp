
import { useLogin } from '../ProductsHooks/UseLogin'
import { useForm } from 'react-hook-form'
import { useAppDispatch } from '../Redux/ReduxHooks'
import { setToken } from '../Redux/AuthSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { showSuccess } from '../Utlies/ToastMsg'
import type { LoginData } from '../Types/Product'

export default function LoginPage() {
    const { register , handleSubmit ,formState:{errors}  } = useForm<LoginData>()
    const { mutate , isPending , isError , error  } = useLogin()
    const dispatch = useAppDispatch()
    const navigate  = useNavigate()
    const location = useLocation()
    // console.log("Location from login page :" , location)
    // console.log( "Location:",location)
    const from = location.state?.from?.pathname || '/'
    const onSubmit =(data:LoginData)=>{
      console.log("login data :" , data)
        mutate(data , {
          onSuccess :(res) => {
            console.log("res :" , res)
            console.log('token' , res.accessToken)
            localStorage.setItem('token' , res.accessToken)
            // toast.success('Login successful')
            showSuccess("Login successful")
            dispatch(setToken(res.accessToken))
            navigate(from , {replace:true})
          }
        })
    }
  return (
     <>
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md p-6 rounded w-full max-w-sm flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        {/*  */}
        <div>
          <input
            // type=""
            placeholder="username"
            className="w-full border p-2 rounded"
            {...register("username", {
          required: "Username is required",
        })}
          />
          {errors.username && (
            <p className="text-red-500 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
         {isPending? "Loging in ...  " :"Login"}
        </button>
       {isError && <p>{error.message}</p>}
      </form>
    </div>
    </>
  )
}