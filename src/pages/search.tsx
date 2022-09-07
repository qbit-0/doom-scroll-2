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
import { FC, ReactNode, useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";

import Card from "../components/Card";
import NavFrame from "../components/NavFrame";
import PageFrame from "../components/PageFrame";
import ButtonPanel from "../components/panel/ButtonPanel";
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

  const {
    isOpen: isSortModalOpen,
    onOpen: onSortModalOpen,
    onClose: onSortModalClose,
  } = useDisclosure();

  let content;
  if (searchQuery && sort && time && type) {
    switch (type) {
      case "link":
        content = (
          <>
            <ButtonPanel>
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
            </ButtonPanel>
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
    <>
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
          left={
            <>
              <ButtonPanel>
                <Button
                  value="link"
                  isActive={type === "link"}
                  onClick={setValue(setType)}
                >
                  Posts
                </Button>
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
              </ButtonPanel>
              {content}
            </>
          }
        />
      </NavFrame>
      <Modal
        isOpen={isSortModalOpen}
        onClose={onSortModalClose}
        isCentered
        size="md"
      >
        <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
        <ModalContent mt="4">
          <ModalBody p="2">
            <ButtonGroup display="flex" w="full" variant="outline" p="2">
              <VStack w="full">
                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    rightIcon={<ChevronDownIcon />}
                  >
                    {type === "link" && "Posts"}
                    {type === "sr" && "Communities"}
                    {type === "user" && "People"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      value="link"
                      onClick={setValue(setType, onSortModalClose)}
                    >
                      Posts
                    </MenuItem>
                    <MenuItem
                      value="sr"
                      onClick={setValue(setType, onSortModalClose)}
                    >
                      Communities
                    </MenuItem>
                    <MenuItem
                      value="user"
                      onClick={setValue(setType, onSortModalClose)}
                    >
                      People
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    rightIcon={<ChevronDownIcon />}
                  >
                    {sort === "relevance" && "Relevance"}
                    {sort === "hot" && "Hot"}
                    {sort === "top" && "Top"}
                    {sort === "new" && "New"}
                    {sort === "comments" && "Comments"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      value="relevance"
                      onClick={setValue(setSort, onSortModalClose)}
                    >
                      Relevance
                    </MenuItem>
                    <MenuItem
                      value="hot"
                      onClick={setValue(setSort, onSortModalClose)}
                    >
                      Hot
                    </MenuItem>
                    <MenuItem
                      value="top"
                      onClick={setValue(setSort, onSortModalClose)}
                    >
                      Top
                    </MenuItem>
                    <MenuItem
                      value="new"
                      onClick={setValue(setSort, onSortModalClose)}
                    >
                      New
                    </MenuItem>
                    <MenuItem
                      value="comments"
                      onClick={setValue(setSort, onSortModalClose)}
                    >
                      Comments
                    </MenuItem>
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    w="full"
                    rightIcon={<ChevronDownIcon />}
                  >
                    {time === "all" && "All Time"}
                    {time === "year" && "Past Year"}
                    {time === "month" && "Past Month"}
                    {time === "week" && "Past Week"}
                    {time === "day" && "Past 24 Hours"}
                    {time === "hour" && "Past Hour"}
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      value="all"
                      onClick={setValue(setTime, onSortModalClose)}
                    >
                      All Time
                    </MenuItem>
                    <MenuItem
                      value="year"
                      onClick={setValue(setTime, onSortModalClose)}
                    >
                      Past Year
                    </MenuItem>
                    <MenuItem
                      value="month"
                      onClick={setValue(setTime, onSortModalClose)}
                    >
                      Past Month
                    </MenuItem>
                    <MenuItem
                      value="week"
                      onClick={setValue(setTime, onSortModalClose)}
                    >
                      Past Week
                    </MenuItem>
                    <MenuItem
                      value="day"
                      onClick={setValue(setTime, onSortModalClose)}
                    >
                      Past 24 Hours
                    </MenuItem>
                    <MenuItem
                      value="hour"
                      onClick={setValue(setTime, onSortModalClose)}
                    >
                      Past Hour
                    </MenuItem>
                  </MenuList>
                </Menu>
              </VStack>
            </ButtonGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SearchPage;
