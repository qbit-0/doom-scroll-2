import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import BackToTop from "./BackToTop";
import DoomScrollExplanation from "./DoomScrollExplanation";
import DoomScrollSettings from "./DoomScrollSettings";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  showExplanation?: boolean;
};

const PageFrame: FC<Props> = ({
  top,
  left,
  right,
  showExplanation = false,
}) => {
  return (
    <Box>
      {top}
      <Flex py="4" justify="center" columnGap={4}>
        <Box w="xl">
          <VStack>{left}</VStack>
        </Box>
        <Box w="sm">
          <VStack h="full">
            {showExplanation && <DoomScrollExplanation />}
            <DoomScrollSettings />
            {right}
            <Flex justify="center" position="sticky" top="16" mt="2" mx="auto">
              <BackToTop />
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default PageFrame;
