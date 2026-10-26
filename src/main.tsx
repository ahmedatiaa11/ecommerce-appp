import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom"
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { router } from './routes/router.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/Store.ts'
import { ToastContainer } from 'react-toastify'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from 'redux-persist/integration/react'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={<div className="p-8 text-center text-slate-500">Loading your store…</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position="top-center" autoClose={2000} />
    </Provider>
  </QueryClientProvider>,
)
