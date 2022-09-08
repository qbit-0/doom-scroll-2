import { HamburgerIcon, LinkIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  BoxProps,
  BreadcrumbSeparator,
  Button,
  ButtonGroup,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spacer,
  StackDivider,
  Text,
  VStack,
  chakra,
  useBoolean,
  useBreakpointValue,
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

import { SubredditContext } from "../lib/context/SubredditProvider";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { getAuthRequestUrl } from "../lib/reddit/redditOAuth";
import Card from "./Card";
import RedditAvatar from "./RedditAvatar";

type Props = {
  additionalNav: React.ReactNode;
} & BoxProps;

const NavBar: FC<Props> = ({ additionalNav, ...innerProps }) => {
  const router = useRouter();
  const [me, setMe] = useLocalStorage("me");
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

  const [usingSearch, setUsingSearch] = useBoolean(false);

  const {
    isOpen: isNavDrawerOpen,
    onOpen: onNavDrawerOpen,
    onClose: onNavDrawerClose,
  } = useDisclosure();

  return (
    <>
      <nav>
        <Card
          p="2"
          borderTopWidth={0}
          borderLeftWidth={0}
          borderRightWidth={0}
          rounded="none"
          {...innerProps}
        >
          <HStack>
            <ButtonGroup overflowX="clip" variant="solid" isAttached>
              <IconButton
                hidden={usingSearch}
                roundedLeft="full"
                icon={
                  me ? <RedditAvatar username={me.name} /> : <HamburgerIcon />
                }
                aria-label={"open navigation drawer"}
                onClick={onNavDrawerOpen}
              />
              <Button
                hidden={usingSearch}
                pl="1"
                pr="4"
                rounded="full"
                onClick={handleSubredditButtonClick}
                display="inline"
              >
                <HStack w="full">
                  {subreddit === "" && <IoHome />}
                  {subreddit === "popular" && <IoTrendingUp />}
                  {subreddit === "all" && <IoStatsChart />}
                  {subreddit !== "" &&
                    subreddit !== "popular" &&
                    subreddit !== "all" && (
                      <Avatar
                        name="r /"
                        src={
                          subredditAbout?.data?.community_icon ||
                          subredditAbout?.data?.icon_img
                        }
                        size="sm"
                      />
                    )}
                  <Text overflowX="clip" textOverflow="ellipsis">
                    {subreddit === "" && "Home"}
                    {subreddit === "popular" && "Popular"}
                    {subreddit === "all" && "All"}
                    {subreddit !== "" &&
                      subreddit !== "popular" &&
                      subreddit !== "all" &&
                      subreddit}
                  </Text>
                </HStack>
              </Button>
            </ButtonGroup>
            <Button
              hidden={subreddit === "" || hideNavButtons || usingSearch}
              rounded="full"
              onClick={() => {
                router.push("/");
              }}
              leftIcon={<IoHome />}
            >
              Home
            </Button>
            <Button
              hidden={subreddit === "popular" || hideNavButtons || usingSearch}
              rounded="full"
              onClick={() => {
                router.push("/r/popular");
              }}
              leftIcon={<IoTrendingUp />}
            >
              Popular
            </Button>
            <Button
              hidden={subreddit === "all" || hideNavButtons || usingSearch}
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
                  minW="32"
                  placeholder="Search"
                  rounded="full"
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={setUsingSearch.on}
                  onBlur={setUsingSearch.off}
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
        </Card>
      </nav>
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
