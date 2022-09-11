import { FC, useContext } from "react";

import { SubredditContext } from "../lib/context/SubredditProvider";
import AboutAll from "./AboutAll";
import AboutHome from "./AboutHome";
import AboutPopular from "./AboutPopular";
import AboutSubreddit from "./AboutSr";
import SubredditRules from "./SrRules";

type Props = {};

const SrInfo: FC = () => {
  const { subreddit } = useContext(SubredditContext);

  switch (subreddit) {
    case undefined:
      return null;
    case "":
      return <AboutHome />;
    case "popular":
      return <AboutPopular />;
    case "all":
      return <AboutAll />;
    default:
      return (
        <>
          <AboutSubreddit />
          <SubredditRules />
        </>
      );
  }
};

export default SrInfo;
