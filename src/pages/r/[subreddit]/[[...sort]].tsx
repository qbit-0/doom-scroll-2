import {
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, HStack, Select } from "@chakra-ui/react";
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
import SubredditPostsContainer from "../../../components/SubredditPostsContainer";
import SubredditRules from "../../../components/SubredditRules";
import useAtBottom from "../../../lib/hooks/useAtBottom";
import { getSubredditPath } from "../../../lib/reddit/redditUrlUtils";
import { withSessionSsr } from "../../../lib/session/withSession";
import setValue from "../../../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const subreddit = context.query["subreddit"];
    const initialSort = context.query["sort"] || "hot";
    const initalTime = context.query["t"] || "day";
    return {
      props: {
        subreddit: subreddit,
        initialSort: initialSort,
        initialTime: initalTime,
      },
    };
  }
);

type Props = {
  subreddit: string;
  initialSort: string;
  initialTime: string;
};

const SubredditPage: FC<Props> = ({ subreddit, initialSort, initialTime }) => {
  const router = useRouter();
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);
  const atBottom = useAtBottom();

  useEffect(() => {
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
                  <Select value={time} onChange={setValue(setTime)}>
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
            <SubredditPostsContainer
              subreddit={subreddit}
              sort={sort}
              time={time}
              initialPostListings={[]}
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
