import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import MeProvider from "../lib/context/MeProvider";
import { RedditMe } from "../lib/reddit/redditDataStructs";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
