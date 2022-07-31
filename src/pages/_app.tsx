import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { createContext } from "vm";
import theme from "../styles/theme";
import MeProvider from "../utils/context/MeContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <MeProvider>
        <Component {...pageProps} />
      </MeProvider>
    </ChakraProvider>
  );
};

export default App;
