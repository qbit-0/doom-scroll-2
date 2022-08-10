import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Select } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

import { getSubredditPath } from "../lib/utils/urlUtils";
import Posts from "./Posts";

type Props = {
  subreddit: string;
  initialSort?: string;
  initialTime?: string;
  initialPosts: any;
};

const PostsContainer: FC<Props> = ({
  subreddit,
  initialSort,
  initialTime,
  initialPosts,
}) => {
  const router = useRouter();
  const [sort, setSort] = useState<string>(
    initialSort || subreddit === "" ? "best" : "hot"
  );
  const [time, setTime] = useState<string>(initialTime || "day");

  useEffect(() => {
    router.replace(
      getSubredditPath(subreddit, sort, time).fullpath,
      undefined,
      {
        shallow: true,
      }
    );
  }, [subreddit, sort, time]);

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

  const { path, query } = getSubredditPath(subreddit, sort, time);

  return (
    <>
      <Box>
        {!subreddit && (
          <Button leftIcon={<BellIcon />} onClick={getHandleSortClick("best")}>
            Best
          </Button>
        )}
        <Button leftIcon={<CalendarIcon />} onClick={getHandleSortClick("hot")}>
          Hot
        </Button>
        <Button leftIcon={<TimeIcon />} onClick={getHandleSortClick("new")}>
          New
        </Button>
        <Button leftIcon={<StarIcon />} onClick={getHandleSortClick("top")}>
          Top
        </Button>
        {sort === "top" && (
          <Select value={time} onChange={handleTimeChange}>
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
      </Box>

      <Posts path={path} query={query} initialPosts={initialPosts} />
    </>
  );
};

export default PostsContainer;
