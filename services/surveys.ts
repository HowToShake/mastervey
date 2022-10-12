import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

type Survey = any;

// Define a service using a base URL and expected endpoints
export const surveyApi = createApi({
  reducerPath: "surveys",
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
    getSurveys: builder.query<Survey[], void>({
      query: () => {
        return { url: `getSurveys` };
      },
    }),
    createSurvey: builder.mutation({
      query: (body) => {
        return {
          url: `createSurvey`,
          method: "POST",
          body,
        };
      },
    }),
    getSurvey: builder.query<Survey, string>({
      query: (id) => {
        return { url: `getSurvey`, params: { name: id } };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetSurveysQuery,
  useCreateSurveyMutation,
  useGetSurveyQuery,
} = surveyApi;
