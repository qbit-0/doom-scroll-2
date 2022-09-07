import { ChevronDownIcon } from "@chakra-ui/icons";
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

import Card from "../components/Card";
import NavBarFrame from "../components/NavBarFrame";
import PageFrame from "../components/PageFrame";
import SearchPostsListings from "../components/panel_collection/SearchPostsListings";
import SubredditListings from "../components/panel_collection/SubredditListings";
import UserListings from "../components/panel_collection/UsersListings";
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
                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {sort === "relevance" && "Relevance"}
                    {sort === "hot" && "Hot"}
                    {sort === "top" && "Top"}
                    {sort === "new" && "New"}
                    {sort === "comments" && "Comments"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem value="relevance" onClick={setValue(setSort)}>
                      Relevance
                    </MenuItem>
                    <MenuItem value="hot" onClick={setValue(setSort)}>
                      Hot
                    </MenuItem>
                    <MenuItem value="top" onClick={setValue(setSort)}>
                      Top
                    </MenuItem>
                    <MenuItem value="new" onClick={setValue(setSort)}>
                      New
                    </MenuItem>
                    <MenuItem value="comments" onClick={setValue(setSort)}>
                      Comments
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    {time === "all" && "All Time"}
                    {time === "year" && "Past Year"}
                    {time === "month" && "Past Month"}
                    {time === "week" && "Past Week"}
                    {time === "day" && "Past 24 Hours"}
                    {time === "hour" && "Past Hour"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem value="all" onClick={setValue(setTime)}>
                      All Time
                    </MenuItem>
                    <MenuItem value="year" onClick={setValue(setTime)}>
                      Past Year
                    </MenuItem>
                    <MenuItem value="month" onClick={setValue(setTime)}>
                      Past Month
                    </MenuItem>
                    <MenuItem value="week" onClick={setValue(setTime)}>
                      Past Week
                    </MenuItem>
                    <MenuItem value="day" onClick={setValue(setTime)}>
                      Past 24 Hours
                    </MenuItem>
                    <MenuItem value="hour" onClick={setValue(setTime)}>
                      Past Hour
                    </MenuItem>
                  </MenuList>
                </Menu>
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
