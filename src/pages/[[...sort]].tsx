import {
  BellIcon,
  CalendarIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import { Box, Button, Select, Stack } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import Layout from "../components/Layout";
import Post from "../components/Post";
import useMe from "../lib/hooks/useMe";
import { redditApi } from "../lib/reddit/redditApi";
import { withSessionSsr } from "../lib/session/withSession";
import buildUrlPath from "../lib/utils/buildUrlPath";

const getHomePath = (sort: string, time: string) => {
  sort = sort || "best";
  time = time || "day";

  let path = "/";
  if (sort !== "best") path += sort;

  const query: Record<string, string> = {};
  if (sort === "top" && time) query["t"] = time;

  const fullpath = buildUrlPath(path, query);
  return { path, query, fullpath };
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const sort = context.query["sort"] as string;
    const time = context.query["t"] as string;

    const { path, query } = getHomePath(sort, time);

    const postsResponse = await redditApi(req, {
      method: "GET",
      path: path,
      query: query,
    });
    return {
      props: {
        initialPosts: postsResponse.data,
      },
    };
  }
);

type Props = {
  initialPosts: any;
};

const Home: FC<Props> = ({ initialPosts = {} }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<null | any>(initialPosts);
  const [sort, setSort] = useState<string>("best");
  const [time, setTime] = useState<string>("day");
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const { path, query } = getHomePath(sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPosts(postsResponse.data);
    })();
  }, [me, sort, time]);

  useEffect(() => {
    (() => {
      router.push(getHomePath(sort, time).fullpath, undefined, {
        shallow: true,
      });
    })();
  }, [sort, time]);

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

  return (
    <Layout>
      <Box>
        <Button leftIcon={<BellIcon />} onClick={getHandleSortClick("best")}>
          Best
        </Button>
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

      <Stack>
        {posts.data.children.map((post: any, index: number) => (
          <Post post={post} key={index} />
        ))}
      </Stack>
      <Button>more</Button>
    </Layout>
  );
};

export default Home;
