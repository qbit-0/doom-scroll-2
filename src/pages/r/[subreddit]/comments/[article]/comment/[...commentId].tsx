import { GetServerSideProps } from "next";
import { FC } from "react";

import NavBarFrame from "../../../../../../components/NavBarFrame";
import PageFrame from "../../../../../../components/PageFrame";
import PostAndComments from "../../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../../components/SubredditRules";

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
  return (
    <NavBarFrame>
      <PageFrame
        top={<SubredditBanner showTitle={true} subreddit={subreddit} />}
        left={
          <PostAndComments
            subreddit={subreddit}
            article={article}
            commentId={commentId}
          />
        }
        right={
          <>
            <SubredditAbout subreddit={subreddit} />
            <SubredditRules subreddit={subreddit} />
          </>
        }
      />
    </NavBarFrame>
  );
};

export default ContinueThreadPage;
