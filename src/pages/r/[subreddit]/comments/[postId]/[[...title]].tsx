import { GetServerSideProps } from "next";
import { FC } from "react";

import Frame from "../../../../../components/Frame";
import PostAndCommentsContainer from "../../../../../components/PostAndCommentsContainer";
import { redditApi } from "../../../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../../../lib/session/withSession";

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
  return (
    <Frame>
      <PostAndCommentsContainer
        subreddit={initialPost["data"]["subreddit"]}
        postId={initialPost["data"]["postId"]}
        initialPost={initialPost}
        initialComments={initialComments}
      />
    </Frame>
  );
};

export default CommentsPage;
