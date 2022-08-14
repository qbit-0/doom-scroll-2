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
import Post from "../../../components/Post";
import SubredditAbout from "../../../components/SubredditAbout";
import SubredditBanner from "../../../components/SubredditBanner";
import SubredditRules from "../../../components/SubredditRules";
import useMe from "../../../lib/hooks/useMe";
import { redditApi } from "../../../lib/reddit/redditApi";
import { withSessionSsr } from "../../../lib/session/withSession";
import { getSubredditPath } from "../../../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const subreddit = context.query["subreddit"] as string;
    const sort = (context.query["sort"] as string) || "hot";
    const time = (context.query["t"] as string) || "day";

    const { path, query } = getSubredditPath(subreddit, sort, time);

    const [postsResponse, aboutResponse, rulesResponse] = await Promise.all([
      redditApi(req, {
        method: "GET",
        path: path,
        query: query,
      }),
      redditApi(req, {
        method: "GET",
        path: `/r/${subreddit}/about`,
      }),
      redditApi(req, {
        method: "GET",
        path: `/r/${subreddit}/about/rules`,
      }),
    ]);

    return {
      props: {
        initialSort: sort,
        initialTime: time,
        initialPosts: postsResponse.data,
        initialAbout: aboutResponse.data,
        initialRules: rulesResponse.data,
      },
    };
  }
);

type Props = {
  initialSort: string;
  intialTime: string;
  initialPosts: any;
  initialAbout: any;
  initialRules: any;
};

const SubredditPage: FC<Props> = ({
  initialSort,
  intialTime,
  initialPosts,
  initialAbout,
  initialRules,
}) => {
  const router = useRouter();
  const [about, setAbout] = useState<any | null>(initialAbout || null);
  const [rules, setRules] = useState<any | null>(initialRules || null);
  const [sort, setSort] = useState<string>(
    initialSort || (router.query["sort"] as string) || "hot"
  );
  const [time, setTime] = useState<string>(
    intialTime || (router.query["t"] as string) || "day"
  );
  const subreddit = router.query["subreddit"] as string;
  const [postListings, setPostListings] = useState([initialPosts]);
  const [after, setAfter] = useState<string | null>(
    initialPosts["data"]["after"]
  );
  const { me } = useMe();

  useEffect(() => {
    history.replaceState(
      "",
      "",
      getSubredditPath(subreddit, sort, time).pathname
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
      const aboutResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/r/${subreddit}/about`,
      });
      setAbout(aboutResponse.data);
    })();
  }, [subreddit]);

  useEffect(() => {
    (async () => {
      const rulesResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: `/r/${subreddit}/about/rules`,
      });
      setRules(rulesResponse.data);
    })();
  }, [subreddit]);

  useEffect(() => {
    (async () => {
      const { path, query } = getSubredditPath(subreddit, sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, subreddit, sort, time]);

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
    const { path, query } = getSubredditPath(subreddit, sort, time);
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
      <SubredditBanner about={about} />
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
            <SubredditAbout about={about} />
            <SubredditRules rules={rules} />
          </VStack>
        </Box>
      </Flex>
    </Frame>
  );
};

export default SubredditPage;
