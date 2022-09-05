import { Box, Heading, PropsOf, Switch, useColorMode } from "@chakra-ui/react";
import { FC, useContext } from "react";

import { DisplaySettingsContext } from "../lib/context/DisplaySettingsProvider";
import Card from "./Card";

type Props = PropsOf<typeof Card>;

const DisplaySettingsPanel: FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { hideFilteredContent, setHideFilteredContent } = useContext(
    DisplaySettingsContext
  );

  return (
    <Card {...props}>
      <Heading size="lg">DoomScroll Display Settings</Heading>
      <Box>
        <Switch isChecked={colorMode === "light"} onChange={toggleColorMode}>
          Burn Eyes
        </Switch>
      </Box>
      <Box>
        <Switch
          isChecked={hideFilteredContent}
          onChange={setHideFilteredContent.toggle}
        >
          Hide Filtered Content
        </Switch>
      </Box>
    </Card>
  );
};

export default DisplaySettingsPanel;
