import { Box, Flex, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import BackToTop from "./BackToTop";
import NavBar from "./NavBar";

type Props = {
  top?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

const PageFrame: FC<Props> = ({ top, left, right }) => {
  return (
    <>
      <NavBar />
      {top}
      <Flex py="4" justify="center" columnGap={4}>
        <Box w="xl">
          <VStack>{left}</VStack>
        </Box>
        <Box w="sm">
          <VStack>{right}</VStack>
          <Flex justify="center" position="sticky" top="2" mt="2" mx="auto">
            <BackToTop />
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default PageFrame;
