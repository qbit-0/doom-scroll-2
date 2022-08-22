import { GetServerSideProps } from "next";
import { FC } from "react";

import NavBarFrame from "../../../../../components/NavBarFrame";
import PageFrame from "../../../../../components/PageFrame";
import PostAndComments from "../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../components/SubredditRules";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subreddit = context.query["subreddit"] || "";
  const article = context.query["article"] || "";

  return {
    props: {
      subreddit: subreddit,
      article: article,
    },
  };
};

type Props = {
  article: string;
  subreddit: string;
};

const CommentsPage: FC<Props> = ({ article, subreddit }) => {
  return (
    <NavBarFrame subreddit={subreddit}>
      <PageFrame
        top={<SubredditBanner showTitle={true} subreddit={subreddit} />}
        left={<PostAndComments subreddit={subreddit} article={article} />}
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

export default CommentsPage;
