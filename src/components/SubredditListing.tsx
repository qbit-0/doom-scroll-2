import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import {
  RedditListing,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import Subreddit from "./Subreddit";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
} & BoxProps;

const SubredditListing: FC<Props> = ({
  path,
  query,
  updateAfter,
  ...innerProps
}) => {
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
      <Box {...innerProps}>
        {new Array(4).fill(null).map((_, index: number) => {
          return <Subreddit key={index} />;
        })}
      </Box>
    );
  }

  return (
    <Box {...innerProps}>
      {subredditListing.data.children.map(
        (subreddit: RedditSubreddit, index: number) => (
          <Subreddit subreddit={subreddit} key={index} />
        )
      )}
    </Box>
  );
};

export default SubredditListing;
