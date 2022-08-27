import { Heading, PropsOf, Text } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = PropsOf<typeof Card>;

const DoomScrollExplanation: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <Heading size="2xl">DoomScroll: The Best and Wost of Reddit</Heading>
      <Text>
        Doomscrolling refers to the tendency to continue to surf or scroll
        through bad news, even though that news is saddening, disheartening, or
        depressing.
      </Text>
      <Text>
        DoomScroll analyzes the sentiment of posts and allows you to filter
        posts by different metrics.
      </Text>
    </Card>
  );
};

export default DoomScrollExplanation;
