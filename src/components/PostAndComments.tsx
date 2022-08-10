import axios from "axios";
import React, { FC, useEffect, useState } from "react";

import Comments from "./Comments";
import Post from "./Post";

type Props = {
  path: string;
  query: any;
  initialPost?: any;
  initialComments?: any;
};

const PostAndComments: FC<Props> = ({
  path,
  query,
  initialPost,
  initialComments,
}) => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    (async () => {
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPost(postsResponse.data[0].data.children[0]);
      setComments(postsResponse.data[1]);
      history.pushState(null, post["data"]["title"], post["data"]["permalink"]);
    })();
  }, [path, query, post]);

  return (
    <>
      {post && <Post post={post} />}
      {comments && (
        <Comments postName={post["data"]["name"]} initialComments={comments} />
      )}
    </>
  );
};

export default PostAndComments;
