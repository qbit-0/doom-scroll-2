import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC } from "react";

import useReddit from "../lib/hooks/useReddit";
import {
  RedditLink,
  RedditRules,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import NavBarFrame from "./NavBarFrame";
import PageFrame from "./PageFrame";
import PostAndComments from "./PostAndComments";
import SubredditAbout from "./SubredditAbout";
import SubredditBanner from "./SubredditBanner";
import SubredditRules from "./SubredditRules";

type Props = {
  post: RedditLink;
  isOpen: boolean;
  onClose: () => void;
} & Omit<ModalProps, "children">;

const PostsAndCommentsModal: FC<Props> = ({
  post,
  isOpen,
  onClose,
  ...modalProps
}) => {
  const subreddit = post.data.subreddit;

  const { data: about } = useReddit<RedditSubreddit>({
    method: "GET",
    path: `/r/${subreddit}/about`,
  });
  const { data: rules } = useReddit<RedditRules>({
    method: "GET",
    path: `/r/${subreddit}/about/rules`,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" {...modalProps}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent mt="4">
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody zIndex={0} p="2">
          <NavBarFrame subreddit={subreddit}>
            <PageFrame
              top={
                <SubredditBanner subreddit={subreddit} subredditAbout={about} />
              }
              left={
                <PostAndComments
                  subreddit={subreddit}
                  article={post.data.id}
                  initialPost={post}
                  openModal={false}
                />
              }
              right={
                <>
                  <SubredditAbout subredditAbout={about} />
                  <SubredditRules subredditRules={rules} />
                </>
              }
              showExplanation={false}
            />
          </NavBarFrame>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostsAndCommentsModal;
