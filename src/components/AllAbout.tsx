import { Box, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const AllAbout: FC<Props> = () => {
  return (
    <Card>
      <Box p="4">
        <Heading>r/all</Heading>
        <Text>
          The most active posts from all of Reddit. Come here to see new posts
          rising and be a part of the conversation.
        </Text>
      </Box>
    </Card>
  );
};

export default AllAbout;
