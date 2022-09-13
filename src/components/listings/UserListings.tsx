import { FC } from "react";

import { RedditAccount } from "../../lib/reddit/redditDataStructs";
import { getSearchUsersPath } from "../../lib/reddit/redditUrlUtils";
import Listing from "../Listing";
import Listings from "../Listings";
import PostSkeleton from "../post/PostSkeleton";
import User from "../user/User";

type Props = {
  searchQuery: string;
};

const UserListings: FC<Props> = ({ searchQuery }) => (
  <Listings
    createListing={(after, updateAfter) => {
      const { pathname, query } = getSearchUsersPath(searchQuery, after);
      return (
        <Listing
          pathname={pathname}
          query={query}
          createItem={(item: RedditAccount) => <User user={item} />}
          createSkeleton={() => <PostSkeleton />}
          updateAfter={updateAfter}
        />
      );
    }}
  />
);

export default UserListings;
