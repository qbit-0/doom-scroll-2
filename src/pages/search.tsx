import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
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
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, FC } from "react";
import { IoFilter } from "react-icons/io5";

import NavFrame from "../components/NavFrame";
import PageFrame from "../components/PageFrame";
import ButtonPanel from "../components/panel/ButtonPanel";
import SearchPostsListings from "../components/panel_collection/SearchPostsListings";
import SubredditListings from "../components/panel_collection/SubredditListings";
import UserListings from "../components/panel_collection/UsersListings";
import SubredditProvider from "../lib/context/SubredditProvider";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchQuery = context.query["q"] || "";
  const sort = context.query["sort"] || "relevance";
  const time = context.query["t"] || "all";
  const type = context.query["type"] || "link";

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
  sort: string;
  time: string;
  type: string;
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

  let content;
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
                <MenuItem value="relevance" onClick={handleNavChange("sort")}>
                  Relevance
                </MenuItem>
                <MenuItem value="hot" onClick={handleNavChange("sort")}>
                  Hot
                </MenuItem>
                <MenuItem value="top" onClick={handleNavChange("sort")}>
                  Top
                </MenuItem>
                <MenuItem value="new" onClick={handleNavChange("sort")}>
                  New
                </MenuItem>
                <MenuItem value="comments" onClick={handleNavChange("sort")}>
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
                <MenuItem value="all" onClick={handleNavChange("time")}>
                  All Time
                </MenuItem>
                <MenuItem value="year" onClick={handleNavChange("time")}>
                  Past Year
                </MenuItem>
                <MenuItem value="month" onClick={handleNavChange("time")}>
                  Past Month
                </MenuItem>
                <MenuItem value="week" onClick={handleNavChange("time")}>
                  Past Week
                </MenuItem>
                <MenuItem value="day" onClick={handleNavChange("time")}>
                  Past 24 Hours
                </MenuItem>
                <MenuItem value="hour" onClick={handleNavChange("time")}>
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
          left={
            <>
              <ButtonPanel>
                <Button
                  value="link"
                  isActive={type === "link"}
                  onClick={handleNavChange("type")}
                >
                  Posts
                </Button>
                <Button
                  value="sr"
                  isActive={type === "sr"}
                  onClick={handleNavChange("type")}
                >
                  Communities
                </Button>
                <Button
                  value="user"
                  isActive={type === "user"}
                  onClick={handleNavChange("type")}
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
                      onClick={handleNavChange("type", onSortModalClose)}
                    >
                      Posts
                    </MenuItem>
                    <MenuItem
                      value="sr"
                      onClick={handleNavChange("type", onSortModalClose)}
                    >
                      Communities
                    </MenuItem>
                    <MenuItem
                      value="user"
                      onClick={handleNavChange("type", onSortModalClose)}
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
                      onClick={handleNavChange("sort", onSortModalClose)}
                    >
                      Relevance
                    </MenuItem>
                    <MenuItem
                      value="hot"
                      onClick={handleNavChange("sort", onSortModalClose)}
                    >
                      Hot
                    </MenuItem>
                    <MenuItem
                      value="top"
                      onClick={handleNavChange("sort", onSortModalClose)}
                    >
                      Top
                    </MenuItem>
                    <MenuItem
                      value="new"
                      onClick={handleNavChange("sort", onSortModalClose)}
                    >
                      New
                    </MenuItem>
                    <MenuItem
                      value="comments"
                      onClick={handleNavChange("sort", onSortModalClose)}
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
                      onClick={handleNavChange("time", onSortModalClose)}
                    >
                      All Time
                    </MenuItem>
                    <MenuItem
                      value="year"
                      onClick={handleNavChange("time", onSortModalClose)}
                    >
                      Past Year
                    </MenuItem>
                    <MenuItem
                      value="month"
                      onClick={handleNavChange("time", onSortModalClose)}
                    >
                      Past Month
                    </MenuItem>
                    <MenuItem
                      value="week"
                      onClick={handleNavChange("time", onSortModalClose)}
                    >
                      Past Week
                    </MenuItem>
                    <MenuItem
                      value="day"
                      onClick={handleNavChange("time", onSortModalClose)}
                    >
                      Past 24 Hours
                    </MenuItem>
                    <MenuItem
                      value="hour"
                      onClick={handleNavChange("time", onSortModalClose)}
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
    </SubredditProvider>
  );
};

export default SearchPage;
