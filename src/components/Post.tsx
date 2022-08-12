import {
  Box,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import { getElapsedString } from "../lib/utils/getElapsedString";
import CustomImage from "./CustomImage";
import Frame from "./Frame";
import PostAndComments from "./PostAndComments";
import SanitizeHTML from "./SanitizeHTML";

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
      const author = await axios.post("/api/reddit", {
        method: "GET",
        path: `/user/${post["data"]["author"]}/about`,
      });
      setAuthor(author.data);
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
          <CustomImage
            src={
              author?.["data"]["icon_img"] ||
              "https://www.redditstatic.com/avatars/defaults/v2/avatar_default_1.png"
            }
            alt="author"
            layout="fixed"
            width={32}
            height={32}
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
        <Box>
          <SanitizeHTML dirty={post["data"]["selftext_html"]} />
        </Box>
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          history.replaceState(null, "", savedPath);
          onClose();
        }}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalBody>
            <Frame>
              <PostAndComments
                subreddit={post["data"]["subreddit"]}
                article={post["data"]["id"]}
                initialPost={post}
                openModal={false}
              />
            </Frame>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Post;
