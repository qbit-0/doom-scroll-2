import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Button, ButtonGroup, HStack, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../components/Card";
import HomeAbout from "../components/HomeAbout";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SubredditPostsListings from "../components/SubredditPostsListings";
import { getSubredditPath } from "../lib/reddit/redditUrlUtils";
import setValue from "../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSort = context.query["sort"]?.[0] || "best";
  const initialTime = context.query["t"]?.[0] || "day";

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

  useEffect(() => {
    if (!sort || !time) return;
    history.replaceState(null, "", getSubredditPath("", sort, time).pathname);
  }, [sort, time]);

  useEffect(() => {
    setSort(initialSort);
    setTime(initialTime);
  }, [router, initialSort, initialTime]);

  return (
    <NavBarFrame subreddit={""}>
      <PageFrame
        top={null}
        left={
          <>
            <Card p="0">
              <ButtonGroup w="full" variant="outline" p="2">
                <Button
                  value="best"
                  isActive={sort === "best"}
                  leftIcon={<BellIcon />}
                  onClick={setValue(setSort)}
                >
                  Best
                </Button>
                <Button
                  value="hot"
                  isActive={sort === "hot"}
                  leftIcon={<CalendarIcon />}
                  onClick={setValue(setSort)}
                >
                  Hot
                </Button>
                <Button
                  value="new"
                  isActive={sort === "new"}
                  leftIcon={<TimeIcon />}
                  onClick={setValue(setSort)}
                >
                  New
                </Button>
                <Button
                  value="top"
                  isActive={sort === "top"}
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
                  isActive={sort === "rising"}
                  leftIcon={<TriangleUpIcon />}
                  onClick={setValue(setSort)}
                >
                  Rising
                </Button>
              </ButtonGroup>
            </Card>
            <SubredditPostsListings subreddit={""} sort={sort} time={time} />
          </>
        }
        right={<HomeAbout />}
        showExplanation={true}
      />
    </NavBarFrame>
  );
};

export default HomePage;
