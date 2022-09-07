import {
  Box,
  Heading,
  PropsOf,
  Switch,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import { FC, useContext } from "react";

import { DisplaySettingsContext } from "../../lib/context/DisplaySettingsProvider";
import Card from "../Card";

type Props = PropsOf<typeof Card>;

const DisplaySettingsPanel: FC<Props> = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { hideFilteredContent, setHideFilteredContent } = useContext(
    DisplaySettingsContext
  );

  return (
    <Card {...props}>
      <Heading size="lg">DoomScroll Display Settings</Heading>
      <Tooltip label="Light mode or dark mode.">
        <Box>
          <Switch isChecked={colorMode === "light"} onChange={toggleColorMode}>
            Flashbang
          </Switch>
        </Box>
      </Tooltip>
      <Tooltip label="Only darken filtered out content or completely remove filtered out content from view.">
        <Box>
          <Switch
            isChecked={hideFilteredContent}
            onChange={setHideFilteredContent.toggle}
          >
            Hide Filtered Content
          </Switch>
        </Box>
      </Tooltip>
    </Card>
  );
};

export default DisplaySettingsPanel;
