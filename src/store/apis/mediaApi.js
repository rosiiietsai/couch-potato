import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { BASE_URL } from '../../configs/config';

export const mediaApi = createApi({
  reducerPath: 'media',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: builder => ({
    getSearchResults: builder.query({
      query: ({ query, mediaType, page }) => ({
        url: `/search/${mediaType}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`,
        method: 'GET',
      }),
    }),
    getMediaDetails: builder.query({
      query: ({ id, mediaType }) => ({
        url: `/${mediaType}/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,recommendations,similar,credits`,
        method: 'GET',
      }),
    }),
    getTrendingMedia: builder.query({
      query: mediaType => ({
        url: `/trending/${mediaType}/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        method: 'GET',
      }),
    }),
    getTopRatedMedia: builder.query({
      query: mediaType => ({
        url: `/${mediaType}/top_rated?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        method: 'GET',
      }),
    }),
    getNowPlayingMovies: builder.query({
      query: () => ({
        url: `/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        method: 'GET',
      }),
    }),
    getMovieImages: builder.query({
      query: id => ({
        url: `/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_API_KEY}&include_image_language=en`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSearchResultsQuery,
  useGetMediaDetailsQuery,
  useGetTrendingMediaQuery,
  useGetTopRatedMediaQuery,
  useGetNowPlayingMoviesQuery,
  useGetMovieImagesQuery,
} = mediaApi;
