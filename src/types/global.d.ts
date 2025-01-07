import type { TypedUseSelectorHook } from 'react-redux'
import type { AppDispatch, RootState } from '@/@core/redux'
import { useLocation, useNavigate, useParams } from "react-router-dom";

declare global {
  interface WithPageProps {
    // store
    dispatch: AppDispatch,
    useSelector: TypedUseSelectorHook<RootState>

    // router
    location: ReturnType<typeof useLocation>
    navigate: ReturnType<typeof useNavigate>
    params: ReturnType<typeof useParams>

    // status
    setLoading: (loading: boolean) => void
  }
}

// 让 TypeScript 识别为全局类型
export {};