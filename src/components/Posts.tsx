import { Button, Stack } from "@chakra-ui/react";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import useMe from "../lib/hooks/useMe";
import { getSubredditPath } from "../lib/utils/urlUtils";
import Post from "./Post";

type Props = {
  subreddit: string;
  sort: string;
  time: string;
  initialPosts?: any;
};

const Posts: FC<Props> = ({ subreddit, sort, time, initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const { path, query } = getSubredditPath(subreddit, sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPosts(postsResponse.data);
    })();
  }, [me, subreddit, sort, time]);

  return (
    <>
      <Stack>
        {posts.data.children.map((post: any, index: number) => (
          <Post post={post} key={index} />
        ))}
      </Stack>
      <Button>more</Button>
    </>
  );
};

export default Posts;
