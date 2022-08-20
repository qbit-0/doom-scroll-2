import {
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, HStack, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import AllAbout from "../../../components/AllAbout";
import Card from "../../../components/Card";
import NavBarFrame from "../../../components/NavBarFrame";
import PageFrame from "../../../components/PageFrame";
import PopularAbout from "../../../components/PopularAbout";
import SubredditAbout from "../../../components/SubredditAbout";
import SubredditBanner from "../../../components/SubredditBanner";
import SubredditPostsListings from "../../../components/SubredditPostsListings";
import SubredditRules from "../../../components/SubredditRules";
import useAtBottom from "../../../lib/hooks/useAtBottom";
import { getSubredditPath } from "../../../lib/reddit/redditUrlUtils";
import setValue from "../../../lib/utils/setValue";

type Props = {};

const SubredditPage: FC<Props> = ({}) => {
  const router = useRouter();
  const [subreddit, setSubreddit] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const atBottom = useAtBottom();

  useEffect(() => {
    if (!subreddit) setSubreddit((router.query["subreddit"] as string) || "");
    if (!sort) setSort((router.query["sort"] as string) || "best");
    if (!time) setTime((router.query["t"] as string) || "day");
  }, [router.query, subreddit, sort, time]);

  useEffect(() => {
    if (!subreddit || !sort || !time) return;
    router.push(getSubredditPath(subreddit, sort, time).pathname);
  }, [subreddit, sort, time]);

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

  let top =
    subreddit === "popular" || subreddit === "all" ? null : (
      <SubredditBanner showTitle={true} subreddit={subreddit} />
    );

  let about;
  switch (subreddit) {
    case undefined:
      about = null;
      break;
    case "popular":
      about = <PopularAbout />;
      break;
    case "all":
      about = <AllAbout />;
      break;
    default:
      about = (
        <>
          <SubredditAbout subreddit={subreddit} />
          <SubredditRules subreddit={subreddit} />
        </>
      );
  }

  return (
    <NavBarFrame subreddit={subreddit}>
      <PageFrame
        top={top}
        left={
          <>
            <Card>
              <HStack p="2">
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
                {sort === "top" && (
                  <Select value={time || "day"} onChange={setValue(setTime)}>
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
              subreddit={subreddit}
              sort={sort}
              time={time}
              loadNext={atBottom}
            />
          </>
        }
        right={about}
      />
    </NavBarFrame>
  );
};

export default SubredditPage;
