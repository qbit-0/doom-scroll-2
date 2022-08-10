import { Box, Select, Stack } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEventHandler, FC, useEffect, useState } from "react";

import Frame from "../components/Frame";
import Post from "../components/Post";
import Posts from "../components/Posts";
import useMe from "../lib/hooks/useMe";
import { redditApi } from "../lib/reddit/redditApi";
import { withSessionSsr } from "../lib/session/withSession";
import { getSearchPath } from "../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const { req } = context;

    const searchQuery = context.query["q"] as string;
    const sort = context.query["sort"] as string;
    const time = context.query["t"] as string;

    const { path, query } = getSearchPath(searchQuery, sort, time);

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

const SearchPage: FC<Props> = ({ initialPosts = {} }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<null | any>(initialPosts);

  const searchQuery = router.query["q"] as string;
  const [sort, setSort] = useState<string>("relevance");
  const [time, setTime] = useState<string>("all");

  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const { path, query } = getSearchPath(searchQuery, sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPosts(postsResponse.data);
    })();
  }, [me, searchQuery, sort, time]);

  useEffect(() => {
    (() => {
      router.push(getSearchPath(searchQuery, sort, time).fullpath, undefined, {
        shallow: true,
      });
    })();
  }, [searchQuery, sort, time]);

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSort(event.target.value);
  };

  const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTime(event.target.value);
  };

  const { path, query } = getSearchPath(searchQuery, sort, time);

  return (
    <Frame>
      <Box>
        <Select value={sort} onChange={handleSortChange}>
          <option value="relevance">Relevance</option>
          <option value="hot">Hot</option>
          <option value="top">Top</option>
          <option value="new">New</option>
          <option value="comments">Comments</option>
        </Select>
        <Select value={time} onChange={handleTimeChange}>
          <option value="all">All Time</option>
          <option value="year">Past Year</option>
          <option value="month">Past Month</option>
          <option value="week">Past Week</option>
          <option value="day">Past 24 Hours</option>
          <option value="hour">Past Hour</option>
        </Select>
      </Box>

      <Stack>
        {posts.data.children.map((post: any, index: number) => (
          <Post post={post} key={index} />
        ))}
      </Stack>

      <Posts path={path} query={query} initialPosts={initialPosts} />
    </Frame>
  );
};

export default SearchPage;
