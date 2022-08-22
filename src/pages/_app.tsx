import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useState } from "react";

import NavBarContext from "../lib/context/NavBarContext";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  const [navBarSubreddit, setNavBarSubreddit] = useState("");

  return (
    <ChakraProvider theme={theme}>
      <NavBarContext.Provider value={{ navBarSubreddit, setNavBarSubreddit }}>
        <Component {...pageProps} />
      </NavBarContext.Provider>
    </ChakraProvider>
  );
};

export default App;
