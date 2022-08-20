import { Avatar, Box, Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import SanitizeHTML from "./SanitizeHTML";

type Props = { subreddit: any };

const Subreddit: FC<Props> = ({ subreddit }) => {
  return (
    <Box p="4">
      <NextLink href={`/r/${subreddit["data"]["display_name"]}`}>
        <Link>
          <Avatar
            name={"r /"}
            src={
              subreddit["data"]?.["community_icon"] ||
              subreddit["data"]?.["icon_img"]
            }
            size="sm"
          />
          <Heading>{subreddit["data"]["display_name"]}</Heading>
        </Link>
      </NextLink>
      <Box>
        <SanitizeHTML dirty={subreddit["data"]["public_description_html"]} />
      </Box>
    </Box>
  );
};

export default Subreddit;
