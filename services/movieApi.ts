import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURL = "https://api.themoviedb.org/3";
const ACCESS_TOKEN = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("Authorization", `Bearer ${ACCESS_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    //   QUERY ENDPOINTS
    fetchMovies: builder.query<MovieResponse, string | undefined>({
      query: (query) => ({
        url: query
          ? `/search/movie?query=${encodeURIComponent(query)}`
          : "/discover/movie?sort_by=popularity.desc",
      }),
    }),
  }),
});

export const { useFetchMoviesQuery } = movieApi;

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9'
//   }
// };
//
// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error(err));