import { Box, BoxProps, Flex, VStack } from "@chakra-ui/react";
import React, { FC, useRef } from "react";

import BackToTop from "./BackToTop";
import DisplaySettings from "./DisplaySettings";
import DoomScrollExplanation from "./DoomScrollExplanation";
import DoomScrollFilters from "./Filters";

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
  const topRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Box ref={topRef} />
      <Box>
        {top}
        <Flex py="4" justify="center" columnGap={4}>
          <Box w="2xl">
            <VStack h="full">{left}</VStack>
          </Box>
          <Box w="lg">
            <VStack h="full">
              {showExplanation && <DoomScrollExplanation />}
              <DoomScrollFilters />
              <DisplaySettings />
              {right}
              <Flex
                justify="center"
                position="sticky"
                top="16"
                mt="2"
                mx="auto"
              >
                <BackToTop topRef={topRef} />
              </Flex>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PageFrame;
