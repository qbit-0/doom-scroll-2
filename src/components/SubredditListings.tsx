import { FC, useContext, useEffect, useState } from "react";

import { getSearchSubreddits } from "../lib/api/redditApi";
import { MeContext } from "../lib/context/MeProvider";
import useAtBottom from "../lib/hooks/useAtBottom";
import {
  RedditListing,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import { getSearchSubredditsPath } from "../lib/reddit/redditUrlUtils";
import Card from "./Card";
import PostSkeleton from "./PostSkeleton";
import Subreddit from "./Subreddit";
import SubredditListing from "./SubredditListing";

type Props = {
  searchQuery: string;
};

const SubredditListings: FC<Props> = ({ searchQuery }) => {
  const [pageCount, setPageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [afters, setAfters] = useState<Record<string, string>>({ "0": "" });
  const atBottom = useAtBottom(0);

  useEffect(() => {
    if (atBottom && !isLoading) {
      setPageCount(pageCount + 1);
      setIsLoading(true);
    }
  }, [atBottom, pageCount, isLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [afters]);

  const genUpdateAfter = (page: number) => {
    return (after: string) => {
      setAfters({ ...afters, [page + 1]: after });
    };
  };

  const pages: JSX.Element[] = [];
  for (let i = 0; i < pageCount; i++) {
    const { path, query } = getSearchSubredditsPath(searchQuery, afters[i]);
    pages.push(
      <SubredditListing
        path={path}
        query={query}
        updateAfter={genUpdateAfter(i)}
        key={i}
      />
    );
  }

  return <>{pages}</>;
};

export default SubredditListings;
