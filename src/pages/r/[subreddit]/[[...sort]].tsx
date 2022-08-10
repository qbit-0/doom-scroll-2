import {
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Heading, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import Frame from "../../../components/Frame";
import Posts from "../../../components/Posts";
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

  const subreddit = router.query["subreddit"] as string;
  const [sort, setSort] = useState<string>(
    (router.query["sort"] as string) || "hot"
  );
  const [time, setTime] = useState<string>(
    (router.query["t"] as string) || "day"
  );

  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      const parsedUrl = new URL(url, "http://localhost:3000");
      const match = parsedUrl.pathname.match(/^\/(r\/(\w+)\/)?(?<sort>\w+)$/);
      const urlSort = (match && match?.groups?.["sort"]) || "best";
      const urlTime = parsedUrl.searchParams.get("t") || "day";
      setSort(urlSort);
      setTime(urlTime);
    });
  }, []);

  useEffect(() => {
    router.replace(
      getSubredditPath(subreddit, sort, time).fullpath,
      undefined,
      {
        shallow: true,
      }
    );
  }, [subreddit, sort, time]);

  const getHandleSortClick = (sortValue: string) => {
    const handleSortClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.preventDefault();
      setSort(sortValue);
    };
    return handleSortClick;
  };

  const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTime(event.target.value);
  };

  const { path, query } = getSubredditPath(subreddit, sort, time);

  return (
    <Frame>
      <Box>
        <Heading>{`r/${router.query["subreddit"]}`}</Heading>
      </Box>
      <Box>
        <Button leftIcon={<CalendarIcon />} onClick={getHandleSortClick("hot")}>
          Hot
        </Button>
        <Button leftIcon={<TimeIcon />} onClick={getHandleSortClick("new")}>
          New
        </Button>
        <Button leftIcon={<StarIcon />} onClick={getHandleSortClick("top")}>
          Top
        </Button>
        {sort === "top" && (
          <Select value={time} onChange={handleTimeChange}>
            <option value="hour">Now</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </Select>
        )}
        <Button
          leftIcon={<TriangleUpIcon />}
          onClick={getHandleSortClick("rising")}
        >
          Rising
        </Button>
      </Box>

      <Posts path={path} query={query} initialPosts={initialPosts} />
    </Frame>
  );
};

export default SubredditPage;
