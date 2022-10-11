import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FC } from "react";
import { IoFilter } from "react-icons/io5";

import Buttons from "../components/Buttons";
import SearchPostListings from "../components/listings/SearchPostListings";
import SearchSrListings from "../components/listings/SearchSrListings";
import UserListings from "../components/listings/UserListings";
import NavModal from "../components/modal/NavModal";
import NavFrame from "../components/page/NavFrame";
import PageFrame from "../components/page/PageFrame";
import SubredditProvider from "../lib/context/SubredditProvider";
import { REDDIT_URL_PARAMS } from "../lib/reddit/redditUrlParams";

const SEARCH_TYPE_VALUES = REDDIT_URL_PARAMS["/search"].type;
const SEARCH_SORT_VALUES = REDDIT_URL_PARAMS["/search"].sort;
const SEARCH_TIME_VALUES = REDDIT_URL_PARAMS["/search"].t;

const TYPE_DISPLAY_NAMES: Record<typeof SEARCH_TYPE_VALUES[number], string> = {
  link: "Posts",
  sr: "Communities",
  user: "People",
};

const SORT_DISPLAY_NAMES: Record<typeof SEARCH_SORT_VALUES[number], string> = {
  relevance: "Relevance",
  hot: "Hot",
  top: "Top",
  new: "New",
  comments: "Most Comments",
};

const TIME_DISPLAY_NAMES: Record<typeof SEARCH_TIME_VALUES[number], string> = {
  all: "All Time",
  year: "Past Year",
  month: "Past Month",
  week: "Past Week",
  day: "Past 24 Hours",
  hour: "Past Hour",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.query["q"] || "";

  const type = SEARCH_TYPE_VALUES.includes(context.query["type"] as any)
    ? (context.query["type"] as typeof SEARCH_TYPE_VALUES[number])
    : SEARCH_TYPE_VALUES[0];

  const sort = SEARCH_SORT_VALUES.includes(context.query["sort"]?.[0] as any)
    ? (context.query["sort"]?.[0] as typeof SEARCH_SORT_VALUES[number])
    : SEARCH_SORT_VALUES[0];

  const time = SEARCH_TIME_VALUES.includes(context.query["t"] as any)
    ? (context.query["t"] as typeof SEARCH_TIME_VALUES[number])
    : SEARCH_TIME_VALUES[0];

  return {
    props: {
      searchQuery,
      sort,
      time,
      type,
    },
  };
};

type Props = {
  searchQuery: string;
  type: typeof SEARCH_TYPE_VALUES[number];
  sort: typeof SEARCH_SORT_VALUES[number];
  time: typeof SEARCH_TIME_VALUES[number];
};

const SearchPage: FC<Props> = (props) => {
  const { searchQuery, type, sort, time } = props;
  const router = useRouter();

  const handleNavChange = (propName: keyof Props, cb?: () => void) => {
    return (event: ChangeEvent<any>) => {
      const nextProps = { ...props, [propName]: event.currentTarget.value };

      const pathname = "/search";
      const query: Record<string, string> = {};
      query["q"] = nextProps.searchQuery;
      if (nextProps.sort !== "relevance") query["sort"] = nextProps.sort;
      if (nextProps.time !== "all") query["t"] = nextProps.time;
      if (nextProps.type !== "link") query["type"] = nextProps.type;

      router.push({
        pathname,
        query,
      });

      if (cb) cb();
    };
  };

  const {
    isOpen: isSortModalOpen,
    onOpen: onSortModalOpen,
    onClose: onSortModalClose,
  } = useDisclosure();

  const sortMenu = (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {SORT_DISPLAY_NAMES[sort]}
      </MenuButton>
      <MenuList>
        <MenuItem value="relevance" onClick={handleNavChange("sort")}>
          {SORT_DISPLAY_NAMES["relevance"]}
        </MenuItem>
        <MenuItem value="hot" onClick={handleNavChange("sort")}>
          {SORT_DISPLAY_NAMES["hot"]}
        </MenuItem>
        <MenuItem value="top" onClick={handleNavChange("sort")}>
          {SORT_DISPLAY_NAMES["top"]}
        </MenuItem>
        <MenuItem value="new" onClick={handleNavChange("sort")}>
          {SORT_DISPLAY_NAMES["new"]}
        </MenuItem>
        <MenuItem value="comments" onClick={handleNavChange("sort")}>
          {SORT_DISPLAY_NAMES["comments"]}
        </MenuItem>
      </MenuList>
    </Menu>
  );

  const timeMenu = (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {TIME_DISPLAY_NAMES[time]}
      </MenuButton>
      <MenuList>
        <MenuItem value="all" onClick={handleNavChange("time")}>
          {TIME_DISPLAY_NAMES["all"]}
        </MenuItem>
        <MenuItem value="year" onClick={handleNavChange("time")}>
          {TIME_DISPLAY_NAMES["year"]}
        </MenuItem>
        <MenuItem value="month" onClick={handleNavChange("time")}>
          {TIME_DISPLAY_NAMES["month"]}
        </MenuItem>
        <MenuItem value="week" onClick={handleNavChange("time")}>
          {TIME_DISPLAY_NAMES["week"]}
        </MenuItem>
        <MenuItem value="day" onClick={handleNavChange("time")}>
          {TIME_DISPLAY_NAMES["day"]}
        </MenuItem>
        <MenuItem value="hour" onClick={handleNavChange("time")}>
          {TIME_DISPLAY_NAMES["hour"]}
        </MenuItem>
      </MenuList>
    </Menu>
  );

  let searchContent;
  switch (type) {
    case "link":
      searchContent = (
        <>
          <Buttons>
            {sortMenu}
            {timeMenu}
          </Buttons>
          <SearchPostListings
            searchQuery={searchQuery}
            sort={sort}
            time={time}
          />
        </>
      );
      break;
    case "sr":
      searchContent = <SearchSrListings searchQuery={searchQuery} />;
      break;
    case "user":
      searchContent = <UserListings searchQuery={searchQuery} />;
      break;
  }

  return (
    <SubredditProvider subreddit={undefined}>
      <NavFrame
        additionalNav={
          <IconButton
            icon={<IoFilter />}
            rounded="full"
            aria-label={"open sort settings"}
            onClick={onSortModalOpen}
          />
        }
      >
        <PageFrame
          leftChildren={
            <>
              <Buttons>
                <Button
                  value="link"
                  isActive={type === "link"}
                  onClick={handleNavChange("type")}
                >
                  {TYPE_DISPLAY_NAMES["link"]}
                </Button>
                <Button
                  value="sr"
                  isActive={type === "sr"}
                  onClick={handleNavChange("type")}
                >
                  {TYPE_DISPLAY_NAMES["sr"]}
                </Button>
                <Button
                  value="user"
                  isActive={type === "user"}
                  onClick={handleNavChange("type")}
                >
                  {TYPE_DISPLAY_NAMES["user"]}
                </Button>
              </Buttons>
              {searchContent}
            </>
          }
        />
      </NavFrame>
      <NavModal isOpen={isSortModalOpen} onClose={onSortModalClose}>
        <Button
          value="link"
          isActive={type === "link"}
          onClick={handleNavChange("type")}
        >
          {TYPE_DISPLAY_NAMES["link"]}
        </Button>
        <Button
          value="sr"
          isActive={type === "sr"}
          onClick={handleNavChange("type")}
        >
          {TYPE_DISPLAY_NAMES["link"]}
        </Button>
        <Button
          value="user"
          isActive={type === "user"}
          onClick={handleNavChange("type")}
        >
          {TYPE_DISPLAY_NAMES["link"]}
        </Button>
        {sortMenu}
        {timeMenu}
      </NavModal>
    </SubredditProvider>
  );
};

export default SearchPage;
