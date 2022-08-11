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
import NextLink from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import Frame from "./Frame";
import PostAndComments from "./PostAndComments";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: Record<string, any>;
};

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const savedPath = router.asPath;

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
              />
            </Frame>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Post;
