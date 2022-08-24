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
import {
  RedditRule,
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
  const [about, setAbout] = useState<RedditSubreddit | null>(null);
  const [rules, setRules] = useState<RedditRule | null>(null);
  const atBottom = useAtBottom();

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

  useEffect(() => {
    if (subreddit)
      (async () => {
        const aboutResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/r/${subreddit}/about`,
        });
        setAbout(aboutResponse.data);
      })();
  }, [subreddit]);

  useEffect(() => {
    if (subreddit)
      (async () => {
        const rulesResponse = await axios.post("/api/reddit", {
          method: "GET",
          path: `/r/${subreddit}/about/rules`,
        });
        setRules(rulesResponse.data);
      })();
  }, [subreddit]);

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
        right={aboutDisplay}
        showExplanation={false}
      />
    </NavBarFrame>
  );
};

export default SubredditPage;
