import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import PostsFilterProvider from "../lib/context/PostsFilterProvider";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <PostsFilterProvider>
        <Component {...pageProps} />
      </PostsFilterProvider>
    </ChakraProvider>
  );
};

export default App;
