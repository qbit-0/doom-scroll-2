import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const AboutAll: FC<Props> = () => {
  return (
    <Card>
      <Heading size="lg">All</Heading>
      <Text>
        The most active posts from all of Reddit. Come here to see new posts
        rising and be a part of the conversation.
      </Text>
    </Card>
  );
};

export default AboutAll;
