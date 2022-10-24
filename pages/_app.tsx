import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import axios, { AxiosRequestConfig } from "axios";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { AuthProvider } from "@context/AuthContext";
import { AuthGuard } from "@HOC/AuthGuard";
import { ThemeProvider } from "@mui/system";
import theme from "../styles";
import nookies from "nookies";

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  requireAuth?: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = nookies.get()?.token;
  config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <CssBaseline />
            {Component.requireAuth ? (
              <AuthGuard>{getLayout(<Component {...pageProps} />)}</AuthGuard>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </Hydrate>
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default MyApp;
