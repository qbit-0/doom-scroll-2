import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { FC } from "react";

import PageFrame from "./PageFrame";
import PostAndComments from "./PostAndComments";
import SubredditAbout from "./SubredditAbout";
import SubredditBanner from "./SubredditBanner";
import SubredditRules from "./SubredditRules";

type Props = {
  post: any;
  isOpen: boolean;
  onClose: () => void;
};

const PostsAndCommentsModal: FC<Props> = ({ post, isOpen, onClose }) => {
  const subreddit = post["data"]["subreddit"];
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
          <PageFrame
            top={<SubredditBanner subreddit={subreddit} />}
            left={
              <PostAndComments
                subreddit={subreddit}
                article={post["data"]["id"]}
                initialPost={post}
                openModal={false}
              />
            }
            right={
              <>
                <SubredditAbout subreddit={subreddit} />
                <SubredditRules subreddit={subreddit} />
              </>
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostsAndCommentsModal;
