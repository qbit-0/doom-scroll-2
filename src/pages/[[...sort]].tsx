import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, HStack, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";

import Card from "../components/Card";
import HomeAbout from "../components/HomeAbout";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SubredditPostsListings from "../components/SubredditPostsListings";
import NavBarContext from "../lib/context/NavBarContext";
import useAtBottom from "../lib/hooks/useAtBottom";
import { getSubredditPath } from "../lib/reddit/redditUrlUtils";
import setValue from "../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSort = context.query["sort"] || "best";
  const initialTime = context.query["t"] || "day";

  return {
    props: {
      initialSort: initialSort,
      initialTime: initialTime,
    },
  };
};

type Props = {
  initialSort: string;
  initialTime: string;
};

const HomePage: FC<Props> = ({ initialSort, initialTime }) => {
  const router = useRouter();
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);
  const atBottom = useAtBottom(0);

  useEffect(() => {
    history.replaceState(null, "", getSubredditPath("", sort, time).pathname);
  }, [sort, time]);

  useEffect(() => {
    setSort((router.query["sort"] as string) || "best");
    setTime((router.query["t"] as string) || "day");
  }, [router.query]);

  return (
    <NavBarFrame>
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
