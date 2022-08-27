import { GetServerSideProps } from "next";
import { FC } from "react";

import NavBarFrame from "../../../../../../components/NavBarFrame";
import PageFrame from "../../../../../../components/PageFrame";
import PostAndComments from "../../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../../components/SubredditRules";
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
  const { data: about } = useReddit<RedditSubreddit>({
    method: "GET",
    path: `/r/${subreddit}/about`,
  });
  const { data: rules } = useReddit<RedditRules>({
    method: "GET",
    path: `/r/${subreddit}/about/rules`,
  });

  return (
    <NavBarFrame subreddit={subreddit}>
      <PageFrame
        top={
          <SubredditBanner
            showTitle={true}
            subreddit={subreddit}
            subredditAbout={about}
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
            <SubredditAbout rules={about} />
            <SubredditRules subredditRules={rules} />
          </>
        }
        showExplanation={false}
      />
    </NavBarFrame>
  );
};

export default ContinueThreadPage;
