import { Button, HStack, Select } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

import Card from "../components/Card";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SearchPostsContainer from "../components/SearchPostsContainer";
import SubredditsContainer from "../components/SubredditsContainer";
import useAtBottom from "../lib/hooks/useAtBottom";
import useMe from "../lib/hooks/useMe";
import { getSearchPath } from "../lib/reddit/redditUrlUtils";
import { withSessionSsr } from "../lib/session/withSession";
import setValue from "../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async (context) => {
    const initialSearchQuery = context.query["q"] || "";
    const initialSort = context.query["sort"] || "best";
    const initalTime = context.query["t"] || "day";
    const initialType = context.query["type"] || "link";

    return {
      props: {
        initialSearchQuery: initialSearchQuery,
        initialSort: initialSort,
        initialTime: initalTime,
        initialType: initialType,
      },
    };
  }
);

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

  useEffect(() => {
    router.push(getSearchPath(searchQuery, sort, time, type).pathname, undefined, {
      shallow: true,
    });
  }, [searchQuery, sort, time, type]);

  useEffect(() => {
    setSearchQuery((router.query["q"] as string) || "");
    setSort((router.query["sort"] as string) || "relevance");
    setTime((router.query["t"] as string) || "all");
  }, [router.query]);

  let content;
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
          <SearchPostsContainer
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
        <SubredditsContainer
          searchQuery={searchQuery}
          initialSubredditListings={[]}
          loadNext={atBottom}
        />
      );
      break;
    case "user":
      break;
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
                <Button value="comment" onClick={setValue(setType)}>
                  Comments
                </Button>
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
