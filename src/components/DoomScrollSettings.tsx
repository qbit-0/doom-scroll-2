import { Box, Heading } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const DoomScrollSettings: FC<Props> = () => {
  return (
    <Card>
      <Box p="4">
        <Heading>DoomScroll Settings</Heading>
      </Box>
    </Card>
  );
};

export default DoomScrollSettings;
