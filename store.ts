import { configureStore } from "@reduxjs/toolkit";
import createSurveySlice from "@slices/createSurvey";
import { setupListeners } from "@reduxjs/toolkit/query";
import { surveyApi } from "./services/surveys";
import authSlice from "@slices/auth";
import { answersApi } from "./services/answers";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    createSurvey: createSurveySlice,
    [surveyApi.reducerPath]: surveyApi.reducer,
    [answersApi.reducerPath]: answersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      surveyApi.middleware,
      answersApi.middleware,
    ]),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
