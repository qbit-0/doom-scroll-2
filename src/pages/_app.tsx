import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useEffect, useState } from "react";

import MeProvider from "../lib/context/MeProvider";
import { RedditMe } from "../lib/reddit/redditDataStructs";
import theme from "../styles/theme";

const App = ({ Component, pageProps }: AppProps) => {
  const [initialMe, setInitialMe] = useState<RedditMe | undefined>(undefined);
  useEffect(() => {
    const value = localStorage.getItem("me");
    setInitialMe(!!value ? JSON.parse(value) : undefined);
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <MeProvider initialMe={initialMe}>
        <Component {...pageProps} />
      </MeProvider>
    </ChakraProvider>
  );
};

export default App;
