import { GetServerSideProps } from "next";
import { FC } from "react";

import PageFrame from "../../../../../components/PageFrame";
import PostAndComments from "../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../components/SubredditRules";
import { withSessionSsr } from "../../../../../lib/session/withSession";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const subreddit = context.query["subreddit"];
    const article = context.query["article"] || "day";
    return {
      props: {
        subreddit: subreddit,
        article: article,
      },
    };
  }
);

type Props = {
  subreddit: string;
  article: string;
};

const CommentsPage: FC<Props> = ({ subreddit, article }) => {
  return (
    <PageFrame
      subreddit={subreddit}
      top={<SubredditBanner subreddit={subreddit} />}
      left={<PostAndComments subreddit={subreddit} article={article} />}
      right={
        <>
          <SubredditAbout subreddit={subreddit} />
          <SubredditRules subreddit={subreddit} />
        </>
      }
    />
  );
};

export default CommentsPage;
