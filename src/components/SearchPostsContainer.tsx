import axios from "axios";
import { FC, useEffect, useState } from "react";

import useAtBottom from "../lib/hooks/useAtBottom";
import useMe from "../lib/hooks/useMe";
import { getSearchPosts } from "../lib/reddit/redditAxios";
import { getSearchPath, getSubredditPath } from "../lib/reddit/redditUrlUtils";
import Posts from "./Posts";

type Props = {
  searchQuery: string;
  sort: string;
  time: string;
  initialPostListings: any[];
  loadNext: boolean;
};

const SearchPostsContainer: FC<Props> = ({
  searchQuery,
  sort,
  time,
  initialPostListings,
  loadNext,
}) => {
  const [postListings, setPostListings] = useState(initialPostListings);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      const postsResponse = await getSearchPosts(searchQuery, sort, time);
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, searchQuery, sort, time]);

  useEffect(() => {
    if (after && loadNext) {
      (async () => {
        const postsResponse = await getSearchPosts(
          searchQuery,
          sort,
          time,
          after
        );
        setPostListings([...postListings, postsResponse.data]);
        setAfter(postsResponse.data["data"]["after"]);
      })();
    }
  }, [searchQuery, sort, time, postListings, after, loadNext]);

  return <Posts postListings={postListings} />;
};

export default SearchPostsContainer;
