import { Box, Button, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useMeContext } from "../utils/context/MeContext";
import { getAuthRequestUrl } from "../utils/reddit/redditOAuth";

type Props = {};

const NavBar: FC<Props> = () => {
  const meContext = useMeContext();
  const { me } = meContext;

  const router = useRouter();
  return (
    <Box bg="lightblue">
      <NextLink href={"/"}>
        <Link>Home</Link>
      </NextLink>
      {me ? (
        <>
          <Text>{me["name"]}</Text>
          <Button onClick={() => {
            router.reload();
          }}>Log Out</Button>
        </>
      ) : (
        <Button
          onClick={() => {
            router.push(getAuthRequestUrl(true));
          }}
        >
          Log In
        </Button>
      )}
    </Box>
  );
};

export default NavBar;
