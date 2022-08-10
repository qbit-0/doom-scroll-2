import { Select } from "@chakra-ui/react";
import { ChangeEventHandler, FC, useState } from "react";

import { getCommentsPath } from "../lib/utils/urlUtils";
import Frame from "./Frame";
import PostAndComments from "./PostAndComments";

type Props = {
  subreddit: string;
  postId: string;
  initialPost?: any;
  initialComments?: any;
};

const PostAndCommentsContainer: FC<Props> = ({
  subreddit,
  postId,
  initialPost,
  initialComments,
}) => {
  const [sort, setSort] = useState("best");
  const { path, query } = getCommentsPath(subreddit, postId, sort);

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
      <PostAndComments
        path={path}
        query={query}
        initialPost={initialPost}
        initialComments={initialComments}
      />
    </>
  );
};

export default PostAndCommentsContainer;
