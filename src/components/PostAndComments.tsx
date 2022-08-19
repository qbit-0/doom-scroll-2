import { FC, useEffect, useState } from "react";

import { getComments } from "../lib/reddit/redditAxios";
import Card from "./Card";
import Comments from "./Comments";
import Post from "./Post";

type Props = {
  article: string;
  initialPost?: any;
  initialComments?: any;
  openModal?: boolean;
};

const PostAndComments: FC<Props> = ({
  article,
  initialPost,
  initialComments,
  openModal = true,
}) => {
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    (async () => {
      const commentsResponse = await getComments(article);
      setPost(commentsResponse.data[0]["data"]["children"][0]);
      setComments(commentsResponse.data[1]);

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
  }, [article]);

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
