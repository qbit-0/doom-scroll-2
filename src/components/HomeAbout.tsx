import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const HomeAbout: FC<Props> = () => {
  return (
    <Card>
      <Box p="4">
        <Heading>Home</Heading>
        <Text>
          Your personal Reddit frontpage. Come here to check in with your
          favorite communities
        </Text>
      </Box>
    </Card>
  );
};

export default HomeAbout;
