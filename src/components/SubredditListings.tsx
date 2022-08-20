import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSearchSubreddits } from "../lib/reddit/redditClientApi";
import Card from "./Card";
import Subreddit from "./Subreddit";

type Props = {
  searchQuery: string;
  initialSubredditListings: any[];
  loadNext: boolean;
};

const SubredditListings: FC<Props> = ({
  searchQuery,
  initialSubredditListings,
  loadNext,
}) => {
  const [subredditListings, setSubredditListings] = useState(
    initialSubredditListings
  );
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const subredditsResponse = await getSearchSubreddits(searchQuery);
      setSubredditListings([subredditsResponse.data]);
      setAfter(subredditsResponse.data["data"]["after"]);
    })();
  }, [me, searchQuery]);

  useEffect(() => {
    if (after && loadNext) {
      (async () => {
        const subredditsResponse = await getSearchSubreddits(
          searchQuery,
          after
        );
        setSubredditListings([...subredditListings, subredditsResponse.data]);
        setAfter(subredditsResponse.data["data"]["after"]);
      })();
    }
  }, [searchQuery, after, subredditListings, loadNext]);

  return (
    subredditListings.length > 0 &&
    subredditListings.map((subredditListing: any, listingIndex: number) => {
      return subredditListing.data.children.map(
        (subreddit: any, index: number) => (
          <Card key={listingIndex + index}>
            <Subreddit subreddit={subreddit} />
          </Card>
        )
      );
    })
  );
};

export default SubredditListings;
