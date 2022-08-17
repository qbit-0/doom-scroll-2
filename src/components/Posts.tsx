import { FC } from "react";

import Card from "./Card";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  postListings: any[];
};

const Posts: FC<Props> = ({ postListings }) => {
  const postsPlaceholder = [];
  for (let i = 0; i < 4; i++) {
    postsPlaceholder.push(
      <Card key={i}>
        <PostSkeleton />
      </Card>
    );
  }

  return (
    <>
      {postListings.length > 0
        ? postListings.map((posts: any, listingIndex: number) => {
            return posts.data.children.map((post: any, index: number) => (
              <Card key={listingIndex + index}>
                <Post initialPost={post} />
              </Card>
            ));
          })
        : postsPlaceholder}
    </>
  );
};

export default Posts;
