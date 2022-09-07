import { StackProps } from "@chakra-ui/react";
import { FC } from "react";

import { getSubredditPath } from "../../lib/reddit/redditUrlUtils";
import Listings from "../Listings";
import PostListing from "../PostListing";

type Props = {
  subreddit: string;
  sort: string;
  time: string;
} & StackProps;

const SubredditPostsListings: FC<Props> = ({
  subreddit,
  sort,
  time,
  ...innerProps
}) => {
  return (
    <Listings
      createListing={(after, updateAfter, index) => {
        const { path, query } = getSubredditPath(subreddit, sort, time, after);
        return (
          <PostListing
            path={path}
            query={query}
            updateAfter={updateAfter}
            key={index}
          />
        );
      }}
      {...innerProps}
    />
  );
};

export default SubredditPostsListings;
