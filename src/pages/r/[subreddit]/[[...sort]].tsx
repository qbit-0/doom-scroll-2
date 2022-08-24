import {
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, HStack, Select } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import useSWR from "swr";

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
import useReddit from "../../../lib/hooks/useReddit";
import {
  RedditRules,
  RedditSubreddit,
} from "../../../lib/reddit/redditDataStructs";
import { getSubredditPath } from "../../../lib/reddit/redditUrlUtils";
import setValue from "../../../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSubreddit = context.query["subreddit"] || "";
  const initialSort = context.query["sort"] || "best";
  const initialTime = context.query["t"] || "day";

  return {
    props: {
      initialSubreddit: initialSubreddit,
      initialSort: initialSort,
      initialTime: initialTime,
    },
  };
};

type Props = {
  initialSubreddit: string;
  initialSort: string;
  initialTime: string;
};

const SubredditPage: FC<Props> = ({
  initialSubreddit,
  initialSort,
  initialTime,
}) => {
  const router = useRouter();
  const [subreddit, setSubreddit] = useState(initialSubreddit);
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);

  useEffect(() => {
    if (!subreddit || !sort || !time) return;
    history.replaceState(
      null,
      "",
      getSubredditPath(subreddit, sort, time).pathname
    );
  }, [subreddit, sort, time]);

  useEffect(() => {
    setSubreddit(initialSubreddit);
    setSort(initialSort);
    setTime(initialTime);
  }, [router, initialSubreddit, initialSort, initialTime]);

  const about = useReddit<RedditSubreddit>({
    method: "GET",
    path: `/r/${subreddit}/about`,
  });
  const rules = useReddit<RedditRules>({
    method: "GET",
    path: `/r/${subreddit}/about/rules`,
  });

  let top =
    subreddit === "popular" || subreddit === "all" ? null : (
      <SubredditBanner showTitle={true} subreddit={subreddit} about={about} />
    );

  let aboutDisplay;
  switch (subreddit) {
    case undefined:
      aboutDisplay = null;
      break;
    case "popular":
      aboutDisplay = <PopularAbout />;
      break;
    case "all":
      aboutDisplay = <AllAbout />;
      break;
    default:
      aboutDisplay = (
        <>
          <SubredditAbout about={about} />
          <SubredditRules rules={rules} />
        </>
      );
      break;
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
            />
          </>
        }
        right={aboutDisplay}
      />
    </NavBarFrame>
  );
};

export default SubredditPage;
