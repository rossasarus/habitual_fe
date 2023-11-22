import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tokenResponseType } from "../types/auth";
import { getJWTFromLocalStorage } from "../utils";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    prepareHeaders: async (headers) => {
      const jwt = await getJWTFromLocalStorage();
      if (jwt) {
        headers.set("authorization", `Bearer ${jwt}`);
      }
      headers.set("content-type", "application/json");
      return headers;
    },
    baseUrl: "http://127.0.0.1:8000",
  }),
  endpoints: (builder) => ({
    getHabits: builder.query<any, string>({
      query: () => `/habits/`,
    }),

    getToken: builder.mutation<
      tokenResponseType,
      { username: string; password: string }
    >({
      query: ({ username, password }) => ({
        url: `/api/token/`,
        body: { username: username, password },
        method: "POST",
      }),
    }),

    refreshAccessToken: builder.mutation<
      { access: string },
      { refresh: string }
    >({
      query: ({ refresh }) => ({
        url: `/api/token/refresh/`,
        body: { refresh },
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetHabitsQuery,
  useGetTokenMutation,
  useRefreshAccessTokenMutation,
} = apiSlice;
