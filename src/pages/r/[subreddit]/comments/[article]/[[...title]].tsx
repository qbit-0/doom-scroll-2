import { Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import Frame from "../../../../../components/Frame";
import PostAndComments from "../../../../../components/PostAndComments";
import { redditApi } from "../../../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../../../lib/session/withSession";
import { getCommentsPath } from "../../../../../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const subreddit = context.query["subreddit"] as string;
    const article = context.query["article"] as string;
    const { path, query } = getCommentsPath(subreddit, article);

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

const CommentsPage: FC<Props> = ({ initialPost, initialComments }) => {
  const router = useRouter();
  const subreddit = router.query["subreddit"] as string;
  const article = router.query["article"] as string;

  return (
    <Frame>
      <Box maxWidth="2xl" mx="auto">
        <PostAndComments
          subreddit={subreddit}
          article={article}
          initialPost={initialPost}
          initialComments={initialComments}
        />
      </Box>
    </Frame>
  );
};

export default CommentsPage;
