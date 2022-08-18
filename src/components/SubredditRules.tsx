import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SkeletonText,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  subreddit: string;
};

const SubredditRules: FC<Props> = ({ subreddit }) => {
  const [rules, setRules] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const rulesResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/r/${subreddit}/about/rules`,
      });
      setRules(rulesResponse.data);
    })();
  }, [subreddit]);

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
            ? rules["rules"].map((rule: any, index: number) => {
                return (
                  <AccordionItem overflowWrap="anywhere" key={index}>
                    <AccordionButton>
                      <Heading flex="1" size="md">
                        {rule["short_name"]}
                      </Heading>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <SanitizeHTML dirty={rule["description_html"]} />;
                    </AccordionPanel>
                  </AccordionItem>
                );
              })
            : rulesPlaceholder}
        </Accordion>
      </Box>
    </Card>
  );
};

export default SubredditRules;
