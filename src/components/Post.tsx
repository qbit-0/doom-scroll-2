import { Box, Heading, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import NextLink from "next/link";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: Record<string, any>;
};

const Post: FC<Props> = ({ post }) => {
  const postData = post["data"];
  return (
    <Box borderWidth={1} borderColor="red">
      <Box>
        <NextLink href={`/r/${postData["subreddit"]}`}>
          <Link size="sm">{postData["subreddit"]}</Link>
        </NextLink>
      </Box>
      <Box>
        <NextLink href={`${postData["permalink"]}`}>
          <Link size="sm">
            <Heading>{postData["title"]}</Heading>
          </Link>
        </NextLink>
      </Box>
      <Box>{postData["ups"]}</Box>
      <Box>
        <SanitizeHTML dirty={postData["selftext_html"]} />
      </Box>
    </Box>
  );
};

export default Post;
