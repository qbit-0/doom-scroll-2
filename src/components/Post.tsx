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
import { FC } from "react";

import PostAndComments from "./PostAndComments";
import SanitizeHTML from "./SanitizeHTML";

type Props = {
  post: Record<string, any>;
};

const Post: FC<Props> = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = () => {
    history.pushState(null, post["data"]["title"], post["data"]["permalink"]);
    onOpen();
  };

  const closeModal = () => {
    history.back();
    onClose();
  };

  return (
    <>
      <Box borderWidth={1} borderColor="red">
        <Box>
          <NextLink href={`/r/${post["data"]["subreddit"]}`}>
            <Link size="sm">{post["data"]["subreddit"]}</Link>
          </NextLink>
        </Box>
        <Box>
          <Link size="sm" onClick={openModal}>
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
        onClose={closeModal}
        size="xl"
        motionPreset="slideInBottom"
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent>
          <ModalBody>
            <PostAndComments
              subreddit={post["data"]["subreddit"]}
              postId={post["data"]["id"]}
              postName={post["data"]["name"]}
              initialPost={post}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Post;
