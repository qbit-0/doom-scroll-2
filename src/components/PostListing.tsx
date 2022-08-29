import { StackProps } from "@chakra-ui/react";
import { FC } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditLink, RedditListing } from "../lib/reddit/redditDataStructs";
import Listing from "./Listing";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
} & StackProps;

const PostListing: FC<Props> = ({
  path,
  query,
  updateAfter,
  ...innerProps
}) => {
  const { data: postListing } = useReddit<RedditListing<RedditLink>>({
    method: "GET",
    path,
    query,
  });

  return (
    <Listing
      listing={postListing}
      createItem={(item: RedditLink, index: number) => (
        <Post post={item} key={index} />
      )}
      createSkeleton={(index: number) => <PostSkeleton key={index} />}
      updateAfter={updateAfter}
      {...innerProps}
    />
  );
};

export default PostListing;
