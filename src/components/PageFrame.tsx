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
        <Flex py="4" justify="center" columnGap={4}>
          <Box maxW="2xl">
            <VStack w="full" h="full">
              {left}
            </VStack>
          </Box>
          <Box maxW="lg">
            <VStack w="full" h="full">
              {showExplanation && <DoomScrollExplanation />}
              {right}
              <VStack
                justify="center"
                w="full"
                position="sticky"
                top="16"
                mt="2"
              >
                <DisplaySettingsPanel />
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
