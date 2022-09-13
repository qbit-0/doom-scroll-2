import { FC } from "react";

import { RedditLink } from "../../lib/reddit/redditDataStructs";
import { REDDIT_URL_PARAMS } from "../../lib/reddit/redditUrlParams";
import { getSearchPostsPath } from "../../lib/reddit/redditUrlUtils";
import Listing from "../Listing";
import Listings from "../Listings";
import Post from "../post/Post";
import PostSkeleton from "../post/PostSkeleton";

const SORT_VALUES = REDDIT_URL_PARAMS["/search"].sort;
const TIME_VALUES = REDDIT_URL_PARAMS["/search"].t;

type Props = {
  searchQuery: string;
  sort: typeof SORT_VALUES[number];
  time: typeof TIME_VALUES[number];
};

const SearchPostListings: FC<Props> = ({ searchQuery, sort, time }) => (
  <Listings
    createListing={(after, updateAfter) => {
      const { pathname, query } = getSearchPostsPath(
        searchQuery,
        sort,
        time,
        after
      );
      return (
        <Listing
          pathname={pathname}
          query={query}
          createItem={(item: RedditLink) => <Post post={item} />}
          createSkeleton={() => <PostSkeleton />}
          updateAfter={updateAfter}
        />
      );
    }}
  />
);

export default SearchPostListings;
