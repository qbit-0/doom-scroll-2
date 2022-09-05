import { Heading, PropsOf, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const HomeAbout: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <Heading size="lg">Home</Heading>
      <Text>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities
      </Text>
    </Card>
  );
};

export default HomeAbout;
