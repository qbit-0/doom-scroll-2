import {
  BellIcon,
  CalendarIcon,
  ChevronDownIcon,
  StarIcon,
  TimeIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ButtonProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC } from "react";
import { IoFilter } from "react-icons/io5";

import SubredditProvider from "../../lib/context/SubredditProvider";
import useReddit from "../../lib/hooks/useReddit";
import {
  RedditLink,
  RedditRules,
  RedditSubreddit,
} from "../../lib/reddit/redditDataStructs";
import { REDDIT_URL_PARAMS } from "../../lib/reddit/redditUrlParams";
import { getSubredditPath } from "../../lib/reddit/redditUrlUtils";
import NavFrame from "../NavFrame";
import PageFrame from "../PageFrame";
import Post from "../Post";
import PostSkeleton from "../PostSkeleton";
import SubredditBanner from "../SubredditBanner";
import FilterModal from "../modal/FilterModal";
import AboutAllPanel from "../panel/AboutAllPanel";
import AboutHomePanel from "../panel/AboutHomePanel";
import AboutPopularPanel from "../panel/AboutPopularPanel";
import AboutSubredditPanel from "../panel/AboutSubredditPanel";
import ButtonPanel from "../panel/ButtonPanel";
import Listing from "../panel/Listing";
import Listings from "../panel/Listings";
import SubredditRulesPanel from "../panel/SubredditRulesPanel";

const URL_SORT_VALUES = REDDIT_URL_PARAMS["/[[...sort]]"].sort;
const URL_TIME_VALUES = REDDIT_URL_PARAMS["/[[...sort]]"].t;

const SUBREDDIT_SORT_VALUES =
  REDDIT_URL_PARAMS["/r/[subreddit]/[[...sort]]"].sort;

type NavProps = {
  subreddit: string;
  sort: typeof URL_SORT_VALUES[number];
  time: typeof URL_TIME_VALUES[number];
};

const SORT_DISPLAY_NAMES: Record<typeof URL_SORT_VALUES[number], string> = {
  best: "Best",
  hot: "Hot",
  new: "New",
  top: "Top",
  rising: "Rising",
};

const SORT_BUTTON_ICONS: Record<
  typeof URL_SORT_VALUES[number],
  React.ReactElement
> = {
  best: <BellIcon />,
  hot: <StarIcon />,
  new: <TimeIcon />,
  top: <CalendarIcon />,
  rising: <TriangleUpIcon />,
};

const TIME_DISPLAY_NAMES: Record<typeof URL_TIME_VALUES[number], string> = {
  hour: "Now",
  day: "Today",
  week: "This Week",
  month: "This Month",
  year: "This Year",
  all: "All Time",
};

type Props = {
  navProps: NavProps;
};

const SUBREDDITS_WITHOUT_INFO = ["", "popular", "all"];

const BrowseSubreddit: FC<Props> = ({ navProps }) => {
  const { subreddit, sort, time } = navProps;
  const router = useRouter();

  const renavigate = (newNavProps: NavProps) => {
    let pathname = subreddit !== "" ? `/r/${subreddit}/` : "/";
    if (
      (subreddit === "" && newNavProps.sort !== URL_SORT_VALUES[0]) ||
      (subreddit !== "" && newNavProps.sort !== SUBREDDIT_SORT_VALUES[0])
    )
      pathname += newNavProps.sort;
    const query: Record<string, string> = {};
    if (newNavProps.time !== URL_TIME_VALUES[0]) query["t"] = newNavProps.time;

    router.push({
      pathname,
      query,
    });
  };

  const handleNavChange = (propName: keyof NavProps, callback?: () => void) => {
    return (event: ChangeEvent<any>) => {
      console.log(propName);

      renavigate({ ...navProps, [propName]: event.currentTarget.value });
      if (callback) callback();
    };
  };

  const { data: subredditAbout } = useReddit<RedditSubreddit>(
    SUBREDDITS_WITHOUT_INFO.includes(subreddit)
      ? null
      : {
          method: "GET",
          pathname: `/r/${subreddit}/about`,
        }
  );
  const { data: subredditRules } = useReddit<RedditRules>(
    SUBREDDITS_WITHOUT_INFO.includes(subreddit)
      ? null
      : {
          method: "GET",
          pathname: `/r/${subreddit}/about/rules`,
        }
  );

  let subredditInfoDisplay;
  switch (subreddit) {
    case "":
      subredditInfoDisplay = <AboutHomePanel />;
      break;
    case "popular":
      subredditInfoDisplay = <AboutPopularPanel />;
      break;
    case "all":
      subredditInfoDisplay = <AboutAllPanel />;
      break;
    default:
      subredditInfoDisplay = (
        <>
          <AboutSubredditPanel />
          <SubredditRulesPanel />
        </>
      );
      break;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const SortButton: FC<{
    value: typeof URL_SORT_VALUES[number];
    callback?: () => void;
    buttonProps?: ButtonProps;
  }> = ({ value, callback, buttonProps }) => (
    <Button
      value={value}
      rounded="full"
      isActive={sort === value}
      leftIcon={SORT_BUTTON_ICONS[value]}
      onClick={handleNavChange("sort", callback)}
      {...buttonProps}
    >
      {SORT_DISPLAY_NAMES[value]}
    </Button>
  );

  const TimeMenuItem: FC<{
    value: typeof URL_TIME_VALUES[number];
    callback?: () => void;
  }> = ({ value, callback }) => (
    <MenuItem value={value} onClick={handleNavChange("time", callback)}>
      {TIME_DISPLAY_NAMES[value]}
    </MenuItem>
  );

  const TimeMenu: FC<{
    callback?: () => void;
    buttonProps?: ButtonProps;
  }> = ({ callback, buttonProps }) => (
    <Menu>
      <MenuButton
        as={Button}
        rounded="full"
        rightIcon={<ChevronDownIcon />}
        {...buttonProps}
      >
        {TIME_DISPLAY_NAMES[time]}
      </MenuButton>
      <MenuList>
        <TimeMenuItem value="hour" callback={callback} />
        <TimeMenuItem value="day" callback={callback} />
        <TimeMenuItem value="week" callback={callback} />
        <TimeMenuItem value="month" callback={callback} />
        <TimeMenuItem value="year" callback={callback} />
        <TimeMenuItem value="all" callback={callback} />
      </MenuList>
    </Menu>
  );

  const PostListings: FC = () => (
    <Listings
      createListing={(after, updateAfter) => {
        const { pathname, query } = getSubredditPath(
          subreddit,
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

  return (
    <>
      <SubredditProvider
        initialSubreddit={subreddit}
        initialSubredditAbout={subredditAbout}
        initialSubredditRules={subredditRules}
      >
        <NavFrame
          additionalNav={
            <IconButton
              icon={<IoFilter />}
              rounded="full"
              aria-label={"open sort settings"}
              onClick={onOpen}
            />
          }
        >
          <PageFrame
            topChildren={
              !SUBREDDITS_WITHOUT_INFO.includes(subreddit) && (
                <SubredditBanner />
              )
            }
            leftChildren={
              <>
                <ButtonPanel>
                  {subreddit === "" && <SortButton value="best" />}
                  <SortButton value="hot" />
                  <SortButton value="new" />
                  <SortButton value="top" />
                  {sort === "top" && <TimeMenu />}
                  <SortButton value="rising" />
                </ButtonPanel>
                <PostListings />
              </>
            }
            rightChildren={subredditInfoDisplay}
          />
        </NavFrame>
      </SubredditProvider>
      <FilterModal isOpen={isOpen} onClose={onClose}>
        <SortButton
          value="best"
          callback={onClose}
          buttonProps={{ w: "full" }}
        />
        <SortButton
          value="hot"
          callback={onClose}
          buttonProps={{ w: "full" }}
        />
        <SortButton
          value="new"
          callback={onClose}
          buttonProps={{ w: "full" }}
        />
        <HStack w="full">
          <SortButton
            value="top"
            callback={onClose}
            buttonProps={{ w: "full" }}
          />
          <TimeMenu callback={onClose} buttonProps={{ w: "full" }} />
        </HStack>
        <SortButton
          value="rising"
          callback={onClose}
          buttonProps={{ w: "full" }}
        />
      </FilterModal>
    </>
  );
};

export default BrowseSubreddit;
