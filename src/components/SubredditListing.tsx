import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import {
  RedditLink,
  RedditListing,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import PostSkeleton from "./PostSkeleton";
import Subreddit from "./Subreddit";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
};

const SubredditListing: FC<Props> = ({ path, query, updateAfter }) => {
  const { data: subredditListing } = useReddit<RedditListing<RedditSubreddit>>({
    method: "GET",
    path,
    query,
  });

  useEffect(() => {
    if (subredditListing) updateAfter(subredditListing.data.after);
  }, [subredditListing]);

  if (!subredditListing) {
    return (
      <>
        {new Array(4).fill(null).map((_, index: number) => {
          return (
            <Card key={index}>
              <Subreddit />
            </Card>
          );
        })}
      </>
    );
  }

  return (
    <>
      {subredditListing.data.children.map(
        (subreddit: RedditSubreddit, index: number) => (
          <Card key={index}>
            <Subreddit subreddit={subreddit} />
          </Card>
        )
      )}
    </>
  );
};

export default SubredditListing;
