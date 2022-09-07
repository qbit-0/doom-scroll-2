import {
  CalendarIcon,
  ChevronDownIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../../../components/Card";
import NavBarFrame from "../../../components/NavBarFrame";
import PageFrame from "../../../components/PageFrame";
import SubredditBanner from "../../../components/SubredditBanner";
import AboutAllPanel from "../../../components/panel/AboutAllPanel";
import AboutPopularPanel from "../../../components/panel/AboutPopularPanel";
import AboutSubredditPanel from "../../../components/panel/AboutSubredditPanel";
import SubredditRulesPanel from "../../../components/panel/SubredditRulesPanel";
import SubredditPostsListings from "../../../components/panel_collection/SubredditPostsListings";
import useReddit from "../../../lib/hooks/useReddit";
import {
  RedditRules,
  RedditSubreddit,
} from "../../../lib/reddit/redditDataStructs";
import { getSubredditPath } from "../../../lib/reddit/redditUrlUtils";
import setValue from "../../../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSubreddit = context.query["subreddit"] || "";
  const initialSort = context.query["sort"]?.[0] || "best";
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
    router.replace(getSubredditPath(subreddit, sort, time).pathname);
  }, [subreddit, sort, time]);

  useEffect(() => {
    setSubreddit(initialSubreddit);
    setSort(initialSort);
    setTime(initialTime);
  }, [initialSubreddit, initialSort, initialTime]);

  const { data: subredditAbout } = useReddit<RedditSubreddit>(
    subreddit === "popular" || subreddit === "all"
      ? null
      : {
          method: "GET",
          path: `/r/${subreddit}/about`,
        }
  );
  const { data: subredditRules } = useReddit<RedditRules>(
    subreddit === "popular" || subreddit === "all"
      ? null
      : {
          method: "GET",
          path: `/r/${subreddit}/about/rules`,
        }
  );

  let top =
    subreddit === "popular" || subreddit === "all" ? null : (
      <SubredditBanner subreddit={subreddit} subredditAbout={subredditAbout} />
    );

  let aboutDisplay;
  switch (subreddit) {
    case undefined:
      aboutDisplay = null;
      break;
    case "popular":
      aboutDisplay = <AboutPopularPanel />;
      break;
    case "all":
      aboutDisplay = <AboutAllPanel />;
      break;
    default:
      aboutDisplay = (
        <>
          <AboutSubredditPanel subredditAbout={subredditAbout} />
          <SubredditRulesPanel subredditRules={subredditRules} />
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
            <Card p="0">
              <ButtonGroup w="full" variant="outline" p="2">
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
                {sort === "top" && (
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
              </ButtonGroup>
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
