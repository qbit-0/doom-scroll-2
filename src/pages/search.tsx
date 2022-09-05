import { Button, ButtonGroup, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../components/Card";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SearchPostsListings from "../components/SearchPostsListings";
import SubredditListings from "../components/SubredditListings";
import UserListings from "../components/UsersListings";
import { getSearchPostsPath } from "../lib/reddit/redditUrlUtils";
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
      initialType: initialType,
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

  useEffect(() => {
    if (!searchQuery || !sort || !time || !type) return;
    router.replace(getSearchPostsPath(searchQuery, sort, time, type).pathname);
  }, [searchQuery, sort, time, type]);

  useEffect(() => {
    setSearchQuery(initialSearchQuery);
    setSort(initialSort);
    setTime(initialTime);
    setType(initialType);
  }, [initialSearchQuery, initialSort, initialTime, initialType]);

  let content;
  if (searchQuery && sort && time && type) {
    switch (type) {
      case "link":
        content = (
          <>
            <Card p="0">
              <ButtonGroup w="full" variant="outline" p="2">
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
              </ButtonGroup>
            </Card>
            <SearchPostsListings
              searchQuery={searchQuery}
              sort={sort}
              time={time}
            />
          </>
        );
        break;
      case "comment":
        break;
      case "sr":
        content = <SubredditListings searchQuery={searchQuery} />;
        break;
      case "user":
        content = <UserListings searchQuery={searchQuery} />;
        break;
    }
  }

  return (
    <NavBarFrame>
      <PageFrame
        left={
          <>
            <Card p="0">
              <ButtonGroup w="full" variant="ghost" p="2">
                <Button
                  value="link"
                  isActive={type === "link"}
                  onClick={setValue(setType)}
                >
                  Posts
                </Button>
                {/* <Button value="comment" onClick={setValue(setType)}>
                  Comments
                </Button> */}
                <Button
                  value="sr"
                  isActive={type === "sr"}
                  onClick={setValue(setType)}
                >
                  Communities
                </Button>
                <Button
                  value="user"
                  isActive={type === "user"}
                  onClick={setValue(setType)}
                >
                  People
                </Button>
              </ButtonGroup>
            </Card>
            {content}
          </>
        }
      />
    </NavBarFrame>
  );
};

export default SearchPage;
