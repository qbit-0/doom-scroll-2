import { Box, Heading, PropsOf, Switch, useColorMode } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const DisplaySettingsPanel: FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Card {...props}>
      <Heading>DoomScroll Display Settings</Heading>
      <Box>
        <Switch isChecked={colorMode === "dark"} onChange={toggleColorMode}>
          Dark Mode
        </Switch>
      </Box>
      <Box>
        <Switch>Hide Filtered Content</Switch>
      </Box>
    </Card>
  );
};

export default DisplaySettingsPanel;
