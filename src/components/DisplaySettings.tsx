import { Box, Heading, Switch, useColorMode } from "@chakra-ui/react";
import { FC, useContext } from "react";

import ContentCard from "../ContentCard";
import { DisplaySettingsContext } from "../lib/context/DisplaySettingsProvider";

type Props = {};

const DisplaySettings: FC<Props> = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    showFilteredContent,
    setShowFilteredPosts: setShowFilteredContent,
    showAdvancedSettings,
    setShowAdvancedSettings,
  } = useContext(DisplaySettingsContext);

  return (
    <ContentCard>
      <Heading size="lg">DoomScroll Display Settings</Heading>
      <Box>
        <Switch isChecked={colorMode === "light"} onChange={toggleColorMode}>
          Flashbang
        </Switch>
      </Box>
      <Box>
        <Switch
          isChecked={showFilteredContent}
          onChange={() => {
            setShowFilteredContent(!showFilteredContent);
          }}
        >
          Show Filtered Posts
        </Switch>
      </Box>
      <Box>
        <Switch
          isChecked={showAdvancedSettings}
          onChange={() => {
            setShowAdvancedSettings(!showAdvancedSettings);
          }}
        >
          Show Advanced Settings
        </Switch>
      </Box>
    </ContentCard>
  );
};

export default DisplaySettings;
