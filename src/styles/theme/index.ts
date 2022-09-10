import { ThemeConfig, extendTheme } from "@chakra-ui/react";

import { Card } from "./components/Card";
import { colors } from "./foundations/colors";
import { styles } from "./styles";

export const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export default extendTheme({
  config,
  styles,
  colors,
  components: {
    Card,
  },
});
