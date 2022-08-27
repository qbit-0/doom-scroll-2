import { Box, Heading, PropsOf, Switch } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const DoomScrollDisplaySettings: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <Heading>DoomScroll Display Settings</Heading>
      <Box>
        <Switch>Dark Mode</Switch>
      </Box>
      <Box>
        <Switch>Hide Filtered Content</Switch>
      </Box>
      <Box>
        <Switch>Grey-Out Filtered Content</Switch>
      </Box>
    </Card>
  );
};

export default DoomScrollDisplaySettings;
