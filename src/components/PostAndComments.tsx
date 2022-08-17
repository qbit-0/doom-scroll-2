import axios from "axios";
import { FC, useEffect, useState } from "react";

import { getCommentsPath } from "../lib/utils/urlUtils";
import Card from "./Card";
import CommentSkeleton from "./CommentSkeleton";
import Comments from "./Comments";
import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

type Props = {
  subreddit?: string;
  article: string;
  initialPost?: any;
  initialComments?: any;
  openModal?: boolean;
};

const PostAndComments: FC<Props> = ({
  subreddit,
  article,
  initialPost,
  initialComments,
  openModal = true,
}) => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    (async () => {
      const { path, query, pathname } = getCommentsPath(subreddit, article);

      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });

      setPost(postsResponse.data[0]["data"]["children"][0]);
      setComments(postsResponse.data[1]);

      // if (location.pathname === pathname) {
      //   history.replaceState(
      //     null,
      //     "",
      //     getPathname(
      //       postsResponse.data[0]["data"]["children"][0]["data"]["permalink"],
      //       query
      //     )
      //   );
      // }
    })();
  }, [subreddit, article]);

  return (
    <>
      <Card>
        <Post initialPost={post} openModal={openModal} />
      </Card>
      <Card>
        <Comments postName={article} initialComments={comments} />
      </Card>
    </>
  );
};

export default PostAndComments;
