import { FC, useEffect } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditLink, RedditListing } from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import Post from "./Post";

type Props = {
  path: string;
  query: Record<string, string>;
  updateAfter: (after: string) => void;
};

const PostListing: FC<Props> = ({ path, query, updateAfter }) => {
  const postListing = useReddit<RedditListing<RedditLink>>({
    method: "GET",
    path,
    query,
  });

  useEffect(() => {
    if (postListing) updateAfter(postListing.data.after);
  }, [postListing]);

  if (!postListing) {
    return (
      <>
        {new Array(4).fill(null).map((_, index: number) => {
          return (
            <Card key={index}>
              <Post />
            </Card>
          );
        })}
      </>
    );
  }
  return (
    <>
      {postListing.data.children.map((post: RedditLink, index: number) => (
        <Card key={index}>
          <Post post={post} />
        </Card>
      ))}
    </>
  );
};

export default PostListing;
