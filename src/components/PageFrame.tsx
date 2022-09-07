import { ChevronLeftIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Portal,
  Text,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useRef } from "react";

import BackToTop from "./BackToTop";
import Card from "./Card";
import DisplaySettingsPanel from "./panel/DisplaySettingsPanel";
import ExplanationPanel from "./panel/ExplanationPanel";
import FilterCommentsPanel from "./panel/FilterCommentsPanel";
import FilterPostsPanel from "./panel/FilterPostsPanel";

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
  const {
    isOpen: isSettingsOpen,
    onOpen: onSettingsOpen,
    onClose: onSettingsClose,
  } = useDisclosure();
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const bgColor = useColorModeValue("gray.200", "gray.900");

  const topRef = useRef<HTMLDivElement>(null);

  const hideRightPanels = useBreakpointValue({ base: false, xl: true });

  return (
    <>
      <Box ref={topRef} />
      <Box bgColor={bgColor}>
        {top}
        <Flex py="4" w="full" justify="center" columnGap={4}>
          <VStack maxW="2xl" h="full">
            {showExplanation && <ExplanationPanel />}
            {left}
          </VStack>
          <VStack hidden={!hideRightPanels} maxW="lg">
            {right}
          </VStack>
        </Flex>
      </Box>
      <BackToTop topRef={topRef} position="fixed" bottom="8" right="8" />
      <Portal>
        <Flex
          direction="column"
          justify="center"
          position="fixed"
          top="0"
          right="0"
          h="full"
          rowGap="2"
        >
          <Button
            variant="outline"
            hidden={hideRightPanels}
            h="25%"
            onClick={onDetailsOpen}
            aria-label={"open detail panels"}
            roundedRight="none"
          >
            <Text sx={{ writingMode: "vertical-rl" }}>Details</Text>
          </Button>
          <Button
            variant="outline"
            h="25%"
            onClick={onSettingsOpen}
            aria-label={"open settings panels"}
            roundedRight="none"
          >
            <Text sx={{ writingMode: "vertical-rl" }}>Settings</Text>
          </Button>
        </Flex>
      </Portal>
      <Drawer isOpen={isSettingsOpen} onClose={onSettingsClose} size="lg">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>DoomScroll Settings</Heading>
          </DrawerHeader>
          <DrawerBody>
            <VStack>
              <DisplaySettingsPanel />
              <FilterPostsPanel />
              <FilterCommentsPanel />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer isOpen={isDetailsOpen} onClose={onDetailsClose} size="lg">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Subreddit Details</Heading>
          </DrawerHeader>
          <DrawerBody>{right}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PageFrame;
