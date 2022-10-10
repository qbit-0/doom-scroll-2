import { ThemeConfig, extendTheme } from "@chakra-ui/react";

import { colors } from "./foundations/colors";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme({
  config,
  colors,
  components: {},
});
