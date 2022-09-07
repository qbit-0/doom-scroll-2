import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

import { RedditRules, RedditSubreddit } from "../reddit/redditDataStructs";

interface SubredditContextInterface {
  subreddit?: string;
  setSubreddit: Dispatch<SetStateAction<string | undefined>>;
  subredditAbout?: RedditSubreddit;
  setSubredditAbout: Dispatch<SetStateAction<RedditSubreddit | undefined>>;
  subredditRules?: RedditRules;
  setSubredditRules: Dispatch<SetStateAction<RedditRules | undefined>>;
}

export const SubredditContext = createContext({} as SubredditContextInterface);

type Props = {
  initialSubreddit?: string;
  initialSubredditAbout?: RedditSubreddit;
  initialSubredditRules?: RedditRules;
  children: React.ReactNode;
};

const SubredditProvider: FC<Props> = ({
  initialSubreddit,
  initialSubredditAbout,
  initialSubredditRules,
  children,
}) => {
  const [subreddit, setSubreddit] = useState<string | undefined>(
    initialSubreddit
  );
  const [subredditAbout, setSubredditAbout] = useState<
    RedditSubreddit | undefined
  >(initialSubredditAbout);
  const [subredditRules, setSubredditRules] = useState<RedditRules | undefined>(
    initialSubredditRules
  );

  useEffect(() => {
    setSubreddit(initialSubreddit);
  }, [initialSubreddit]);

  useEffect(() => {
    setSubredditAbout(initialSubredditAbout);
  }, [initialSubredditAbout]);

  useEffect(() => {
    setSubredditRules(initialSubredditRules);
  }, [initialSubredditRules]);

  return (
    <SubredditContext.Provider
      value={{
        subreddit,
        setSubreddit,
        subredditAbout,
        setSubredditAbout,
        subredditRules,
        setSubredditRules,
      }}
    >
      {children}
    </SubredditContext.Provider>
  );
};

export default SubredditProvider;
