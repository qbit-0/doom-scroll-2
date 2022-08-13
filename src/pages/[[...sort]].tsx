import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Select, VStack } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import Card from "../components/Card";
import Frame from "../components/Frame";
import HomeAbout from "../components/HomeAbout";
import Posts from "../components/Posts";
import { redditApi } from "../lib/reddit/redditApi";
import { withSessionSsr } from "../lib/session/withSession";
import { getSubredditPath } from "../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const sort = (context.query["sort"] as string) || "best";
    const time = (context.query["t"] as string) || "day";

    const { path, query } = getSubredditPath("", sort, time);

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

const HomePage: FC<Props> = ({ initialPosts }) => {
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

  const router = useRouter();
  const [sort, setSort] = useState<string>(
    (router.query["sort"] as string) || "best"
  );
  const [time, setTime] = useState<string>(
    (router.query["t"] as string) || "day"
  );

  useEffect(() => {
    history.replaceState(null, "", getSubredditPath("", sort, time).pathname);
  }, [sort, time]);

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

  const { path, query } = getSubredditPath("", sort, time);

  return (
    <Frame>
      <Flex py="4" justify="center" columnGap={4}>
        <Box maxWidth="xl">
          <VStack>
            <Card>
              <Button
                leftIcon={<BellIcon />}
                onClick={getHandleSortClick("best")}
              >
                Best
              </Button>
              <Button
                leftIcon={<CalendarIcon />}
                onClick={getHandleSortClick("hot")}
              >
                Hot
              </Button>
              <Button
                leftIcon={<TimeIcon />}
                onClick={getHandleSortClick("new")}
              >
                New
              </Button>
              <Button
                leftIcon={<StarIcon />}
                onClick={getHandleSortClick("top")}
              >
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
            </Card>
            <Posts path={path} query={query} initialPosts={initialPosts} />
          </VStack>
        </Box>
        <Box maxW="sm">
          <VStack>
            <HomeAbout />
          </VStack>
        </Box>
      </Flex>
    </Frame>
  );
};

export default HomePage;
