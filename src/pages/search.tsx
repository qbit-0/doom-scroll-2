import { Button, HStack, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";

import Card from "../components/Card";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SearchPostsListings from "../components/SearchPostsListings";
import SubredditListings from "../components/SubredditListings";
import UserListings from "../components/UsersListings";
import { NavBarContext } from "../lib/context/NavBarContext";
import useAtBottom from "../lib/hooks/useAtBottom";
import { getSearchPath } from "../lib/reddit/redditUrlUtils";
import setValue from "../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSearchQuery = context.query["q"] || "";
  const initialSort = context.query["sort"] || "relevance";
  const initialTime = context.query["t"] || "all";
  const initialType = context.query["type"] || "link";

  return {
    props: {
      initialSearchQuery: initialSearchQuery,
      initialSort: initialSort,
      initialTime: initialTime,
      intialType: initialType,
    },
  };
};

type Props = {
  initialSearchQuery: string;
  initialSort: string;
  initialTime: string;
  initialType: string;
};

const SearchPage: FC<Props> = ({
  initialSearchQuery,
  initialSort,
  initialTime,
  initialType,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);
  const [type, setType] = useState<string>(initialType);
  const atBottom = useAtBottom();

  const { setNavBarSubreddit } = useContext(NavBarContext);
  setNavBarSubreddit("");

  useEffect(() => {
    history.replaceState(
      null,
      "",
      getSearchPath(searchQuery, sort, time, type).pathname
    );
  }, [searchQuery, sort, time, type]);

  useEffect(() => {
    setSearchQuery((router.query["q"] as string) || "");
    setSort((router.query["sort"] as string) || "relevance");
    setTime((router.query["t"] as string) || "all");
    setType((router.query["type"] as string) || "link");
  }, [router.query]);

  let content;
  if (searchQuery && sort && time && type) {
    switch (type) {
      case "link":
        content = (
          <>
            <Card>
              <HStack p="2">
                <Select value={sort} w="32" onChange={setValue(setSort)}>
                  <option value="relevance">Relevance</option>
                  <option value="hot">Hot</option>
                  <option value="top">Top</option>k
                  <option value="new">New</option>
                  <option value="comments">Comments</option>
                </Select>
                <Select value={time} w="32" onChange={setValue(setTime)}>
                  <option value="all">All Time</option>
                  <option value="year">Past Year</option>
                  <option value="month">Past Month</option>
                  <option value="week">Past Week</option>
                  <option value="day">Past 24 Hours</option>
                  <option value="hour">Past Hour</option>
                </Select>
              </HStack>
            </Card>
            <SearchPostsListings
              searchQuery={searchQuery}
              sort={sort}
              time={time}
              loadNext={atBottom}
            />
          </>
        );
        break;
      case "comment":
        break;
      case "sr":
        content = (
          <SubredditListings searchQuery={searchQuery} loadNext={atBottom} />
        );
        break;
      case "user":
        content = (
          <UserListings searchQuery={searchQuery} loadNext={atBottom} />
        );
        break;
    }
  }

  return (
    <NavBarFrame>
      <PageFrame
        left={
          <>
            <Card>
              <HStack p="2">
                <Button value="link" onClick={setValue(setType)}>
                  Posts
                </Button>
                {/* <Button value="comment" onClick={setValue(setType)}>
                  Comments
                </Button> */}
                <Button value="sr" onClick={setValue(setType)}>
                  Communities
                </Button>
                <Button value="user" onClick={setValue(setType)}>
                  People
                </Button>
              </HStack>
            </Card>
            {content}
          </>
        }
      />
    </NavBarFrame>
  );
};

export default SearchPage;
