import { Box, Heading, VStack } from "@chakra-ui/react";
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

  return (
    <Card>
      <Heading>Rules</Heading>
      {rules && (
        <VStack>
          {rules["rules"].map((rule: any, index: number) => {
            return (
              <Box key={index} border="1px solid green">
                <Heading>{rule["short_name"]}</Heading>
                <SanitizeHTML dirty={rule["description_html"]} />;
              </Box>
            );
          })}
        </VStack>
      )}
    </Card>
  );
};

export default SubredditRules;
