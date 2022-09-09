import { InfoOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  Portal,
  VStack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, useRef } from "react";

import BackToTop from "./BackToTop";
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
    isOpen: isInfoOpen,
    onOpen: onInfoOpen,
    onClose: onInfoClose,
  } = useDisclosure();
  const bgColor = useColorModeValue("gray.200", "gray.900");

  const topRef = useRef<HTMLDivElement>(null);

  const hideRightPanels = useBreakpointValue({ base: false, xl: true });

  return (
    <>
      <Box ref={topRef} bgColor={bgColor}>
        {top}
        <Flex py="4" justify="center" columnGap={4}>
          <VStack maxW="2xl" h="full">
            {showExplanation && <ExplanationPanel />}
            {left}
          </VStack>
          <VStack hidden={!hideRightPanels} maxW="lg">
            {right}
          </VStack>
        </Flex>
      </Box>
      <HStack position="fixed" bottom="4" right="4">
        <IconButton
          colorScheme="red"
          icon={<InfoOutlineIcon />}
          rounded="full"
          onClick={onInfoOpen}
          aria-label={"subreddit info"}
        />
        <IconButton
          colorScheme="red"
          icon={<SettingsIcon />}
          rounded="full"
          onClick={onSettingsOpen}
          aria-label={"doomscroll settings"}
        />
        <BackToTop topRef={topRef} />
      </HStack>
      <Drawer isOpen={isInfoOpen} onClose={onInfoClose} size="lg">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Subreddit Info</Heading>
          </DrawerHeader>
          <DrawerBody>
            <VStack>{right}</VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
    </>
  );
};

export default PageFrame;
