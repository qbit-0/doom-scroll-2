import { Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEventHandler, FC, useState } from "react";

import Frame from "../../../../../components/Frame";
import PostAndComments from "../../../../../components/PostAndComments";
import { redditApi } from "../../../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../../../lib/session/withSession";
import { getCommentsPath } from "../../../../../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const subreddit = context.query["subreddit"];
    const postId = context.query["postId"];

    const path = `/r/${subreddit}/comments/${postId}`;

    const postsResponse = await redditApi(req, {
      method: "GET",
      path: path,
    });
    return {
      props: {
        initialPost: postsResponse.data[0].data.children[0],
        initialComments: postsResponse.data[1],
      },
    };
  }
);

type Props = {
  initialPost: any;
  initialComments: any;
};

const CommentsPage: FC<Props> = ({ initialPost, initialComments }) => {
  const router = useRouter();
  const [sort, setSort] = useState("best");
  const subreddit = router.query["subreddit"] as string;
  const postId = router.query["postId"] as string;
  const { path, query } = getCommentsPath(subreddit, postId, sort);

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSort(event.target.value);
  };

  return (
    <Frame>
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
    </Frame>
  );
};

export default CommentsPage;
