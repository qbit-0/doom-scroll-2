import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
  PropsOf,
  SkeletonText,
} from "@chakra-ui/react";
import { FC, useContext } from "react";

import { SubredditContext } from "../../lib/context/SubredditProvider";
import { RedditRules } from "../../lib/reddit/redditDataStructs";
import Card from "../Card";
import SanitizeHTML from "../SanitizeHTML";

type Props = PropsOf<typeof Card>;

const SubredditRulesPanel: FC<Props> = (props) => {
  const { subredditRules } = useContext(SubredditContext);

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
    <Card {...props}>
      <Heading size="lg">Rules</Heading>
      <Accordion allowMultiple>
        {subredditRules
          ? subredditRules.rules.map(
              (rule: RedditRules["rules"][0], index: number) => {
                return (
                  <AccordionItem overflowWrap="anywhere" key={index}>
                    <AccordionButton>
                      <Heading flex="1" textAlign="left" size="md">
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
    </Card>
  );
};

export default SubredditRulesPanel;
