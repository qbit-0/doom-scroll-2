import { Box, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC } from "react";

import Frame from "../../../components/Frame";
import PostsContainer from "../../../components/PostsContainer";
import { redditApi } from "../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../lib/session/withSession";
import { getSubredditPath } from "../../../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const subreddit = context.query["subreddit"] as string;
    const sort = context.query["sort"] as string;
    const time = context.query["t"] as string;

    const { path, query } = getSubredditPath(subreddit, sort, time);

    const postsResponse = await redditApi(req, {
      method: "GET",
      path: path,
      query: query,
    });
    return {
      props: {
        initialPosts: postsResponse.data,
      },
    };
  }
);

type Props = {
  initialPosts: any;
};

const SubredditPage: FC<Props> = ({ initialPosts }) => {
  const router = useRouter();

  // useEffect(() => {
  //   router.events.on("routeChangeComplete", (url) => {
  //     const parsedUrl = new URL(url, "http://localhost:3000");
  //     const match = parsedUrl.pathname.match(/^\/(r\/(\w+)\/)?(?<sort>\w+)$/);
  //     const urlSort = (match && match?.groups?.["sort"]) || "best";
  //     const urlTime = parsedUrl.searchParams.get("t") || "day";
  //     setSort(urlSort);
  //     setTime(urlTime);
  //   });
  // }, []);

  const subreddit = router.query["subreddit"] as string;
  const sort = (router.query["sort"] as string) || "hot";
  const time = (router.query["t"] as string) || "day";

  return (
    <Frame>
      <Box>
        <Heading>{`r/${router.query["subreddit"]}`}</Heading>
      </Box>
      <PostsContainer
        subreddit={subreddit}
        initialSort={sort}
        initialTime={time}
        initialPosts={initialPosts}
      />
    </Frame>
  );
};

export default SubredditPage;
