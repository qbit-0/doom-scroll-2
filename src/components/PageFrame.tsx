import { Box, Flex, VStack, useColorModeValue } from "@chakra-ui/react";
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
  const bgColor = useColorModeValue("gray.200", "gray.900");

  const topRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <Box ref={topRef} />
      <Box bgColor={bgColor}>
        {top}
        <Flex py="4" w="full" justify="center" columnGap={4}>
          <VStack w="2xl" h="full">
            {left}
          </VStack>
          <Box>
            <VStack w="lg">
              {showExplanation && <DoomScrollExplanation />}
              {right}
            </VStack>
            <VStack justify="center" w="full" position="sticky" top="16" mt="2">
              <DisplaySettingsPanel />
              <DoomScrollFilters />
              <BackToTop topRef={topRef} />
            </VStack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default PageFrame;
