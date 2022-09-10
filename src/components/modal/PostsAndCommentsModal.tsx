import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FC } from "react";

import SubredditProvider from "../../lib/context/SubredditProvider";
import useReddit from "../../lib/hooks/useReddit";
import {
  RedditLink,
  RedditRules,
  RedditSubreddit,
} from "../../lib/reddit/redditDataStructs";
import NavFrame from "../NavFrame";
import PageFrame from "../PageFrame";
import PostAndComments from "../PostAndComments";
import SubredditBanner from "../SubredditBanner";
import AboutSubredditPanel from "../panel/AboutSubredditPanel";
import SubredditRulesPanel from "../panel/SubredditRulesPanel";

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

  const { data: subredditAbout } = useReddit<RedditSubreddit>({
    method: "GET",
    pathname: `/r/${subreddit}/about`,
  });
  const { data: subredditRules } = useReddit<RedditRules>({
    method: "GET",
    pathname: `/r/${subreddit}/about/rules`,
  });

  const hideModalHeader = useBreakpointValue({ base: true, lg: false });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["md", "md", "xl", "3xl", "6xl"]}
      motionPreset="none"
      {...modalProps}
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent mt={["0", "0", "0", "4"]}>
        <ModalHeader p="6" hidden={hideModalHeader}>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody p="0">
          <SubredditProvider
            initialSubreddit={subreddit}
            initialSubredditAbout={subredditAbout}
            initialSubredditRules={subredditRules}
          >
            <NavFrame>
              <PageFrame
                topChildren={<SubredditBanner />}
                leftChildren={
                  <PostAndComments
                    article={post.data.id}
                    initialPost={post}
                    openModal={false}
                  />
                }
                rightChildren={
                  <>
                    <AboutSubredditPanel />
                    <SubredditRulesPanel />
                  </>
                }
                showExplanation={false}
              />
            </NavFrame>
          </SubredditProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostsAndCommentsModal;
