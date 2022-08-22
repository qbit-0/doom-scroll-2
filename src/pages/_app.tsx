import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useState } from "react";

import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
