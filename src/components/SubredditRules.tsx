import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SkeletonText,
} from "@chakra-ui/react";
import { FC } from "react";

import { RedditRules } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  rules?: RedditRules;
};

const SubredditRules: FC<Props> = ({ rules }) => {
  const rulesPlaceholder = [];
  for (let i = 0; i < 4; i++) {
    rulesPlaceholder.push(
      <AccordionItem key={i}>
        <AccordionButton>
          <SkeletonText w="full" noOfLines={4} />
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <SkeletonText noOfLines={4} />
        </AccordionPanel>
      </AccordionItem>
    );
  }

  return (
    <Card>
      <Box p="4">
        <Heading>Rules</Heading>
        <Accordion allowMultiple>
          {rules
            ? rules.rules.map(
                (rule: RedditRules["rules"][0], index: number) => {
                  return (
                    <AccordionItem overflowWrap="anywhere" key={index}>
                      <AccordionButton>
                        <Heading flex="1" size="md">
                          {rule.short_name}
                        </Heading>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel>
                        <SanitizeHTML dirty={rule.description_html} />;
                      </AccordionPanel>
                    </AccordionItem>
                  );
                }
              )
            : rulesPlaceholder}
        </Accordion>
      </Box>
    </Card>
  );
};

export default SubredditRules;
