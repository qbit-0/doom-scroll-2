import { Box, Button, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { getAuthRequestUrl } from "../utils/reddit/redditOAuth";

type Props = {};

const NavBar: FC<Props> = (props) => {
  const router = useRouter();
  return (
    <Box bg="lightblue">
      <NextLink href={"/"}>
        <Link>Home</Link>
      </NextLink>
      <Button
        onClick={() => {
          router.push(getAuthRequestUrl(true));
        }}
      >
        Log In
      </Button>
      <Button>Log Out</Button>
    </Box>
  );
};

export default NavBar;
