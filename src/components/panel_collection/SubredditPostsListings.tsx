import { StackProps } from "@chakra-ui/react";
import { FC, useContext } from "react";

import { SubredditContext } from "../../lib/context/SubredditProvider";
import { getSubredditPath } from "../../lib/reddit/redditUrlUtils";
import Listings from "../Listings";
import PostListing from "../PostListing";

type Props = {
  sort: string;
  time: string;
} & StackProps;

const SubredditPostsListings: FC<Props> = ({ sort, time, ...innerProps }) => {
  const { subreddit } = useContext(SubredditContext);

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
