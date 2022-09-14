import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import ContentCard from "../ContentCard";

type Props = {};

const AboutHome: FC<Props> = ({}) => {
  return (
    <ContentCard>
      <Heading size="lg">Home</Heading>
      <Text>
        Your personal Reddit frontpage. Come here to check in with your favorite
        communities
      </Text>
    </ContentCard>
  );
};

export default AboutHome;
