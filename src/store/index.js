import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

import { authReducer } from './slices/authSlice';
import { mediaApi } from './apis/mediaApi';
import { firestoreApi } from './apis/firestoreApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(mediaApi.middleware)
      .concat(firestoreApi.middleware),
});

setupListeners(store.dispatch);

// re-export
export * from './thunks/auth';
export { authIsChecked } from './slices/authSlice';
export {
  useGetSearchResultsQuery,
  useGetMediaDetailsQuery,
  useGetTrendingMediaQuery,
  useGetTopRatedMediaQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieImagesQuery,
} from './apis/mediaApi';
export {
  useFetchCollectionQuery,
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} from './apis/firestoreApi';
