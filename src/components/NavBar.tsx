import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
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
  Spacer,
  Text,
  VStack,
  chakra,
  useBoolean,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  useContext,
  useState,
} from "react";

import { SubredditContext } from "../lib/context/SubredditProvider";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import { getAuthRequestUrl } from "../lib/reddit/redditOAuth";
import RedditAvatar from "./RedditAvatar";

type Props = {
  additionalNav: React.ReactNode;
} & BoxProps;

const NavBar: FC<Props> = ({ additionalNav, ...innerProps }) => {
  const router = useRouter();
  const [me, setMe] = useLocalStorage("me");
  const { subreddit } = useContext(SubredditContext);

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
        <HStack w="full" p="2" bgColor="gray.800" {...innerProps}>
          <IconButton
            hidden={usingSearch}
            variant="ghost"
            rounded="full"
            icon={me ? <RedditAvatar username={me.name} /> : <HamburgerIcon />}
            aria-label={"open navigation drawer"}
            onClick={onNavDrawerOpen}
          />
          <Button
            hidden={usingSearch}
            rounded="full"
            onClick={handleSubredditButtonClick}
            display="inline"
          >
            {subreddit ? `r/${subreddit}` : "Home"}
          </Button>
          <Button
            hidden={hideNavButtons || usingSearch}
            rounded="full"
            onClick={() => {
              router.push("/r/popular");
            }}
          >
            Popular
          </Button>
          <Button
            hidden={hideNavButtons || usingSearch}
            rounded="full"
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
