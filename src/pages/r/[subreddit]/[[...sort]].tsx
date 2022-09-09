import { GetServerSideProps } from "next";
import { FC } from "react";

import BrowseSubreddit from "../../../components/page/BrowseSubreddit";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const subreddit = context.query["subreddit"] || "";
  const sort = context.query["sort"]?.[0] || "hot";
  const time = context.query["t"] || "day";

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
  sort: string;
  time: string;
};

type Props = {
  navProps: NavProps;
};

const SubredditPage: FC<Props> = ({ navProps }) => {
  return <BrowseSubreddit navProps={navProps} />;
};

export default SubredditPage;
