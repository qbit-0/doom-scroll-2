import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { mutate } from "swr";

import useIsCompact from "../lib/hooks/useIsCompact";
import useMe from "../lib/hooks/useMe";
import { getAuthRequestUrl } from "../lib/reddit/redditOAuth";

type Props = {};

const NavBar: FC<Props> = () => {
  const isCompact = useIsCompact();
  const router = useRouter();
  const { me } = useMe();

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

  return (
    <Box bg="lightblue">
      <Flex>
        <NextLink href={"/"}>
          <Link>DoomScroll</Link>
        </NextLink>
        <Spacer />
        {me ? (
          <>
            <Text>{me.name}</Text>
            <Button
              onClick={async () => {
                await axios.post("/api/logout");
                localStorage.removeItem("me");
                mutate("me");
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
      </Flex>

      <form onSubmit={handleSearchSubmit}>
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
      </form>
    </Box>
  );
};

export default NavBar;
