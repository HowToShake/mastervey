import { configureStore } from "@reduxjs/toolkit";
import createSurveySlice from "@slices/createSurvey";
import { setupListeners } from "@reduxjs/toolkit/query";
import { surveyApi } from "./services/surveys";
import authSlice from "@slices/auth";
import { answersApi } from "./services/answers";
import { authApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    createSurvey: createSurveySlice,
    [surveyApi.reducerPath]: surveyApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      authApi.middleware,
      surveyApi.middleware,
      answersApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
