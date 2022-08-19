import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSearchSubreddits } from "../lib/reddit/redditAxios";
import Card from "./Card";
import Subreddit from "./Subreddit";

type Props = {
  searchQuery: string;
  initialSubredditListings: any[];
  loadNext: boolean;
};

const SubredditsContainer: FC<Props> = ({
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
      const subredditResponse = await getSearchSubreddits(searchQuery);
      setSubredditListings([subredditResponse.data]);
      setAfter(subredditResponse.data["data"]["after"]);
    })();
  }, [me, searchQuery]);

  useEffect(() => {
    if (after && loadNext) {
      (async () => {
        console.log(loadNext);
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
    subredditListings.map((subreddits: any, listingIndex: number) => {
      return subreddits.data.children.map((subreddit: any, index: number) => (
        <Card key={listingIndex + index}>
          <Subreddit subreddit={subreddit} />
        </Card>
      ));
    })
  );
};

export default SubredditsContainer;
