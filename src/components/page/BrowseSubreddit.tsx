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
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC, useContext } from "react";
import { IoFilter } from "react-icons/io5";

import { SubredditContext } from "../../lib/context/SubredditProvider";
import { REDDIT_URL_PARAMS } from "../../lib/reddit/redditUrlParams";
import Buttons from "../Buttons";
import SrInfo from "../SrInfo";
import PostListings from "../SrPostListings";
import SubredditBanner from "../SubredditBanner";
import NavModal from "../modal/NavModal";
import NavFrame from "./NavFrame";
import PageFrame from "./PageFrame";

const URL_SORT_VALUES = REDDIT_URL_PARAMS["/[[...sort]]"].sort;
const URL_TIME_VALUES = REDDIT_URL_PARAMS["/[[...sort]]"].t;

const SUBREDDIT_SORT_VALUES =
  REDDIT_URL_PARAMS["/r/[subreddit]/[[...sort]]"].sort;

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
  sort: typeof URL_SORT_VALUES[number];
  time: typeof URL_TIME_VALUES[number];
};

const SUBREDDITS_WITHOUT_INFO = ["", "popular", "all"];

const BrowseSubreddit: FC<Props> = (props) => {
  const { sort, time } = props;
  const { subreddit } = useContext(SubredditContext);
  const router = useRouter();

  const handleNavChange = (propName: keyof Props, cb?: () => void) => {
    return (event: ChangeEvent<any>) => {
      const nextProps = { ...props, [propName]: event.currentTarget.value };

      let pathname = subreddit !== "" ? `/r/${subreddit}/` : "/";
      if (
        (subreddit === "" && nextProps.sort !== URL_SORT_VALUES[0]) ||
        (subreddit !== "" && nextProps.sort !== SUBREDDIT_SORT_VALUES[0])
      )
        pathname += nextProps.sort;
      const query: Record<string, string> = {};
      if (nextProps.time !== URL_TIME_VALUES[0]) query["t"] = nextProps.time;

      router.push({
        pathname,
        query,
      });

      if (cb) cb();
    };
  };

  const {
    isOpen: isNavModalOpen,
    onOpen: onNavModalOpen,
    onClose: onNavModalClose,
  } = useDisclosure();

  if (subreddit === undefined) return null;

  return (
    <>
      <NavFrame
        additionalNav={
          <IconButton
            icon={<IoFilter />}
            rounded="full"
            aria-label={"open sort settings"}
            onClick={onNavModalOpen}
          />
        }
      >
        <PageFrame
          topChildren={
            !SUBREDDITS_WITHOUT_INFO.includes(subreddit) && <SubredditBanner />
          }
          leftChildren={
            <>
              <Buttons>
                {subreddit === "" && (
                  <Button
                    value="best"
                    rounded="full"
                    isActive={sort === "best"}
                    leftIcon={SORT_BUTTON_ICONS["best"]}
                    onClick={handleNavChange("sort")}
                  >
                    {SORT_DISPLAY_NAMES["best"]}
                  </Button>
                )}
                <Button
                  value="hot"
                  rounded="full"
                  isActive={sort === "hot"}
                  leftIcon={SORT_BUTTON_ICONS["hot"]}
                  onClick={handleNavChange("sort")}
                >
                  {SORT_DISPLAY_NAMES["hot"]}
                </Button>
                <Button
                  value="new"
                  rounded="full"
                  isActive={sort === "new"}
                  leftIcon={SORT_BUTTON_ICONS["new"]}
                  onClick={handleNavChange("sort")}
                >
                  {SORT_DISPLAY_NAMES["top"]}
                </Button>
                <Button
                  value="top"
                  rounded="full"
                  isActive={sort === "top"}
                  leftIcon={SORT_BUTTON_ICONS["top"]}
                  onClick={handleNavChange("sort")}
                >
                  {SORT_DISPLAY_NAMES["top"]}
                </Button>

                {sort === "top" && (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded="full"
                      rightIcon={<ChevronDownIcon />}
                    >
                      {TIME_DISPLAY_NAMES[time]}
                    </MenuButton>
                    <MenuList>
                      <MenuItem value="hour" onClick={handleNavChange("time")}>
                        {TIME_DISPLAY_NAMES["hour"]}
                      </MenuItem>
                      <MenuItem value="day" onClick={handleNavChange("time")}>
                        {TIME_DISPLAY_NAMES["day"]}
                      </MenuItem>
                      <MenuItem value="week" onClick={handleNavChange("time")}>
                        {TIME_DISPLAY_NAMES["week"]}
                      </MenuItem>
                      <MenuItem value="month" onClick={handleNavChange("time")}>
                        {TIME_DISPLAY_NAMES["month"]}
                      </MenuItem>
                      <MenuItem value="year" onClick={handleNavChange("time")}>
                        {TIME_DISPLAY_NAMES["year"]}
                      </MenuItem>
                      <MenuItem value="all" onClick={handleNavChange("time")}>
                        {TIME_DISPLAY_NAMES["all"]}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}

                <Button
                  value="rising"
                  rounded="full"
                  isActive={sort === "rising"}
                  leftIcon={SORT_BUTTON_ICONS["rising"]}
                  onClick={handleNavChange("sort")}
                >
                  {SORT_DISPLAY_NAMES["rising"]}
                </Button>
              </Buttons>
              <PostListings subreddit={subreddit} sort={sort} time={time} />
            </>
          }
          rightChildren={<SrInfo />}
        />
      </NavFrame>
      <NavModal isOpen={isNavModalOpen} onClose={onNavModalClose}>
        {subreddit === "" && (
          <Button
            value="best"
            w="full"
            rounded="full"
            isActive={sort === "best"}
            leftIcon={SORT_BUTTON_ICONS["best"]}
            onClick={handleNavChange("sort", onNavModalClose)}
          >
            {SORT_DISPLAY_NAMES["best"]}
          </Button>
        )}

        <Button
          value="hot"
          w="full"
          rounded="full"
          isActive={sort === "hot"}
          leftIcon={SORT_BUTTON_ICONS["hot"]}
          onClick={handleNavChange("sort", onNavModalClose)}
        >
          {SORT_DISPLAY_NAMES["hot"]}
        </Button>
        <Button
          value="new"
          w="full"
          rounded="full"
          isActive={sort === "new"}
          leftIcon={SORT_BUTTON_ICONS["new"]}
          onClick={handleNavChange("sort", onNavModalClose)}
        >
          {SORT_DISPLAY_NAMES["new"]}
        </Button>
        <HStack w="full">
          <Button
            value="top"
            w="full"
            rounded="full"
            isActive={sort === "top"}
            leftIcon={SORT_BUTTON_ICONS["top"]}
            onClick={handleNavChange("sort", onNavModalClose)}
          >
            {SORT_DISPLAY_NAMES["top"]}
          </Button>
          <Menu>
            <MenuButton
              as={Button}
              w="full"
              rounded="full"
              rightIcon={<ChevronDownIcon />}
            >
              {TIME_DISPLAY_NAMES[time]}
            </MenuButton>
            <MenuList>
              <MenuItem
                value="hour"
                onClick={handleNavChange("time", onNavModalClose)}
              >
                {TIME_DISPLAY_NAMES["hour"]}
              </MenuItem>
              <MenuItem
                value="day"
                onClick={handleNavChange("time", onNavModalClose)}
              >
                {TIME_DISPLAY_NAMES["day"]}
              </MenuItem>
              <MenuItem
                value="week"
                onClick={handleNavChange("time", onNavModalClose)}
              >
                {TIME_DISPLAY_NAMES["week"]}
              </MenuItem>
              <MenuItem
                value="month"
                onClick={handleNavChange("time", onNavModalClose)}
              >
                {TIME_DISPLAY_NAMES["month"]}
              </MenuItem>
              <MenuItem
                value="year"
                onClick={handleNavChange("time", onNavModalClose)}
              >
                {TIME_DISPLAY_NAMES["year"]}
              </MenuItem>
              <MenuItem
                value="all"
                onClick={handleNavChange("time", onNavModalClose)}
              >
                {TIME_DISPLAY_NAMES["all"]}
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <Button
          value="rising"
          w="full"
          rounded="full"
          isActive={sort === "rising"}
          leftIcon={SORT_BUTTON_ICONS["rising"]}
          onClick={handleNavChange("sort", onNavModalClose)}
        >
          {SORT_DISPLAY_NAMES["rising"]}
        </Button>
      </NavModal>
    </>
  );
};

export default BrowseSubreddit;
