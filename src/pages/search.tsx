import { Button, HStack, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../components/Card";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SearchPostsListings from "../components/SearchPostsListings";
import SubredditListings from "../components/SubredditListings";
import UserListings from "../components/UsersListings";
import useAtBottom from "../lib/hooks/useAtBottom";
import { getSearchPath } from "../lib/reddit/redditUrlUtils";
import { withSessionSsr } from "../lib/session/withSession";
import setValue from "../lib/utils/setValue";

type Props = {};

const SearchPage: FC<Props> = ({}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [sort, setSort] = useState<string | undefined>(undefined);
  const [time, setTime] = useState<string | undefined>(undefined);
  const [type, setType] = useState<string | undefined>(undefined);
  const atBottom = useAtBottom();

  useEffect(() => {
    if (!searchQuery) setSearchQuery((router.query["q"] as string) || "");
    if (!sort) setSort((router.query["sort"] as string) || "relevance");
    if (!time) setTime((router.query["t"] as string) || "all");
    if (!type) setType((router.query["type"] as string) || "link");
  }, [router.query, searchQuery, sort, time, type]);

  useEffect(() => {
    if (!searchQuery || !sort || !time || !type) return;
    router.push(
      getSearchPath(searchQuery, sort, time, type).pathname,
      undefined,
      {
        shallow: true,
      }
    );
  }, [searchQuery, sort, time, type]);

  useEffect(() => {
    setSearchQuery((router.query["q"] as string) || "");
    setSort((router.query["sort"] as string) || "relevance");
    setTime((router.query["t"] as string) || "all");
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
              initialPostListings={[]}
              loadNext={atBottom}
            />
          </>
        );
        break;
      case "comment":
        break;
      case "sr":
        content = (
          <SubredditListings
            searchQuery={searchQuery}
            initialSubredditListings={[]}
            loadNext={atBottom}
          />
        );
        break;
      case "user":
        content = (
          <UserListings
            searchQuery={searchQuery}
            initialUserListings={[]}
            loadNext={atBottom}
          />
        );
        break;
    }
  }

  return (
    <NavBarFrame subreddit={null}>
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
