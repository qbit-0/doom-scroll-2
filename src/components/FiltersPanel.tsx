import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { PropsOf } from "@emotion/react";
import { FC } from "react";

import Card from "./Card";
import DoomScrollCommentsFilter from "./CommentsFilterPanel";
import DoomScrollPostsFilter from "./PostsFilterPanel";

type Props = PropsOf<typeof Card>;

const DoomScrollFilters: FC<Props> = (props) => {
  return (
    <Card {...props}>
      <Accordion defaultIndex={[0]} allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Heading flex="1" textAlign="left" size="lg">
              DoomScroll Filters
            </Heading>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <VStack align="left" divider={<StackDivider />}>
              <DoomScrollPostsFilter />
              <DoomScrollCommentsFilter />
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};

export default DoomScrollFilters;
