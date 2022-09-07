import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  BoxProps,
  Button,
  ButtonGroup,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
  chakra,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { IoFilter } from "react-icons/io5";

import useLocalStorage from "../lib/hooks/useLocalStorage";
import { getAuthRequestUrl } from "../lib/reddit/redditOAuth";
import RedditAvatar from "./RedditAvatar";

type Props = {
  subreddit?: string;
} & BoxProps;

const NavBar: FC<Props> = ({ subreddit, ...innerProps }) => {
  const isCompact = useBreakpointValue({ base: true, md: false });
  const router = useRouter();
  const [me, setMe] = useLocalStorage("me");

  const [search, setSearch] = useState<string>(
    (router.query["q"] as string) || ""
  );

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    router.push(`/search?q=${search}`);
  };

  const handleSubredditButtonClick = () => {
    if (subreddit) {
      router.push(`/r/${subreddit}`);
    } else {
      router.push(`/`);
    }
  };

  const hideNavButtons = useBreakpointValue({ base: true, md: false });
  const fullScreenSearchBar = useBreakpointValue({ base: true });

  const {
    isOpen: isFilterModalOpen,
    onOpen: onFilterModalOpen,
    onClose: onFilterModalClose,
  } = useDisclosure();

  const {
    isOpen: isNavDrawerOpen,
    onOpen: onNavDrawerOpen,
    onClose: onNavDrawerClose,
  } = useDisclosure();

  return (
    <>
      <HStack w="full" p="2" bgColor="gray.800" {...innerProps}>
        <IconButton
          variant="ghost"
          icon={me ? <RedditAvatar username={me.name} /> : <HamburgerIcon />}
          aria-label={"open navigation drawer"}
          onClick={onNavDrawerOpen}
        />
        <Button onClick={handleSubredditButtonClick} display="inline">
          {subreddit ? `r/${subreddit}` : "Home"}
        </Button>
        <Button
          hidden={hideNavButtons}
          onClick={() => {
            router.push("/r/popular");
          }}
        >
          Popular
        </Button>
        <Button
          hidden={hideNavButtons}
          onClick={() => {
            router.push("/r/all");
          }}
        >
          All
        </Button>
        <chakra.form flex="auto" onSubmit={handleSearchSubmit}>
          <InputGroup>
            <Input
              variant="filled"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
            <InputRightElement>
              <IconButton
                icon={<SearchIcon />}
                aria-label={"search submit"}
                type="submit"
              />
            </InputRightElement>
          </InputGroup>
        </chakra.form>
        <IconButton
          icon={<IoFilter />}
          aria-label={"open sort settings"}
          onClick={onFilterModalOpen}
        />
      </HStack>

      <Modal
        isOpen={isFilterModalOpen}
        onClose={onFilterModalClose}
        isCentered
        size="md"
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent mt="4">
          <ModalBody zIndex={0} p="2">
            <ButtonGroup display="flex" w="full" variant="outline" p="2">
              <VStack w="full">
                <Button w="full" value="best" leftIcon={<BellIcon />}>
                  Best
                </Button>
                <Button w="full" value="hot" leftIcon={<CalendarIcon />}>
                  Hot
                </Button>
                <Button w="full" value="new" leftIcon={<TimeIcon />}>
                  New
                </Button>
                <Button w="full" value="top" leftIcon={<StarIcon />}>
                  Top
                </Button>
                <Button w="full" value="rising" leftIcon={<TriangleUpIcon />}>
                  Rising
                </Button>
              </VStack>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Drawer
        isOpen={isNavDrawerOpen}
        onClose={onNavDrawerClose}
        size="sm"
        placement="left"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack p="4">
              <HStack w="full">
                {me ? (
                  <>
                    <RedditAvatar username={me.name} />
                    <Text>{me.name}</Text>
                    <Spacer />
                    <Button
                      onClick={async () => {
                        setMe(null);
                        axios.post("/api/logout");
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      const { url } = getAuthRequestUrl(
                        isCompact,
                        router.asPath
                      );
                      router.push(url);
                    }}
                  >
                    Log In
                  </Button>
                )}
              </HStack>
              <ButtonGroup w="full" variant="ghost">
                <VStack>
                  <Button w="full">Home</Button>
                  <Button w="full">Popular</Button>
                  <Button w="full">All</Button>
                  <Button w="full">News</Button>
                </VStack>
              </ButtonGroup>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavBar;
