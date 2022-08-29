import { Box, BoxProps } from "@chakra-ui/react";
import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditAccount, RedditListing } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import Listing from "./Listing";
import PostSkeleton from "./PostSkeleton";
import User from "./User";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
} & BoxProps;

const UserListing: FC<Props> = ({
  path,
  query,
  updateAfter,
  ...innerProps
}) => {
  const { data: userListing } = useReddit<RedditListing<RedditAccount>>({
    method: "GET",
    path,
    query,
  });

  return (
    <Listing
      listing={userListing}
      createItem={(item: RedditAccount, index: number) => (
        <User user={item} key={index} />
      )}
      createSkeleton={(index: number) => <PostSkeleton key={index} />}
      updateAfter={updateAfter}
      {...innerProps}
    />
  );
};

export default UserListing;
