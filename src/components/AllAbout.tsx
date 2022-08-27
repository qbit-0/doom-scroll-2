import { Heading, PropsOf, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const AllAbout: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <Heading>r/all</Heading>
      <Text>
        The most active posts from all of Reddit. Come here to see new posts
        rising and be a part of the conversation.
      </Text>
    </Card>
  );
};

export default AllAbout;
