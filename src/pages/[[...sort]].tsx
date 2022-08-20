import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, HStack, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../components/Card";
import HomeAbout from "../components/HomeAbout";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SubredditPostsListings from "../components/SubredditPostsListings";
import useAtBottom from "../lib/hooks/useAtBottom";
import { getSubredditPath } from "../lib/reddit/redditUrlUtils";
import setValue from "../lib/utils/setValue";

type Props = {};

const HomePage: FC<Props> = ({}) => {
  const router = useRouter();
  const [sort, setSort] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const atBottom = useAtBottom(0);

  useEffect(() => {
    if (!sort) setSort((router.query["sort"] as string) || "best");
    if (!time) setTime((router.query["t"] as string) || "day");
  }, [router.query, sort, time]);

  useEffect(() => {
    if (!sort || !time) return;
    router.push(getSubredditPath("", sort, time).pathname);
  }, [sort, time]);

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

  return (
    <NavBarFrame subreddit={null}>
      <PageFrame
        left={
          <>
            <Card>
              <HStack p="2">
                <Button
                  value="best"
                  leftIcon={<BellIcon />}
                  onClick={setValue(setSort)}
                >
                  Best
                </Button>
                <Button
                  value="hot"
                  leftIcon={<CalendarIcon />}
                  onClick={setValue(setSort)}
                >
                  Hot
                </Button>
                <Button
                  value="new"
                  leftIcon={<TimeIcon />}
                  onClick={setValue(setSort)}
                >
                  New
                </Button>
                <Button
                  value="top"
                  leftIcon={<StarIcon />}
                  onClick={setValue(setSort)}
                >
                  Top
                </Button>
                {sort === "top" && time && (
                  <Select w={32} value={time} onChange={setValue(setTime)}>
                    <option value="hour">Now</option>
                    <option value="day">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                    <option value="all">All Time</option>
                  </Select>
                )}
                <Button
                  value="rising"
                  leftIcon={<TriangleUpIcon />}
                  onClick={setValue(setSort)}
                >
                  Rising
                </Button>
              </HStack>
            </Card>
            <SubredditPostsListings
              subreddit={""}
              sort={sort}
              time={time}
              loadNext={atBottom}
            />
          </>
        }
        right={<HomeAbout />}
        showExplanation={true}
      />
    </NavBarFrame>
  );
};

export default HomePage;
