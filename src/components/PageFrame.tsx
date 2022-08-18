import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import BackToTop from "./BackToTop";
import DoomScrollExplanation from "./DoomScrollExplanation";
import DoomScrollSettings from "./DoomScrollSettings";
import NavBar from "./NavBar";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  subreddit?: string;
  showExplanation?: boolean;
};

const PageFrame: FC<Props> = ({
  top,
  left,
  right,
  subreddit,
  showExplanation = false,
}) => {
  return (
    <>
      <Box position="fixed" top="0" w="full" zIndex="10">
        <NavBar subreddit={subreddit} />
      </Box>
      <Box pt="14">
        {top}
        <Flex pt="4" justify="center" columnGap={4}>
          <Box w="xl">
            <VStack>{left}</VStack>
          </Box>
          <Box w="sm">
            <VStack>
              {showExplanation && <DoomScrollExplanation />}
              <DoomScrollSettings />
              {right}
            </VStack>
            <Flex justify="center" position="sticky" top="2" mt="2" mx="auto">
              <BackToTop />
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PageFrame;
