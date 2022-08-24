import axios from "axios";
import { GetServerSideProps } from "next";
import { FC, useEffect, useState } from "react";

import NavBarFrame from "../../../../../../components/NavBarFrame";
import PageFrame from "../../../../../../components/PageFrame";
import PostAndComments from "../../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../../components/SubredditRules";
import {
  RedditRule,
  RedditSubreddit,
} from "../../../../../../lib/reddit/redditDataStructs";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subreddit = context.query["subreddit"] || "";
  const article = context.query["article"] || "";
  const commentId = context.query["commentId"] || "";

  return {
    props: {
      subreddit: subreddit,
      article: article,
      commentId: commentId,
    },
  };
};

type Props = {
  article: string;
  subreddit: string;
  commentId: string;
};

const ContinueThreadPage: FC<Props> = ({ subreddit, article, commentId }) => {
  const [about, setAbout] = useState<RedditSubreddit | null>(null);
  const [rules, setRules] = useState<RedditRule | null>(null);

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
    <NavBarFrame subreddit={subreddit}>
      <PageFrame
        top={
          <SubredditBanner
            showTitle={true}
            subreddit={subreddit}
            about={about}
          />
        }
        left={
          <PostAndComments
            subreddit={subreddit}
            article={article}
            commentId={commentId}
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
  );
};

export default ContinueThreadPage;
