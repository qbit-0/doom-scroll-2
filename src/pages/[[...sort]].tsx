import { GetServerSideProps } from "next";
import { FC } from "react";

import BrowseSubreddit from "../components/page/BrowseSubreddit";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sort = context.query["sort"]?.[0] || "best";
  const time = (context.query["t"] as string) || "day";

  return {
    props: {
      navProps: {
        sort,
        time,
      },
    },
  };
};

type NavProps = {
  sort: string;
  time: string;
};

type Props = {
  navProps: NavProps;
};

const HomePage: FC<Props> = ({ navProps }) => {
  return <BrowseSubreddit navProps={{ ...navProps, subreddit: "" }} />;
};

export default HomePage;
