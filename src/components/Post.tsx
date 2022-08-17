import { Box, Heading, Link, useDisclosure } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { getElapsedString } from "../lib/utils/getElapsedString";
import { getCommentsPath } from "../lib/utils/urlUtils";
import PostBody from "./PostBody";
import PostSkeleton from "./PostSkeleton";
import PostsAndCommentsModal from "./PostsAndCommentsModal";
import RedditAvatar from "./RedditAvatar";

type Props = {
  initialPost: Record<string, any>;
  openModal?: boolean;
};

const Post: FC<Props> = ({ initialPost, openModal = true }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const savedPath = router.asPath;
  const [post, setPost] = useState(initialPost);

  useEffect(() => {
    setPost(initialPost);
  }, [initialPost]);

  if (!post) {
    return (
      <Box>
        <PostSkeleton />
      </Box>
    );
  }

  return (
    <Box p="4">
      <NextLink href={`/r/${post["data"]["subreddit"]}`}>
        <Link size="sm">{post["data"]["subreddit_name_prefixed"]}</Link>
      </NextLink>
      <Box>
        <RedditAvatar username={post["data"]["author"]} />
        <Heading size="xs">
          u/{post["data"]["author"]}
          {" - " + getElapsedString(post["data"]["created_utc"])}
        </Heading>
      </Box>
      {openModal ? (
        <Link
          size="sm"
          onClick={() => {
            const { pathname } = getCommentsPath(
              post["data"]["subreddit"],
              post["data"]["id"]
            );
            history.replaceState(null, "", pathname);
            onOpen();
          }}
        >
          <Heading>{post["data"]["title"]}</Heading>
        </Link>
      ) : (
        <Link size="sm">
          <Heading>{post["data"]["title"]}</Heading>
        </Link>
      )}
      {post["data"]["ups"]}
      <PostBody post={post} />
      <PostsAndCommentsModal
        post={post}
        isOpen={isOpen}
        onClose={() => {
          history.replaceState(null, "", savedPath);
          onClose();
        }}
      />
    </Box>
  );
};

export default Post;
