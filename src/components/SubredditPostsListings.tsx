import { FC, useEffect, useState } from "react";

import useAtBottom from "../lib/hooks/useAtBottom";
import { getSubredditPath } from "../lib/reddit/redditUrlUtils";
import PostListing from "./PostListing";

type Props = {
  subreddit: string;
  sort: string;
  time: string;
};

const SubredditPostsListings: FC<Props> = ({ subreddit, sort, time }) => {
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
    const { path, query } = getSubredditPath(subreddit, sort, time, afters[i]);
    pages.push(
      <PostListing
        path={path}
        query={query}
        updateAfter={genUpdateAfter(i)}
        key={i}
      />
    );
  }

  return <>{pages}</>;
};

export default SubredditPostsListings;
