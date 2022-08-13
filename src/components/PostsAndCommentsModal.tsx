import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React, { FC } from "react";

import Frame from "./Frame";
import PostAndComments from "./PostAndComments";

type Props = {
  post: any;
  isOpen: boolean;
  onClose: () => void;
};

const PostsAndCommentsModal: FC<Props> = ({ post, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="6xl"
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
  );
};

export default PostsAndCommentsModal;
