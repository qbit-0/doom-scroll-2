import { Box, BoxProps, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { PropsOf } from "@emotion/react";
import { FC } from "react";

import Card from "./Card";
import DoomScrollFilterCommentsSettings from "./DoomScrollFilterCommentsSettings";
import DoomScrollFilterPostsSettings from "./DoomScrollFilterPostsSettings";

type Props = PropsOf<typeof Card>;

const DoomScrollFilters: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <VStack align="left" divider={<StackDivider />}>
        <Heading>DoomScroll Filters</Heading>
        <DoomScrollFilterPostsSettings />
        <DoomScrollFilterCommentsSettings />
      </VStack>
    </Card>
  );
};

export default DoomScrollFilters;
