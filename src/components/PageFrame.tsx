import { Box, BoxProps, Flex, VStack } from "@chakra-ui/react";
import React, { FC, useRef } from "react";

import BackToTop from "./BackToTop";
import DisplaySettingsPanel from "./DisplaySettingsPanel";
import DoomScrollExplanation from "./DoomScrollExplanation";
import DoomScrollFilters from "./FiltersPanel";

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
          <Box maxW="xl">
            <VStack h="full">{left}</VStack>
          </Box>
          <Box maxW="lg">
            <VStack h="full">
              {showExplanation && <DoomScrollExplanation />}
              {right}
              <DisplaySettingsPanel />
              <VStack justify="center" position="sticky" top="16" mt="2">
                <DoomScrollFilters />
                <BackToTop topRef={topRef} />
              </VStack>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PageFrame;
