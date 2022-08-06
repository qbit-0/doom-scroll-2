import { Box, Heading, Link } from "@chakra-ui/react";
import React, { FC } from "react";
import NextLink from "next/link";

type Props = {
  post: Record<string, any>;
};

const Post: FC<Props> = ({ post }) => {
  const postData = post["data"];
  return (
    <Box border="1px">
      <Box>
        <NextLink href={`r/${postData["subreddit"]}`}>
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
      <Box>{postData["selftext"]}</Box>
    </Box>
  );
};

export default Post;
