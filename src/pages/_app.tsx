import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import MeProvider from "../lib/context/MeProvider";
import theme from "../styles/theme";

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
