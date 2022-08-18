import { Button, HStack, Select } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEventHandler, FC, useEffect, useState } from "react";

import Card from "../components/Card";
import PageFrame from "../components/PageFrame";
import Posts from "../components/Posts";
import useMe from "../lib/hooks/useMe";
import { withSessionSsr } from "../lib/session/withSession";
import { getSearchPath } from "../lib/utils/urlUtils";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const initialSearchQuery = context.query["q"] || "";
    const initialSort = context.query["sort"] || "best";
    const initalTime = context.query["t"] || "day";

    return {
      props: {
        initialSearchQuery: initialSearchQuery,
        initialSort: initialSort,
        initialTime: initalTime,
      },
    };
  }
);

type Props = {
  initialSearchQuery: string;
  initialSort: string;
  initialTime: string;
};

const SearchPage: FC<Props> = ({
  initialSearchQuery,
  initialSort,
  initialTime,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);
  const { me } = useMe();

  const [postListings, setPostListings] = useState<any[]>([]);
  const [after, setAfter] = useState<string | null>(null);

  useEffect(() => {
    (() => {
      router.push(getSearchPath(searchQuery, sort, time).pathname, undefined, {
        shallow: true,
      });
    })();
  }, [searchQuery, sort, time]);

  useEffect(() => {
    setSearchQuery((router.query["q"] as string) || "");
    setSort((router.query["sort"] as string) || "relevance");
    setTime((router.query["t"] as string) || "all");
  }, [router.query]);

  useEffect(() => {
    (async () => {
      const { path, query } = getSearchPath(searchQuery, sort, time);
      const postsResponse = await axios.post("/api/reddit", {
        method: "GET",
        path: path,
        query: query,
      });
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, searchQuery, sort, time]);

  const handleSortChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSort(event.target.value);
  };

  const handleTimeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTime(event.target.value);
  };

  const handleClickMore = async () => {
    const { path, query } = getSearchPath(searchQuery, sort, time);
    const postsResponse = await axios.post("/api/reddit", {
      method: "GET",
      path: path,
      query: {
        ...query,
        after: after,
      },
    });
    setPostListings([...postListings, postsResponse.data]);
    setAfter(postsResponse.data["data"]["after"]);
  };

  return (
    <PageFrame
      left={
        <>
          <Card>
            <HStack p="2">
              <Select value={sort} w="32" onChange={handleSortChange}>
                <option value="relevance">Relevance</option>
                <option value="hot">Hot</option>
                <option value="top">Top</option>k
                <option value="new">New</option>
                <option value="comments">Comments</option>
              </Select>
              <Select value={time} w="32" onChange={handleTimeChange}>
                <option value="all">All Time</option>
                <option value="year">Past Year</option>
                <option value="month">Past Month</option>
                <option value="week">Past Week</option>
                <option value="day">Past 24 Hours</option>
                <option value="hour">Past Hour</option>
              </Select>
            </HStack>
          </Card>
          <Posts postListings={postListings} />
          {after && <Button onClick={handleClickMore}>more</Button>}
        </>
      }
    />
  );
};

export default SearchPage;
