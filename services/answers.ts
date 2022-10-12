import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type Answer = any;

// Define a service using a base URL and expected endpoints
export const answersApi = createApi({
  reducerPath: "answers",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/mastervey-5c5ea/us-central1/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (!token) return;
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAnswers: builder.query<Answer[], string>({
      query: (id: string) => {
        return {
          url: `getAnswers`,
          params: {
            question: id,
          },
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAnswersQuery } = answersApi;
