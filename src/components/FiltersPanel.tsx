import { Heading, StackDivider, VStack } from "@chakra-ui/react";
import { PropsOf } from "@emotion/react";
import { FC } from "react";

import Card from "./Card";
import DoomScrollCommentsFilter from "./CommentsFilterPanel";
import DoomScrollPostsFilter from "./PostsFilterPanel";

type Props = PropsOf<typeof Card>;

const DoomScrollFilters: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <VStack align="left" divider={<StackDivider />}>
        <Heading>DoomScroll Filters</Heading>
        <DoomScrollPostsFilter />
        <DoomScrollCommentsFilter />
      </VStack>
    </Card>
  );
};

export default DoomScrollFilters;
