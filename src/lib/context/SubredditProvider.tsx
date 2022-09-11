import { Dispatch, FC, SetStateAction, createContext, useEffect } from "react";

import useReddit from "../hooks/useReddit";
import { RedditRules, RedditSubreddit } from "../reddit/redditDataStructs";

interface SubredditContextInterface {
  subreddit: string | undefined;
  subredditAbout?: RedditSubreddit;
  subredditRules?: RedditRules;
}

export const SubredditContext = createContext({} as SubredditContextInterface);

const SUBREDDITS_WITHOUT_INFO = ["", "popular", "all"];

type Props = {
  subreddit?: string;
  children: React.ReactNode;
};

const SubredditProvider: FC<Props> = ({ subreddit, children }) => {
  const { data: subredditAbout } = useReddit<RedditSubreddit>(
    SUBREDDITS_WITHOUT_INFO.includes(subreddit || "")
      ? null
      : {
          method: "GET",
          pathname: `/r/${subreddit}/about`,
        }
  );
  const { data: subredditRules } = useReddit<RedditRules>(
    SUBREDDITS_WITHOUT_INFO.includes(subreddit || "")
      ? null
      : {
          method: "GET",
          pathname: `/r/${subreddit}/about/rules`,
        }
  );

  return (
    <SubredditContext.Provider
      value={{
        subreddit,
        subredditAbout,
        subredditRules,
      }}
    >
      {children}
    </SubredditContext.Provider>
  );
};

export default SubredditProvider;
