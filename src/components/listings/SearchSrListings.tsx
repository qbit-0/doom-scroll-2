import { FC } from "react";

import { RedditSubreddit } from "../../lib/reddit/redditDataStructs";
import { getSearchSubredditsPath } from "../../lib/reddit/redditUrlUtils";
import Listing from "../Listing";
import Listings from "../Listings";
import PostSkeleton from "../post/PostSkeleton";
import Subreddit from "../subreddit/Subreddit";

type Props = {
  searchQuery: string;
};

const SearchSrListings: FC<Props> = ({ searchQuery }) => (
  <Listings
    createListing={(after, updateAfter) => {
      const { pathname, query } = getSearchSubredditsPath(searchQuery, after);
      return (
        <Listing
          pathname={pathname}
          query={query}
          createItem={(item: RedditSubreddit) => <Subreddit subreddit={item} />}
          createSkeleton={() => <PostSkeleton />}
          updateAfter={updateAfter}
        />
      );
    }}
  />
);

export default SearchSrListings;
