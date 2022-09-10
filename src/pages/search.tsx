import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FC } from "react";
import { IoFilter } from "react-icons/io5";

import NavFrame from "../components/NavFrame";
import PageFrame from "../components/PageFrame";
import Post from "../components/Post";
import PostSkeleton from "../components/PostSkeleton";
import Subreddit from "../components/Subreddit";
import User from "../components/User";
import FilterModal from "../components/modal/FilterModal";
import ButtonPanel from "../components/panel/ButtonPanel";
import Listing from "../components/panel/Listing";
import Listings from "../components/panel/Listings";
import SubredditProvider from "../lib/context/SubredditProvider";
import {
  RedditAccount,
  RedditLink,
  RedditSubreddit,
} from "../lib/reddit/redditDataStructs";
import { REDDIT_URL_PARAMS } from "../lib/reddit/redditUrlParams";
import {
  getSearchPostsPath,
  getSearchSubredditsPath,
  getSearchUsersPath,
} from "../lib/reddit/redditUrlUtils";

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
      navProps: {
        searchQuery,
        sort,
        time,
        type,
      },
    },
  };
};

type NavProps = {
  searchQuery: string;
  type: typeof SEARCH_TYPE_VALUES[number];
  sort: typeof SEARCH_SORT_VALUES[number];
  time: typeof SEARCH_TIME_VALUES[number];
};

type Props = {
  navProps: NavProps;
};

const SearchPage: FC<Props> = ({ navProps }) => {
  const { searchQuery, sort, time, type } = navProps;

  const router = useRouter();

  const renavigate = (newNavProps: NavProps) => {
    const pathname = "/search";
    const query: Record<string, string> = {};
    query["q"] = newNavProps.searchQuery;
    if (newNavProps.sort !== "relevance") query["sort"] = newNavProps.sort;
    if (newNavProps.time !== "all") query["t"] = newNavProps.time;
    if (newNavProps.type !== "link") query["type"] = newNavProps.type;

    router.push({
      pathname,
      query,
    });
  };

  const handleNavChange = (propName: keyof NavProps, callback?: () => void) => {
    return (event: ChangeEvent<any>) => {
      renavigate({ ...navProps, [propName]: event.currentTarget.value });
      if (callback) callback();
    };
  };

  const {
    isOpen: isSortModalOpen,
    onOpen: onSortModalOpen,
    onClose: onSortModalClose,
  } = useDisclosure();

  const SortMenuItem: FC<{ value: typeof SEARCH_SORT_VALUES[number] }> = ({
    value,
  }) => (
    <MenuItem value={value} onClick={handleNavChange("sort")}>
      {SORT_DISPLAY_NAMES[value]}
    </MenuItem>
  );

  const SortMenu: FC = () => (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {SORT_DISPLAY_NAMES[sort]}
      </MenuButton>
      <MenuList>
        <SortMenuItem value="relevance" />
        <SortMenuItem value="hot" />
        <SortMenuItem value="top" />
        <SortMenuItem value="new" />
        <SortMenuItem value="comments" />
      </MenuList>
    </Menu>
  );

  const TimeMenuItem: FC<{ value: typeof SEARCH_TIME_VALUES[number] }> = ({
    value,
  }) => (
    <MenuItem value={value} onClick={handleNavChange("time")}>
      {TIME_DISPLAY_NAMES[value]}
    </MenuItem>
  );

  const TimeMenu: FC = () => (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {TIME_DISPLAY_NAMES[time]}
      </MenuButton>
      <MenuList>
        <TimeMenuItem value="all" />
        <TimeMenuItem value="year" />
        <TimeMenuItem value="month" />
        <TimeMenuItem value="week" />
        <TimeMenuItem value="day" />
        <TimeMenuItem value="hour" />
      </MenuList>
    </Menu>
  );

  const PostListings: FC = () => (
    <Listings
      createListing={(after, updateAfter) => {
        const { pathname, query } = getSearchPostsPath(
          searchQuery,
          sort,
          time,
          after
        );
        return (
          <Listing
            pathname={pathname}
            query={query}
            createItem={(item: RedditLink) => <Post post={item} />}
            createSkeleton={() => <PostSkeleton />}
            updateAfter={updateAfter}
          />
        );
      }}
    />
  );

  const SubredditListings: FC = () => (
    <Listings
      createListing={(after, updateAfter) => {
        const { pathname, query } = getSearchSubredditsPath(searchQuery, after);
        return (
          <Listing
            pathname={pathname}
            query={query}
            createItem={(item: RedditSubreddit) => (
              <Subreddit subreddit={item} />
            )}
            createSkeleton={() => <PostSkeleton />}
            updateAfter={updateAfter}
          />
        );
      }}
    />
  );

  const UserListings: FC = () => (
    <Listings
      createListing={(after, updateAfter) => {
        const { pathname, query } = getSearchUsersPath(searchQuery, after);
        return (
          <Listing
            pathname={pathname}
            query={query}
            createItem={(item: RedditAccount) => <User user={item} />}
            createSkeleton={() => <PostSkeleton />}
            updateAfter={updateAfter}
          />
        );
      }}
    />
  );

  const SearchContent: FC = () => {
    switch (type) {
      case "link":
        return (
          <>
            <ButtonPanel>
              <SortMenu />
              <TimeMenu />
            </ButtonPanel>
            <PostListings />
          </>
        );
        break;
      case "sr":
        return <SubredditListings />;
        break;
      case "user":
        return <UserListings />;
        break;
    }
  };

  const TypeButton: FC<{ value: typeof SEARCH_TYPE_VALUES[number] }> = ({
    value,
  }) => (
    <Button
      value={value}
      isActive={type === value}
      onClick={handleNavChange("type")}
    >
      {TYPE_DISPLAY_NAMES[value]}
    </Button>
  );

  return (
    <SubredditProvider initialSubreddit={undefined}>
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
              <ButtonPanel>
                <TypeButton value="link" />
                <TypeButton value="sr" />
                <TypeButton value="user" />
              </ButtonPanel>
              <SearchContent />
            </>
          }
        />
      </NavFrame>
      <FilterModal isOpen={isSortModalOpen} onClose={onSortModalClose}>
        <TypeButton value="link" />
        <TypeButton value="sr" />
        <TypeButton value="user" />
        <SortMenu />
        <TimeMenu />
      </FilterModal>
    </SubredditProvider>
  );
};

export default SearchPage;
