import { FC, useEffect, useState } from "react";

import { getComments } from "../lib/reddit/redditClientApi";
import {
  RedditComment,
  RedditLink,
  RedditListing,
  RedditMore,
} from "../lib/reddit/redditDataStructs";
import Card from "./Card";
import Comments from "./Comments";
import Post from "./Post";

type Props = {
  article: string;
  initialPost?: RedditLink;
  initialComments?: RedditListing<RedditComment | RedditMore>;
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
      const commentsResponseData: [
        RedditListing<RedditLink>,
        RedditListing<RedditComment | RedditMore>
      ] = commentsResponse.data;
      setPost(commentsResponseData[0].data.children[0]);
      setComments(commentsResponseData[1]);

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
        <Post post={post} openModal={openModal} />
      </Card>
      <Card>
        <Comments initialComments={comments} article={article} />
      </Card>
    </>
  );
};

export default PostAndComments;
