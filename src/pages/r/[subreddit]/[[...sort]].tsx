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
  Select,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";

import Card from "../../../components/Card";
import NavFrame from "../../../components/NavFrame";
import PageFrame from "../../../components/PageFrame";
import SubredditBanner from "../../../components/SubredditBanner";
import AboutAllPanel from "../../../components/panel/AboutAllPanel";
import AboutPopularPanel from "../../../components/panel/AboutPopularPanel";
import AboutSubredditPanel from "../../../components/panel/AboutSubredditPanel";
import SubredditRulesPanel from "../../../components/panel/SubredditRulesPanel";
import SubredditPostsListings from "../../../components/panel_collection/SubredditPostsListings";
import SubredditProvider from "../../../lib/context/SubredditProvider";
import useReddit from "../../../lib/hooks/useReddit";
import {
  RedditRules,
  RedditSubreddit,
} from "../../../lib/reddit/redditDataStructs";
import { getSubredditPath } from "../../../lib/reddit/redditUrlUtils";
import setValue from "../../../lib/utils/setValue";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const initialSubreddit = context.query["subreddit"] || "";
  const initialSort = context.query["sort"]?.[0] || "best";
  const initialTime = context.query["t"] || "day";

  return {
    props: {
      initialSubreddit: initialSubreddit,
      initialSort: initialSort,
      initialTime: initialTime,
    },
  };
};

type Props = {
  initialSubreddit: string;
  initialSort: string;
  initialTime: string;
};

const SubredditPage: FC<Props> = ({
  initialSubreddit,
  initialSort,
  initialTime,
}) => {
  const router = useRouter();
  const [subreddit, setSubreddit] = useState(initialSubreddit);
  const [sort, setSort] = useState<string>(initialSort);
  const [time, setTime] = useState<string>(initialTime);

  useEffect(() => {
    if (!subreddit || !sort || !time) return;
    router.replace(getSubredditPath(subreddit, sort, time).pathname);
  }, [subreddit, sort, time]);

  useEffect(() => {
    setSubreddit(initialSubreddit);
    setSort(initialSort);
    setTime(initialTime);
  }, [initialSubreddit, initialSort, initialTime]);

  const { data: subredditAbout } = useReddit<RedditSubreddit>(
    subreddit === "popular" || subreddit === "all"
      ? null
      : {
          method: "GET",
          path: `/r/${subreddit}/about`,
        }
  );
  const { data: subredditRules } = useReddit<RedditRules>(
    subreddit === "popular" || subreddit === "all"
      ? null
      : {
          method: "GET",
          path: `/r/${subreddit}/about/rules`,
        }
  );

  let top =
    subreddit === "popular" || subreddit === "all" ? null : (
      <SubredditBanner subreddit={subreddit} subredditAbout={subredditAbout} />
    );

  let subredditInfoDisplay;
  switch (subreddit) {
    case undefined:
      subredditInfoDisplay = null;
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
                <Card p="0">
                  <ButtonGroup w="full" variant="outline" p="2">
                    <Button
                      value="hot"
                      rounded="full"
                      isActive={sort === "hot"}
                      leftIcon={<CalendarIcon />}
                      onClick={setValue(setSort)}
                    >
                      Hot
                    </Button>
                    <Button
                      value="new"
                      rounded="full"
                      isActive={sort === "new"}
                      leftIcon={<TimeIcon />}
                      onClick={setValue(setSort)}
                    >
                      New
                    </Button>
                    <Button
                      value="top"
                      rounded="full"
                      isActive={sort === "top"}
                      leftIcon={<StarIcon />}
                      onClick={setValue(setSort)}
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
                          <MenuItem value="hour" onClick={setValue(setTime)}>
                            Now
                          </MenuItem>
                          <MenuItem value="day" onClick={setValue(setTime)}>
                            Today
                          </MenuItem>
                          <MenuItem value="week" onClick={setValue(setTime)}>
                            This Week
                          </MenuItem>
                          <MenuItem value="month" onClick={setValue(setTime)}>
                            This Month
                          </MenuItem>
                          <MenuItem value="year" onClick={setValue(setTime)}>
                            This Year
                          </MenuItem>
                          <MenuItem value="all" onClick={setValue(setTime)}>
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
                      onClick={setValue(setSort)}
                    >
                      Rising
                    </Button>
                  </ButtonGroup>
                </Card>
                <SubredditPostsListings
                  subreddit={subreddit}
                  sort={sort}
                  time={time}
                />
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
                <Button
                  w="full"
                  value="hot"
                  isActive={sort === "hot"}
                  rounded="full"
                  leftIcon={<CalendarIcon />}
                  onClick={setValue(setSort, onClose)}
                >
                  Hot
                </Button>
                <Button
                  w="full"
                  value="new"
                  isActive={sort === "new"}
                  rounded="full"
                  leftIcon={<TimeIcon />}
                  onClick={setValue(setSort, onClose)}
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
                        ? setValue(setSort, onClose)
                        : setValue(setSort)
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
                          onClick={setValue(setTime, onClose)}
                        >
                          Now
                        </MenuItem>
                        <MenuItem
                          value="day"
                          onClick={setValue(setTime, onClose)}
                        >
                          Today
                        </MenuItem>
                        <MenuItem
                          value="week"
                          onClick={setValue(setTime, onClose)}
                        >
                          This Week
                        </MenuItem>
                        <MenuItem
                          value="month"
                          onClick={setValue(setTime, onClose)}
                        >
                          This Month
                        </MenuItem>
                        <MenuItem
                          value="year"
                          onClick={setValue(setTime, onClose)}
                        >
                          This Year
                        </MenuItem>
                        <MenuItem
                          value="all"
                          onClick={setValue(setTime, onClose)}
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
                  onClick={setValue(setSort, onClose)}
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

export default SubredditPage;
