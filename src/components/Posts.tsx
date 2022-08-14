import { Button, VStack } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import Card from "./Card";
import Post from "./Post";

type Props = {
  path: string;
  query: Record<string, string>;
  initialPosts?: any;
};

const Posts: FC<Props> = ({ path, query, initialPosts }) => {
  const [postListings, setPostListings] = useState([initialPosts]);
  const [after, setAfter] = useState<string | null>(
    initialPosts["data"]["after"]
  );
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, path, query]);

  const handleClickMore = async () => {
    const postsResponse = await axios.post("/api/reddit", {
      method: "GET",
      path: path,
      query: {
        ...query,
        after: after,
      },
    });
    setPostListings([...postListings, postsResponse.data]);
    setAfter(postsResponse.data["data"]["after"]);
  };

  return (
    <VStack>
      {postListings.map((posts: any, listingIndex: number) => {
        return posts.data.children.map((post: any, index: number) => (
          <Card key={listingIndex + index}>
            <Post post={post} />
          </Card>
        ));
      })}
      {after && <Button onClick={handleClickMore}>more</Button>}
    </VStack>
  );
};

export default Posts;
