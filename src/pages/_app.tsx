import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import CommentsFilterProvider from "../lib/context/CommentsFilterProvider";
import PostsFilterProvider from "../lib/context/PostsFilterProvider";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <PostsFilterProvider>
        <CommentsFilterProvider>
          <Component {...pageProps} />
        </CommentsFilterProvider>
      </PostsFilterProvider>
    </ChakraProvider>
  );
};

export default App;
