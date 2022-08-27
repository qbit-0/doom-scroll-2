import { BoxProps, Heading, PropsOf, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const PopularAbout: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <Heading>r/popular</Heading>
      <Text>
        The best posts on Reddit for you, pulled from the most active
        communities on Reddit. Check here to see the most shared, upvoted, and
        commented content on the internet.
      </Text>
    </Card>
  );
};

export default PopularAbout;
