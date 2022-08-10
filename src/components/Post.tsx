import { Box, Heading, Link, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC } from "react";

import PostAndCommentsModal from "./PostAndCommentsModal";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: Record<string, any>;
};

const Post: FC<Props> = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box borderWidth={1} borderColor="red">
        <Box>
          <NextLink href={`/r/${post["data"]["subreddit"]}`}>
            <Link size="sm">{post["data"]["subreddit"]}</Link>
          </NextLink>
        </Box>
        <Box>
          <Link size="sm" onClick={onOpen}>
            <Heading>{post["data"]["title"]}</Heading>
          </Link>
        </Box>
        <Box>{post["data"]["ups"]}</Box>
        <Box>
          <SanitizeHTML dirty={post["data"]["selftext_html"]} />
        </Box>
      </Box>

      <PostAndCommentsModal
        isOpen={isOpen}
        onClose={onClose}
        subreddit={post["data"]["subreddit"]}
        postId={post["data"]["id"]}
        initialPost={post}
      />
    </>
  );
};

export default Post;
