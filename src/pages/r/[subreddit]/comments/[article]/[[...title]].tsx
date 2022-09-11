import { GetServerSideProps } from "next";
import { FC } from "react";

import Article from "../../../../../components/Article";
import SubredditBanner from "../../../../../components/SubredditBanner";
import AboutSubreddit from "../../../../../components/card/AboutSr";
import SubredditRules from "../../../../../components/card/SrRules";
import NavFrame from "../../../../../components/page/NavFrame";
import PageFrame from "../../../../../components/page/PageFrame";
import SubredditProvider from "../../../../../lib/context/SubredditProvider";
import useReddit from "../../../../../lib/hooks/useReddit";
import {
  RedditRules,
  RedditSubreddit,
} from "../../../../../lib/reddit/redditDataStructs";

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
  const { data: subredditAbout } = useReddit<RedditSubreddit>({
    method: "GET",
    pathname: `/r/${subreddit}/about`,
  });
  const { data: subredditRules } = useReddit<RedditRules>({
    method: "GET",
    pathname: `/r/${subreddit}/about/rules`,
  });

  return (
    <SubredditProvider
      subreddit={subreddit}
      initialSubredditAbout={subredditAbout}
      initialSubredditRules={subredditRules}
    >
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
