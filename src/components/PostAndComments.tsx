import { Select } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEventHandler, FC, useEffect, useState } from "react";

import { buildUrlPath, getCommentsPath } from "../lib/utils/urlUtils";
import Comments from "./Comments";
import Post from "./Post";

type Props = {
  subreddit?: string;
  article: string;
  initialPost?: any;
  initialComments?: any;
};

const PostAndComments: FC<Props> = ({
  subreddit,
  article,
  initialPost,
  initialComments,
}) => {
  const [sort, setSort] = useState("best");
  const [post, setPost] = useState(initialPost);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    (async () => {
      const { path, query, fullpath } = getCommentsPath(
        subreddit,
        article,
        sort
      );
      history.pushState(null, "", fullpath);

      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });

      setPost(postsResponse.data[0]["data"]["children"][0]);
      setComments(postsResponse.data[1]);

      history.replaceState(
        null,
        "",
        buildUrlPath(
          postsResponse.data[0]["data"]["children"][0]["data"]["permalink"],
          query
        )
      );
    })();
  }, [subreddit, article, sort]);

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSort(event.target.value);
  };

  return (
    <>
      <Select value={sort} onChange={handleSortChange}>
        <option value="best">Best</option>
        <option value="top">Top</option>
        <option value="new">New</option>
        <option value="controversial">Controversial</option>
        <option value="old">Old</option>
        <option value="qa">Q&A</option>
      </Select>
      {post && <Post post={post} />}
      {comments && (
        <Comments postName={post["data"]["name"]} initialComments={comments} />
      )}
    </>
  );
};

export default PostAndComments;
