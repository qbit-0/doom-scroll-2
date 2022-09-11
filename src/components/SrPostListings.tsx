import { FC } from "react";

import { RedditLink } from "../lib/reddit/redditDataStructs";
import { REDDIT_URL_PARAMS } from "../lib/reddit/redditUrlParams";
import { getSubredditPath } from "../lib/reddit/redditUrlUtils";
import Listing from "./Listing";
import Listings from "./Listings";
import PostCard from "./post/Post";
import PostSkeleton from "./post/PostSkeleton";

const SORT_VALUES = REDDIT_URL_PARAMS["/[[...sort]]"].sort;
const TIME_VALUES = REDDIT_URL_PARAMS["/[[...sort]]"].t;

type Props = {
  subreddit: string;
  sort: typeof SORT_VALUES[number];
  time: typeof TIME_VALUES[number];
};

const PostListings: FC<Props> = ({ subreddit, sort, time }) => (
  <Listings
    createListing={(after, updateAfter) => {
      const { pathname, query } = getSubredditPath(
        subreddit,
        sort,
        time,
        after
      );
      return (
        <Listing
          pathname={pathname}
          query={query}
          createItem={(item: RedditLink) => <PostCard post={item} />}
          createSkeleton={() => <PostSkeleton />}
          updateAfter={updateAfter}
        />
      );
    }}
  />
);

export default PostListings;
