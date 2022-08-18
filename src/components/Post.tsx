import {
  Avatar,
  Box,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Link,
  StackDivider,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";

import { getElapsedString } from "../lib/utils/getElapsedString";
import { getCommentsPath } from "../lib/utils/urlUtils";
import PostBody from "./PostBody";
import PostSkeleton from "./PostSkeleton";
import PostsAndCommentsModal from "./PostsAndCommentsModal";

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
    <>
      <Flex>
        <Box bgColor="red.100" w="18" flex="0 0 auto" p="4">
          <Text>{`${
            Number.parseFloat(post["data"]["upvote_ratio"]) * 100
          }%`}</Text>
          <Text>ratio</Text>
        </Box>
        <Box p="4" bgColor="blue.100" flex="1">
          <HStack>
            <Avatar
              name={post["data"]["subreddit"]}
              src={post["data"]["sr_detail"]["community_icon"]}
              size="sm"
            />
            <HStack display="inline" divider={<> &middot; </>}>
              <Heading size="sm" display="inline" color="red">
                <NextLink href={`/r/${post["data"]["subreddit"]}`}>
                  <Link size="sm">{post["data"]["subreddit"]}</Link>
                </NextLink>
              </Heading>
              <Heading size="sm" display="inline">
                {post["data"]["author"]}
              </Heading>
              <Heading size="sm" display="inline" color="gray">
                {getElapsedString(post["data"]["created_utc"])}
              </Heading>
            </HStack>
          </HStack>
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

          <PostBody post={post} />
        </Box>
      </Flex>
      <HStack
        px="4"
        py="2"
        bgColor="green.100"
        divider={<StackDivider borderColor="black" />}
      >
        <Box>
          <IconButton
            display="inline"
            icon={<Icon as={BiUpvote} />}
            aria-label="upvote"
          />
          <Text display="inline">{post["data"]["score"]}</Text>
          <IconButton
            display="inline"
            icon={<Icon as={BiDownvote} />}
            aria-label="downvote"
          />
        </Box>
        <Box>
          <Text display="inline">{`${post["data"]["num_comments"]}`}</Text>
          <IconButton
            display="inline"
            icon={<Icon as={IoChatboxOutline} />}
            aria-label="comments"
          />
        </Box>
      </HStack>
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
