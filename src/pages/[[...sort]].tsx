import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../components/Card";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import HomeAbout from "../components/panel/AboutHomePanel";
import ButtonPanel from "../components/panel/ButtonPanel";
import SubredditPostsListings from "../components/panel_collection/SubredditPostsListings";
import { getSubredditPath } from "../lib/reddit/redditUrlUtils";
import setValue from "../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSort = context.query["sort"]?.[0] || "best";
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

  useEffect(() => {
    if (!sort || !time) return;
    router.replace(getSubredditPath("", sort, time).pathname);
  }, [sort, time]);

  useEffect(() => {
    setSort(initialSort);
    setTime(initialTime);
  }, [initialSort, initialTime]);

  return (
    <NavBarFrame subreddit={""}>
      <PageFrame
        top={null}
        left={
          <>
            <ButtonPanel>
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
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {time === "hour" && "Now"}
                    {time === "day" && "Today"}
                    {time === "week" && "This Week"}
                    {time === "month" && "This Month"}
                    {time === "year" && "This Year"}
                    {time === "all" && "All Time"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem value="hour" onClick={setValue(setTime)}>
                      Now
                    </MenuItem>
                    <MenuItem value="day" onClick={setValue(setTime)}>
                      Today
                    </MenuItem>
                    <MenuItem value="week" onClick={setValue(setTime)}>
                      This Week
                    </MenuItem>
                    <MenuItem value="month" onClick={setValue(setTime)}>
                      This Month
                    </MenuItem>
                    <MenuItem value="year" onClick={setValue(setTime)}>
                      This Year
                    </MenuItem>
                    <MenuItem value="all" onClick={setValue(setTime)}>
                      All Time
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
              <Button
                value="rising"
                isActive={sort === "rising"}
                leftIcon={<TriangleUpIcon />}
                onClick={setValue(setSort)}
              >
                Rising
              </Button>
            </ButtonPanel>
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
