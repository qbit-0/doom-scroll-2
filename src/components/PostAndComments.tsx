import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import Comments from "./Comments";
import Post from "./Post";

type Props = {
  subreddit: string;
  postId: string;
  initialPost?: any;
  initialComments?: any;
};

const PostAndComments: FC<Props> = ({
  subreddit,
  postId,
  initialPost,
  initialComments,
}) => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    (async () => {
      const path = `/r/${subreddit}/comments/${postId}`;

      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
      });

      setPost(postsResponse.data[0].data.children[0]);
      setComments(postsResponse.data[1]);
    })();
  }, [subreddit, postId]);

  return (
    <>
      {post && <Post post={post} />}
      {comments && <Comments initialComments={comments} />}
    </>
  );
};

export default PostAndComments;
