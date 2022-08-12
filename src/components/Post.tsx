import { Avatar, Box, Heading, Link, useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { getElapsedString } from "../lib/utils/getElapsedString";
import PostBody from "./PostBody";
import PostsAndCommentsModal from "./PostsAndCommentsModal";

type Props = {
  post: Record<string, any>;
  openModal?: boolean;
};

const Post: FC<Props> = ({ post, openModal = true }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [author, setAuthor] = useState<any>(null);
  const savedPath = router.asPath;

  useEffect(() => {
    (async () => {
      if (post["data"]["author"] !== "[deleted]") {
        const authorResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/user/${post["data"]["author"]}/about`,
        });
        setAuthor(authorResponse.data);
      }
    })();
  }, [post]);

  return (
    <>
      <Box borderWidth={1} borderColor="red">
        <Box>
          <NextLink href={`/r/${post["data"]["subreddit"]}`}>
            <Link size="sm">{post["data"]["subreddit_name_prefixed"]}</Link>
          </NextLink>
        </Box>
        <Box>
          <Avatar
            name={post["data"]["author"]}
            src={author?.["data"]["icon_img"]}
          />
          <Heading size="xs">
            u/{post["data"]["author"]}
            {" - " + getElapsedString(post["data"]["created_utc"])}
          </Heading>
        </Box>
        <Box>
          {openModal ? (
            <Link size="sm" onClick={onOpen}>
              <Heading>{post["data"]["title"]}</Heading>
            </Link>
          ) : (
            <NextLink href={post["data"]["permalink"]}>
              <Link size="sm">
                <Heading>{post["data"]["title"]}</Heading>
              </Link>
            </NextLink>
          )}
        </Box>
        <Box>{post["data"]["ups"]}</Box>
        <PostBody post={post} />
      </Box>
      <PostsAndCommentsModal
        post={post}
        isOpen={isOpen}
        onClose={() => {
          history.replaceState(null, "", savedPath);
          onClose();
        }}
      />
    </>
  );
};

export default Post;
