import {
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Flex, Select, VStack } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import Card from "../../../components/Card";
import Frame from "../../../components/Frame";
import PopularAbout from "../../../components/PopularAbout";
import Post from "../../../components/Post";
import useMe from "../../../lib/hooks/useMe";
import { redditApi } from "../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../lib/session/withSession";
import { getSubredditPath } from "../../../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const sort = (context.query["sort"] as string) || "hot";
    const time = (context.query["t"] as string) || "day";

    const { path, query } = getSubredditPath("popular", sort, time);

    const postsResponse = await redditApi(req, {
      method: "GET",
      path: path,
      query: query,
    });

    return {
      props: {
        initialSort: sort,
        initialTime: time,
        initialPosts: postsResponse.data,
      },
    };
  }
);

type Props = {
  initialSort: string;
  intialTime: string;
  initialPosts: any;
};

const SUBREDDIT = "popular";

const SubredditPage: FC<Props> = ({
  initialSort,
  intialTime,
  initialPosts,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState<string>(
    initialSort || (router.query["sort"] as string) || "hot"
  );
  const [time, setTime] = useState<string>(
    intialTime || (router.query["t"] as string) || "day"
  );
  const [postListings, setPostListings] = useState([initialPosts]);
  const [after, setAfter] = useState<string | null>(
    initialPosts["data"]["after"]
  );
  const { me } = useMe();

  useEffect(() => {
    history.replaceState(
      "",
      "",
      getSubredditPath(SUBREDDIT, sort, time).pathname
    );
  }, [sort, time]);

  useEffect(() => {
    router.events.on("routeChangeComplete", (url) => {
      const parsedUrl = new URL(url, "http://localhost:3000");
      const match = parsedUrl.pathname.match(/^\/(r\/(\w+)\/)?(?<sort>\w+)$/);
      const urlSort = (match && match?.groups?.["sort"]) || "hot";
      const urlTime = parsedUrl.searchParams.get("t") || "day";
      setSort(urlSort);
      setTime(urlTime);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const { path, query } = getSubredditPath(SUBREDDIT, sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, sort, time]);

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

  const handleClickMore = async () => {
    const { path, query } = getSubredditPath(SUBREDDIT, sort, time);
    const postsResponse = await axios.post("/api/reddit", {
      method: "GET",
      path: path,
      query: {
        ...query,
        after: after,
      },
    });
    setPostListings([...postListings, postsResponse.data]);
    setAfter(postsResponse.data["data"]["after"]);
  };

  return (
    <Frame>
      <Flex py="4" justify="center" columnGap={4}>
        <Box maxW="xl">
          <VStack>
            <Card>
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
            <VStack>
              {postListings.map((posts: any, listingIndex: number) => {
                return posts.data.children.map((post: any, index: number) => (
                  <Card key={listingIndex + index}>
                    <Post post={post} />
                  </Card>
                ));
              })}
              {after && <Button onClick={handleClickMore}>more</Button>}
            </VStack>
          </VStack>
        </Box>
        <Box maxW="sm">
          <VStack>
            <PopularAbout />
          </VStack>
        </Box>
      </Flex>
    </Frame>
  );
};

export default SubredditPage;
