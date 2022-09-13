import { GetServerSideProps } from "next";
import { FC } from "react";

import AboutSubreddit from "../../../../../components/AboutSr";
import Article from "../../../../../components/Article";
import SubredditRules from "../../../../../components/SrRules";
import SubredditBanner from "../../../../../components/SubredditBanner";
import NavFrame from "../../../../../components/page/NavFrame";
import PageFrame from "../../../../../components/page/PageFrame";
import SubredditProvider from "../../../../../lib/context/SubredditProvider";

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
    <SubredditProvider subreddit={subreddit}>
      <NavFrame>
        <PageFrame
          topChildren={<SubredditBanner />}
          leftChildren={<Article article={article} />}
          rightChildren={
            <>
              <AboutSubreddit />
              <SubredditRules />
            </>
          }
        />
      </NavFrame>
    </SubredditProvider>
  );
};

export default CommentsPage;
