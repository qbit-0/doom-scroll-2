import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const themeConfig: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

const theme = extendTheme({
  config: themeConfig,
  // styles: {
  //   global: {
  //     a: {
  //       color: "teal.200",
  //       _hover: {
  //         textDecoration: "underline",
  //       },
  //     },
  //   },
  // },
});

export default theme;
