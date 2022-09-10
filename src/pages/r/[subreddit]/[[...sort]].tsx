import { GetServerSideProps } from "next";
import { FC } from "react";

import BrowseSubreddit from "../../../components/page/BrowseSubreddit";
import { REDDIT_URL_PARAMS } from "../../../lib/reddit/redditUrlParams";

const URL_SORT_VALUES = REDDIT_URL_PARAMS["/r/[subreddit]/[[...sort]]"].sort;
const URL_TIME_VALUES = REDDIT_URL_PARAMS["/r/[subreddit]/[[...sort]]"].t;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subreddit = context.query["subreddit"] || "";

  const sort = URL_SORT_VALUES.includes(context.query["sort"]?.[0] as any)
    ? (context.query["sort"]?.[0] as typeof URL_SORT_VALUES[number])
    : URL_SORT_VALUES[0];

  const time = URL_TIME_VALUES.includes(context.query["t"] as any)
    ? (context.query["t"] as typeof URL_TIME_VALUES[number])
    : URL_TIME_VALUES[0];

  return {
    props: {
      navProps: {
        subreddit,
        sort,
        time,
      },
    },
  };
};

type NavProps = {
  subreddit: string;
  sort: typeof URL_SORT_VALUES[number];
  time: typeof URL_TIME_VALUES[number];
};

type Props = {
  navProps: NavProps;
};

const SubredditPage: FC<Props> = ({ navProps }) => {
  return <BrowseSubreddit navProps={navProps} />;
};

export default SubredditPage;
