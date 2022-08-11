import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import Frame from "../../../components/Frame";
import PostAndComments from "../../../components/PostAndComments";
import { redditApi } from "../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../lib/session/withSession";
import { getCommentsPath } from "../../../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const article = context.query["article"] as string;
    const { path, query } = getCommentsPath(null, article);

    const postsResponse = await redditApi(req, {
      method: "GET",
      path: path,
      query: query,
    });
    return {
      props: {
        initialPost: postsResponse.data[0]["data"]["children"][0],
        initialComments: postsResponse.data[1],
      },
    };
  }
);

type Props = {
  initialPost: any;
  initialComments: any;
};

const CommentsNoSubredditPage: FC<Props> = ({
  initialPost,
  initialComments,
}) => {
  const router = useRouter();
  const article = router.query["article"] as string;

  return (
    <Frame>
      <PostAndComments
        article={article}
        initialPost={initialPost}
        initialComments={initialComments}
      />
    </Frame>
  );
};

export default CommentsNoSubredditPage;
