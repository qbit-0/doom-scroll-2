import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";

import ContentCard from "../ContentCard";

type Props = {};

const AboutPopular: FC<Props> = () => {
  return (
    <ContentCard>
      <Heading size="lg">Popular</Heading>
      <Text>
        The best posts on Reddit for you, pulled from the most active
        communities on Reddit. Check here to see the most shared, upvoted, and
        commented content on the internet.
      </Text>
    </ContentCard>
  );
};

export default AboutPopular;
