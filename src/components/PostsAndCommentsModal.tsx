import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

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
};

const PostsAndCommentsModal: FC<Props> = ({ post, isOpen, onClose }) => {
  const [about, setAbout] = useState<RedditSubreddit | undefined>(undefined);
  const [rules, setRules] = useState<RedditRules | undefined>(undefined);
  const subreddit = post.data.subreddit;

  useEffect(() => {
    if (subreddit)
      (async () => {
        const aboutResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/r/${subreddit}/about`,
        });
        setAbout(aboutResponse.data);
      })();
  }, [subreddit]);

  useEffect(() => {
    if (subreddit)
      (async () => {
        const rulesResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/r/${subreddit}/about/rules`,
        });
        setRules(rulesResponse.data);
      })();
  }, [subreddit]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      motionPreset="slideInBottom"
      scrollBehavior="outside"
    >
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent mt="0">
        <ModalBody p="2">
          <NavBarFrame subreddit={subreddit}>
            <PageFrame
              top={
                <SubredditBanner
                  showTitle={false}
                  subreddit={subreddit}
                  about={about}
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
                  <SubredditAbout about={about} />
                  <SubredditRules rules={rules} />
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
