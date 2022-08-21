import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSearchPosts } from "../lib/reddit/redditClientApi";
import Posts from "./Posts";

type Props = {
  searchQuery: string;
  sort: string;
  time: string;
  loadNext: boolean;
};

const SearchPostsListings: FC<Props> = ({
  searchQuery,
  sort,
  time,
  loadNext,
}) => {
  const [postListings, setPostListings] = useState<any[] | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      setPostListings(null);
      setAfter(null);
      const postsResponse = await getSearchPosts(searchQuery, sort, time);
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data.data.after);
    })();
  }, [me, searchQuery, sort, time]);

  useEffect(() => {
    if (postListings && after && loadNext) {
      (async () => {
        const postsResponse = await getSearchPosts(
          searchQuery,
          sort,
          time,
          after
        );
        setPostListings([...postListings, postsResponse.data]);
        setAfter(postsResponse.data.data.after);
      })();
    }
  }, [searchQuery, sort, time, postListings, after, loadNext]);

  return <Posts postListings={postListings} />;
};

export default SearchPostsListings;
