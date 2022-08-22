import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSearchSubreddits } from "../lib/reddit/redditClientApi";
import {
  RedditListing,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import PostSkeleton from "./PostSkeleton";
import Subreddit from "./Subreddit";

type Props = {
  searchQuery: string;
  loadNext: boolean;
};

const SubredditListings: FC<Props> = ({ searchQuery, loadNext }) => {
  const [subredditListings, setSubredditListings] = useState<
    RedditListing<RedditSubreddit>[] | null
  >(null);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const subredditsResponse = await getSearchSubreddits(searchQuery);
      setSubredditListings([subredditsResponse.data]);
      setAfter(subredditsResponse.data.data.after);
    })();
  }, [me, searchQuery]);

  useEffect(() => {
    if (subredditListings && after && loadNext) {
      (async () => {
        const subredditsResponse = await getSearchSubreddits(
          searchQuery,
          after
        );
        setSubredditListings([...subredditListings, subredditsResponse.data]);
        setAfter(subredditsResponse.data.data.after);
      })();
    }
  }, [searchQuery, after, subredditListings, loadNext]);

  if (!subredditListings) {
    return (
      <>
        {new Array(4).fill(null).map((_, index: number) => {
          return (
            <Card key={index}>
              <PostSkeleton />
            </Card>
          );
        })}
      </>
    );
  }

  if (subredditListings.length == 0) {
    return null;
  }

  return (
    <>
      {subredditListings.reduce(
        (
          flattenedSubreddits: JSX.Element[],
          subredditListing: RedditListing<RedditSubreddit>,
          listingIndex: number
        ) => {
          return [
            ...flattenedSubreddits,
            ...subredditListing.data.children.map(
              (subreddit: RedditSubreddit, index: number) => (
                <Card key={listingIndex + " " + index}>
                  <Subreddit subreddit={subreddit} />
                </Card>
              )
            ),
          ];
        },
        []
      )}
    </>
  );
};

export default SubredditListings;
