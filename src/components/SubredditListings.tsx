import { FC, useContext, useEffect, useState } from "react";

import { getSearchSubreddits } from "../lib/api/redditApi";
import { MeContext } from "../lib/context/MeProvider";
import useAtBottom from "../lib/hooks/useAtBottom";
import {
  RedditListing,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import PostSkeleton from "./PostSkeleton";
import Subreddit from "./Subreddit";

type Props = {
  searchQuery: string;
};

const SubredditListings: FC<Props> = ({ searchQuery }) => {
  const [subredditListings, setSubredditListings] = useState<
    RedditListing<RedditSubreddit>[] | null
  >(null);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useContext(MeContext);
  const atBottom = useAtBottom(0);

  useEffect(() => {
    (async () => {
      const subredditsResponse = await getSearchSubreddits(searchQuery);
      setSubredditListings([subredditsResponse.data]);
      setAfter(subredditsResponse.data.data.after);
    })();
  }, [me, searchQuery]);

  useEffect(() => {
    if (subredditListings && after && atBottom) {
      (async () => {
        const subredditsResponse = await getSearchSubreddits(
          searchQuery,
          after
        );
        setSubredditListings([...subredditListings, subredditsResponse.data]);
        setAfter(subredditsResponse.data.data.after);
      })();
    }
  }, [searchQuery, after, subredditListings, atBottom]);

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
