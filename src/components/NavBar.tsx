import { Box, Button, Link, Text } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useIsCompact from "../lib/hooks/useIsCompact";
import { getAuthRequestUrl } from "../lib/reddit/redditOAuth";

type Props = {};

const NavBar: FC<Props> = () => {
  const isCompact = useIsCompact();
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    setUsername(Cookies.get("username") as string);
  }, [setUsername]);

  const router = useRouter();
  return (
    <Box bg="lightblue">
      <NextLink href={"/"}>
        <Link>Home</Link>
      </NextLink>
      {username ? (
        <>
          <Text>{username}</Text>
          <Button
            onClick={async () => {
              await axios.post("/api/logout");
              Cookies.remove("username");
              router.reload();
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
    </Box>
  );
};

export default NavBar;
