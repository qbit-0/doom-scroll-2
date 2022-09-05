import { SearchIcon } from "@chakra-ui/icons";
import {
  BoxProps,
  Button,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  chakra,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

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

  return (
    <HStack w="full" p="2" bgColor="gray.800" {...innerProps}>
      <NextLink href={"/"}>
        <Button variant="link">DoomScroll</Button>
      </NextLink>
      <Button onClick={handleSubredditButtonClick} display="inline">
        {subreddit ? `r/${subreddit}` : "Home"}
      </Button>
      <chakra.form flex="auto" onSubmit={handleSearchSubmit}>
        <InputGroup>
          <Input
            variant="filled"
            placeholder="Search Reddit"
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
      <Button
        onClick={() => {
          router.push("/r/popular");
        }}
      >
        Popular
      </Button>
      <Button
        onClick={() => {
          router.push("/r/all");
        }}
      >
        All
      </Button>
      <Button
        onClick={() => {
          router.push("/r/news");
        }}
      >
        News
      </Button>
      {me ? (
        <>
          <RedditAvatar username={me.name} />
          <Text color="gray.100">{me.name}</Text>
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
            const { url } = getAuthRequestUrl(isCompact);
            router.push(url);
          }}
        >
          Log In
        </Button>
      )}
    </HStack>
  );
};

export default NavBar;
