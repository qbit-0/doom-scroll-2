import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, HStack, Select, StackDivider } from "@chakra-ui/react";
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

import Card from "../components/Card";
import HomeAbout from "../components/HomeAbout";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import Posts from "../components/Posts";
import useAtBottom from "../lib/hooks/useAtBottom";
import useMe from "../lib/hooks/useMe";
import { withSessionSsr } from "../lib/session/withSession";
import { getSubredditPath } from "../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const initialSort = context.query["sort"] || "best";
    const initialTime = context.query["t"] || "day";

    return {
      props: {
        initialSort,
        initialTime,
      },
    };
  }
);

type Props = {
  initialSort: string;
  initialTime: string;
};

const HomePage: FC<Props> = ({ initialSort, initialTime }) => {
  const router = useRouter();
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);

  const [postListings, setPostListings] = useState<any[]>([]);
  const [after, setAfter] = useState<string | null>(null);

  const { me } = useMe();
  const atBottom = useAtBottom(0);

  useEffect(() => {
    router.push(getSubredditPath("", sort, time).pathname);
  }, [sort, time]);

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
    (async () => {
      const { path, query } = getSubredditPath("", sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: { ...query },
      });
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, sort, time]);

  useEffect(() => {
    if (after && atBottom) {
      (async () => {
        console.log(atBottom);
        const { path, query } = getSubredditPath("", sort, time);
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
      })();
    }
  }, [after, postListings, sort, time, atBottom]);

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

  return (
    <NavBarFrame>
      <PageFrame
        left={
          <>
            <Card>
              <HStack p="2">
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
                  <Select w={32} value={time} onChange={handleTimeChange}>
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
              </HStack>
            </Card>
            <Posts postListings={postListings} />
          </>
        }
        right={<HomeAbout />}
        showExplanation={true}
      />
    </NavBarFrame>
  );
};

export default HomePage;
