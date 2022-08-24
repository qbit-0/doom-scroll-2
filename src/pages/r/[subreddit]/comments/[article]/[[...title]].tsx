import { GetServerSideProps } from "next";
import { FC } from "react";

import NavBarFrame from "../../../../../components/NavBarFrame";
import PageFrame from "../../../../../components/PageFrame";
import PostAndComments from "../../../../../components/PostAndComments";
import SubredditAbout from "../../../../../components/SubredditAbout";
import SubredditBanner from "../../../../../components/SubredditBanner";
import SubredditRules from "../../../../../components/SubredditRules";
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
            about={about}
          />
        }
        left={<PostAndComments subreddit={subreddit} article={article} />}
        right={
          <>
            <SubredditAbout about={about} />
            <SubredditRules rules={rules} />
          </>
        }
      />
    </NavBarFrame>
  );
};

export default CommentsPage;
