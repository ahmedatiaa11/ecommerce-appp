import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { router } from './routes/router.tsx'
import { Provider } from 'react-redux'
import { store } from './Redux/Store.ts'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
      <RouterProvider router={router}/>
      <ToastContainer 
      position="top-center"
      autoClose={2000}
      // theme="dark"
      />
      </Provider>
    </QueryClientProvider>
   </StrictMode>,
)
