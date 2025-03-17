/* Core */
import { configureStore } from '@reduxjs/toolkit';
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux';

import AnalysisVideoApi from '@/api/AnalysisVideo';
import analysisVideo from '@/store/analysisVideo/analysisVideo';

export const reduxStore = configureStore({
  reducer: {
    [AnalysisVideoApi.reducerPath]: AnalysisVideoApi.reducer,
    analysisVideo,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(AnalysisVideoApi.middleware);
  },
});

export const useDispatch = () => useReduxDispatch<typeof reduxStore.dispatch>();
export const useSelector: TypedUseSelectorHook<
  ReturnType<typeof reduxStore.getState>
> = useReduxSelector;
