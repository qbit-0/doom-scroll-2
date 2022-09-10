import { GetServerSideProps } from "next";
import { FC } from "react";

import NavFrame from "../../../../../../components/NavFrame";
import PageFrame from "../../../../../../components/PageFrame";
import SubredditBanner from "../../../../../../components/SubredditBanner";
import AboutSubredditPanel from "../../../../../../components/panel/AboutSubredditPanel";
import SubredditRulesPanel from "../../../../../../components/panel/SubredditRulesPanel";
import PostAndComments from "../../../../../../components/PostAndComments";
import useReddit from "../../../../../../lib/hooks/useReddit";
import {
  RedditRules,
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
  const { data: subredditAbout } = useReddit<RedditSubreddit>({
    method: "GET",
    pathname: `/r/${subreddit}/about`,
  });
  const { data: subredditRules } = useReddit<RedditRules>({
    method: "GET",
    pathname: `/r/${subreddit}/about/rules`,
  });

  return (
    <NavFrame>
      <PageFrame
        topChildren={<SubredditBanner />}
        leftChildren={
          <PostAndComments article={article} commentId={commentId} />
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
  );
};

export default ContinueThreadPage;
