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
