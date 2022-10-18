import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/mastervey-5c5ea/us-central1/",
    prepareHeaders: (headers, { getState }) => {
      headers.set("Access-Control-Allow-Origin", `*`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body) => ({ url: `signup`, method: "POST", body }),

      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   console.log("started!");
      //   try {
      //     const { data } = await queryFulfilled;
      //
      //     console.log("fulfilled data", data);
      //
      //     // dispatch(setTokens(data));
      //   } catch (err) {
      //     console.error("e === ", err);
      //   }
      // },
    }),
  }),
});

export const { useSignupMutation } = authApi;
