import { Box, Heading, VStack } from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  rules: any;
};

const SubredditRules: FC<Props> = ({ rules }) => {
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
