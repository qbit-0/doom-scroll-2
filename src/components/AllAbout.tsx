import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const AllAbout: FC<Props> = () => {
  return (
    <Card>
      <Heading>r/all</Heading>
      <Text>
        The most active posts from all of Reddit. Come here to see new posts
        rising and be a part of the conversation.
      </Text>
    </Card>
  );
};

export default AllAbout;
