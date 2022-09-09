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
  ButtonGroup,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, FC } from "react";
import { IoFilter } from "react-icons/io5";

import SubredditProvider from "../../lib/context/SubredditProvider";
import useReddit from "../../lib/hooks/useReddit";
import {
  RedditRules,
  RedditSubreddit,
} from "../../lib/reddit/redditDataStructs";
import NavFrame from "../NavFrame";
import PageFrame from "../PageFrame";
import SubredditBanner from "../SubredditBanner";
import AboutAllPanel from "../panel/AboutAllPanel";
import AboutHomePanel from "../panel/AboutHomePanel";
import AboutPopularPanel from "../panel/AboutPopularPanel";
import AboutSubredditPanel from "../panel/AboutSubredditPanel";
import ButtonPanel from "../panel/ButtonPanel";
import SubredditRulesPanel from "../panel/SubredditRulesPanel";
import SubredditPostsListings from "../panel_collection/SubredditPostsListings";

type NavProps = {
  subreddit: string;
  sort: string;
  time: string;
};

type Props = {
  navProps: NavProps;
};

const BrowseSubreddit: FC<Props> = ({ navProps }) => {
  const { subreddit, sort, time } = navProps;
  const router = useRouter();

  const renavigate = (newNavProps: NavProps) => {
    let pathname = subreddit !== "" ? `/r/${subreddit}/` : "/";
    if (
      (subreddit === "" && newNavProps.sort !== "best") ||
      (subreddit !== "" && newNavProps.sort !== "hot")
    )
      pathname += newNavProps.sort;
    const query: Record<string, string> = {};
    if (newNavProps.time !== "day") query["t"] = newNavProps.time;

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

  const { data: subredditAbout } = useReddit<RedditSubreddit>(
    subreddit === "" || subreddit === "popular" || subreddit === "all"
      ? null
      : {
          method: "GET",
          path: `/r/${subreddit}/about`,
        }
  );
  const { data: subredditRules } = useReddit<RedditRules>(
    subreddit === "" || subreddit === "popular" || subreddit === "all"
      ? null
      : {
          method: "GET",
          path: `/r/${subreddit}/about/rules`,
        }
  );

  let top =
    subreddit === "" ||
    subreddit === "popular" ||
    subreddit === "all" ? null : (
      <SubredditBanner />
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
            top={top}
            left={
              <>
                <ButtonPanel>
                  {subreddit === "" && (
                    <Button
                      value="best"
                      rounded="full"
                      isActive={sort === "best"}
                      leftIcon={<BellIcon />}
                      onClick={handleNavChange("sort")}
                    >
                      Best
                    </Button>
                  )}
                  <Button
                    value="hot"
                    rounded="full"
                    isActive={sort === "hot"}
                    leftIcon={<CalendarIcon />}
                    onClick={handleNavChange("sort")}
                  >
                    Hot
                  </Button>
                  <Button
                    value="new"
                    rounded="full"
                    isActive={sort === "new"}
                    leftIcon={<TimeIcon />}
                    onClick={handleNavChange("sort")}
                  >
                    New
                  </Button>
                  <Button
                    value="top"
                    rounded="full"
                    isActive={sort === "top"}
                    leftIcon={<StarIcon />}
                    onClick={handleNavChange("sort")}
                  >
                    Top
                  </Button>
                  {sort === "top" && (
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded="full"
                        rightIcon={<ChevronDownIcon />}
                      >
                        {time === "hour" && "Now"}
                        {time === "day" && "Today"}
                        {time === "week" && "This Week"}
                        {time === "month" && "This Month"}
                        {time === "year" && "This Year"}
                        {time === "all" && "All Time"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          value="hour"
                          onClick={handleNavChange("time")}
                        >
                          Now
                        </MenuItem>
                        <MenuItem value="day" onClick={handleNavChange("time")}>
                          Today
                        </MenuItem>
                        <MenuItem
                          value="week"
                          onClick={handleNavChange("time")}
                        >
                          This Week
                        </MenuItem>
                        <MenuItem
                          value="month"
                          onClick={handleNavChange("time")}
                        >
                          This Month
                        </MenuItem>
                        <MenuItem
                          value="year"
                          onClick={handleNavChange("time")}
                        >
                          This Year
                        </MenuItem>
                        <MenuItem value="all" onClick={handleNavChange("time")}>
                          All Time
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                  <Button
                    value="rising"
                    rounded="full"
                    isActive={sort === "rising"}
                    leftIcon={<TriangleUpIcon />}
                    onClick={handleNavChange("sort")}
                  >
                    Rising
                  </Button>
                </ButtonPanel>
                <SubredditPostsListings sort={sort} time={time} />
              </>
            }
            right={subredditInfoDisplay}
          />
        </NavFrame>
      </SubredditProvider>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent mt="4">
          <ModalBody p="2">
            <ButtonGroup display="flex" w="full" variant="outline" p="2">
              <VStack w="full">
                {subreddit === "" && (
                  <Button
                    w="full"
                    value="best"
                    isActive={sort === "best"}
                    rounded="full"
                    leftIcon={<BellIcon />}
                    onClick={handleNavChange("sort", onClose)}
                  >
                    Best
                  </Button>
                )}
                <Button
                  w="full"
                  value="hot"
                  isActive={sort === "hot"}
                  rounded="full"
                  leftIcon={<CalendarIcon />}
                  onClick={handleNavChange("sort", onClose)}
                >
                  Hot
                </Button>
                <Button
                  w="full"
                  value="new"
                  isActive={sort === "new"}
                  rounded="full"
                  leftIcon={<TimeIcon />}
                  onClick={handleNavChange("sort", onClose)}
                >
                  New
                </Button>
                <HStack w="full">
                  <Button
                    value="top"
                    flex="1"
                    isActive={sort === "top"}
                    rounded="full"
                    leftIcon={<StarIcon />}
                    onClick={
                      sort === "top"
                        ? handleNavChange("sort", onClose)
                        : handleNavChange("sort")
                    }
                  >
                    Top
                  </Button>
                  {sort === "top" && time && (
                    <Menu>
                      <MenuButton
                        as={Button}
                        rounded="full"
                        rightIcon={<ChevronDownIcon />}
                      >
                        {time === "hour" && "Now"}
                        {time === "day" && "Today"}
                        {time === "week" && "This Week"}
                        {time === "month" && "This Month"}
                        {time === "year" && "This Year"}
                        {time === "all" && "All Time"}
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          value="hour"
                          onClick={handleNavChange("time", onClose)}
                        >
                          Now
                        </MenuItem>
                        <MenuItem
                          value="day"
                          onClick={handleNavChange("time", onClose)}
                        >
                          Today
                        </MenuItem>
                        <MenuItem
                          value="week"
                          onClick={handleNavChange("time", onClose)}
                        >
                          This Week
                        </MenuItem>
                        <MenuItem
                          value="month"
                          onClick={handleNavChange("time", onClose)}
                        >
                          This Month
                        </MenuItem>
                        <MenuItem
                          value="year"
                          onClick={handleNavChange("time", onClose)}
                        >
                          This Year
                        </MenuItem>
                        <MenuItem
                          value="all"
                          onClick={handleNavChange("time", onClose)}
                        >
                          All Time
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  )}
                </HStack>
                <Button
                  w="full"
                  value="rising"
                  isActive={sort === "rising"}
                  rounded="full"
                  leftIcon={<TriangleUpIcon />}
                  onClick={handleNavChange("sort", onClose)}
                >
                  Rising
                </Button>
              </VStack>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BrowseSubreddit;
