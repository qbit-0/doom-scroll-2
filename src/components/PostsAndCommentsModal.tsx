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

import SubredditProvider from "../lib/context/SubredditProvider";
import useReddit from "../lib/hooks/useReddit";
import {
  RedditLink,
  RedditRules,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import NavFrame from "./NavFrame";
import PageFrame from "./PageFrame";
import SubredditBanner from "./SubredditBanner";
import AboutSubredditPanel from "./panel/AboutSubredditPanel";
import SubredditRulesPanel from "./panel/SubredditRulesPanel";
import PostAndComments from "./panel_collection/PostAndComments";

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
    path: `/r/${subreddit}/about`,
  });
  const { data: subredditRules } = useReddit<RedditRules>({
    method: "GET",
    path: `/r/${subreddit}/about/rules`,
  });

  const hideModalHeader = useBreakpointValue({ base: true, lg: false });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={["md", "md", "xl", "3xl", "6xl"]}
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
                top={
                  <SubredditBanner
                    subreddit={subreddit}
                    subredditAbout={subredditAbout}
                  />
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
