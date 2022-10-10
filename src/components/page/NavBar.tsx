import { HamburgerIcon, LinkIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
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
  Spacer,
  Text,
  VStack,
  chakra,
  useBoolean,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useContext,
  useState,
} from "react";
import { IoHome, IoStatsChart, IoTrendingUp } from "react-icons/io5";

import { SubredditContext } from "../../lib/context/SubredditProvider";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import { RedditAccount } from "../../lib/reddit/redditDataStructs";
import { getAuthRequestUrl } from "../../lib/reddit/redditOAuth";
import RedditAvatar from "../reddit_basic/RedditAvatar";

type Props = {
  additionalNav: React.ReactNode;
};

const NavBar: FC<Props> = ({ additionalNav }) => {
  const router = useRouter();
  const [me, setMe] = useLocalStorage<RedditAccount["data"]>("me");
  const { subreddit, subredditAbout } = useContext(SubredditContext);

  const [search, setSearch] = useState<string>(
    (router.query["q"] as string) || ""
  );

  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const handleSearchSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (search) router.push(`/search?q=${search}`);
  };

  const handleSubredditButtonClick = () => {
    if (subreddit) {
      router.push(`/r/${subreddit}`);
    } else {
      router.push(`/`);
    }
  };

  const isCompact = useBreakpointValue({ base: true, md: false });
  const hideNavButtons = useBreakpointValue({ base: true, md: false });

  const [focusingSearch, setFocusingSearch] = useBoolean(false);

  const {
    isOpen: isNavDrawerOpen,
    onOpen: onNavDrawerOpen,
    onClose: onNavDrawerClose,
  } = useDisclosure();

  const bgColor = useColorModeValue("white", "gray.800");

  let locationAvatar;
  let locationText;
  switch (router.pathname) {
    // @ts-ignore
    case "/[[...sort]]":
    case "/r/[subreddit]/[[...sort]]":
    case "/r/[subreddit]/comments/[article]/[[...title]]":
    case "/r/[subreddit]/comment/[[...commentId]]":
      switch (subreddit) {
        case "":
          locationAvatar = <IoHome />;
          locationText = "Home";
          break;
        case "popular":
          locationAvatar = <IoTrendingUp />;
          locationText = "Popular";
          break;
        case "all":
          locationAvatar = <IoStatsChart />;
          locationText = "All";
          break;
        default:
          locationAvatar = (
            <Avatar
              name="r /"
              src={
                subredditAbout?.data?.community_icon ||
                subredditAbout?.data?.icon_img
              }
              size="sm"
            />
          );
          locationText = subreddit;
      }
      break;
    case "/search":
      locationAvatar = null;
      locationText = "Search";
  }

  return (
    <>
      <nav>
        <Box
          bgColor={bgColor}
          p="2"
          borderBottomWidth={1}
          borderBottomColor="gray.500"
        >
          <HStack>
            <ButtonGroup overflowX="clip" variant="solid" isAttached>
              <IconButton
                hidden={focusingSearch}
                roundedLeft="full"
                icon={
                  me ? <RedditAvatar username={me.name} /> : <HamburgerIcon />
                }
                aria-label={"open navigation drawer"}
                onClick={onNavDrawerOpen}
              />
              <Button
                hidden={focusingSearch}
                variant="outline"
                pl="1"
                rounded="full"
                onClick={handleSubredditButtonClick}
                display="inline"
              >
                <HStack w="full">
                  {locationAvatar}
                  <Text overflowX="clip" textOverflow="ellipsis">
                    {locationText}
                  </Text>
                </HStack>
              </Button>
            </ButtonGroup>
            <Button
              hidden={subreddit === "" || hideNavButtons || focusingSearch}
              rounded="full"
              variant="outline"
              onClick={() => {
                router.push("/");
              }}
              leftIcon={<IoHome />}
            >
              Home
            </Button>
            <Button
              hidden={
                subreddit === "popular" || hideNavButtons || focusingSearch
              }
              rounded="full"
              variant="outline"
              onClick={() => {
                router.push("/r/popular");
              }}
              leftIcon={<IoTrendingUp />}
            >
              Popular
            </Button>
            <Button
              hidden={subreddit === "all" || hideNavButtons || focusingSearch}
              variant="outline"
              rounded="full"
              onClick={() => {
                router.push("/r/all");
              }}
              leftIcon={<IoStatsChart />}
            >
              All
            </Button>
            <chakra.form flex="1" onSubmit={handleSearchSubmit}>
              <InputGroup>
                <Input
                  variant="filled"
                  minW="10"
                  placeholder="Search"
                  rounded="full"
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={setFocusingSearch.on}
                  onBlur={setFocusingSearch.off}
                />
                <InputRightElement>
                  <IconButton
                    icon={<SearchIcon />}
                    rounded="full"
                    aria-label={"search submit"}
                    type="submit"
                  />
                </InputRightElement>
              </InputGroup>
            </chakra.form>
            {additionalNav}
          </HStack>
        </Box>
      </nav>
      <Drawer
        isOpen={isNavDrawerOpen}
        onClose={onNavDrawerClose}
        size="xs"
        placement="left"
      >
        <DrawerContent>
          <Box p="4">
            <DrawerCloseButton />
          </Box>
          <DrawerBody>
            <VStack>
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
                <VStack w="full" alignItems="start">
                  <NextLink href={"/"}>
                    <Button leftIcon={<IoHome />}>Home</Button>
                  </NextLink>
                  <NextLink href={"/r/popular"}>
                    <Button leftIcon={<IoTrendingUp />}>Popular</Button>
                  </NextLink>
                  <NextLink href={"/r/all"}>
                    <Button leftIcon={<IoStatsChart />}>All</Button>
                  </NextLink>
                  <NextLink href={"/r/news"}>
                    <Button leftIcon={<LinkIcon />}>news</Button>
                  </NextLink>
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
