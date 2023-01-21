import { RootState } from './../store/index';
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSlector: TypedUseSelectorHook<RootState> = useSelector