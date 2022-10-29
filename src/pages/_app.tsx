import { ChakraProvider, localStorageManager } from "@chakra-ui/react";
import { AppProps } from "next/app";
import Head from "next/head";

import CommentsFilterProvider from "../lib/context/CommentsFilterProvider";
import DisplaySettingsProvider from "../lib/context/DisplaySettingsProvider";
import PostsFilterProvider from "../lib/context/PostsFilterProvider";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>DoomScroll</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <ChakraProvider colorModeManager={localStorageManager} theme={theme}>
        <DisplaySettingsProvider>
          <PostsFilterProvider>
            <CommentsFilterProvider>
              <Component {...pageProps} />
            </CommentsFilterProvider>
          </PostsFilterProvider>
        </DisplaySettingsProvider>
      </ChakraProvider>
    </>
  );
};

export default App;
