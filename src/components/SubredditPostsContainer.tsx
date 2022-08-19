import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSubredditPosts } from "../lib/reddit/redditAxios";
import Posts from "./Posts";

type Props = {
  subreddit: string;
  sort: string;
  time: string;
  initialPostListings: any[];
  loadNext: boolean;
};

const SubredditPostsContainer: FC<Props> = ({
  subreddit,
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
      const postsResponse = await getSubredditPosts(subreddit, sort, time);
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data["data"]["after"]);
    })();
  }, [me, subreddit, sort, time]);

  useEffect(() => {
    if (after && loadNext) {
      (async () => {
        const postsResponse = await getSubredditPosts(
          subreddit,
          sort,
          time,
          after
        );
        setPostListings([...postListings, postsResponse.data]);
        setAfter(postsResponse.data["data"]["after"]);
      })();
    }
  }, [sort, time, postListings, after, loadNext]);

  return <Posts postListings={postListings} />;
};

export default SubredditPostsContainer;
