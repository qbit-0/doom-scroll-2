import { InfoOutlineIcon, SettingsIcon } from "@chakra-ui/icons";
import {
  Box,
  BoxProps,
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
import React, { FC, useContext, useRef } from "react";

import { SubredditContext } from "../../lib/context/SubredditProvider";
import BackToTop from "../BackToTop";
import DisplaySettings from "../DisplaySettings";
import Explaination from "../Explaination";
import FilterComments from "../FilterComments";
import FilterPosts from "../FilterPosts";

type Props = {
  topChildren?: React.ReactNode;
  leftChildren?: React.ReactNode;
  rightChildren?: React.ReactNode;
};

const PageFrame: FC<Props> = ({ topChildren, leftChildren, rightChildren }) => {
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
  const { subreddit } = useContext(SubredditContext);

  return (
    <>
      <Box ref={topRef} bgColor={bgColor}>
        {topChildren}
        <Flex py="4" justify="center" columnGap={4}>
          <VStack w="full" maxW="2xl" h="full">
            {subreddit === "" && <Explaination />}
            {leftChildren}
          </VStack>
          <VStack hidden={!hideRightPanels} w="full" maxW="lg">
            {rightChildren}
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
            <VStack>{rightChildren}</VStack>
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
              <DisplaySettings />
              <FilterPosts />
              <FilterComments />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default PageFrame;
