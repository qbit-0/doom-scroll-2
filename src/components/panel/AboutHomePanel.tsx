import { Heading, PropsOf, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

import Card from "../Card";

type Props = PropsOf<typeof Card>;

const AboutHomePanel: FC<Props> = (props) => {
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

export default AboutHomePanel;
