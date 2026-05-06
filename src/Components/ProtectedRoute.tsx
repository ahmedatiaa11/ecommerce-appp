import { useLocation, Navigate } from 'react-router-dom'
import {isAuth} from '../Redux/AuthSlice'
import { useAppSelector } from '../Redux/ReduxHooks'



export default function ProtectedRoute({children}:{children:React.ReactNode}) {
    const isAuthi = useAppSelector(isAuth)
    const location = useLocation()
        // console.log( "Location from protected route :",location)

   if(!isAuthi){
    
        // return <Navigate to="/" state={{from: location}} replace />
                 return  <Navigate to="/Login" state={{from: location}} replace />

    }

    return children
}
