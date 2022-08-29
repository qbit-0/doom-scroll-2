import { StackProps } from "@chakra-ui/react";
import { FC } from "react";

import useReddit from "../lib/hooks/useReddit";
import {
  RedditListing,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import Listing from "./Listing";
import PostSkeleton from "./PostSkeleton";
import Subreddit from "./Subreddit";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
} & StackProps;

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

  return (
    <Listing
      listing={subredditListing}
      createItem={(item: RedditSubreddit, index: number) => (
        <Subreddit subreddit={item} key={index} />
      )}
      createSkeleton={(index: number) => <PostSkeleton key={index} />}
      updateAfter={updateAfter}
      {...innerProps}
    />
  );
};

export default SubredditListing;
