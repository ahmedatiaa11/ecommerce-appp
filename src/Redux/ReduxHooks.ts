import {  useDispatch, useSelector } from "react-redux"
import type { RootState, AppDispatch } from "./Store"

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()