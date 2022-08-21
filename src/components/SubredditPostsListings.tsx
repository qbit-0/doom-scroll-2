import { FC, useEffect, useState } from "react";

import useMe from "../lib/hooks/useMe";
import { getSubredditPosts } from "../lib/reddit/redditClientApi";
import Posts from "./Posts";

type Props = {
  subreddit: string;
  sort: string;
  time: string;
  loadNext?: boolean;
};

const SubredditPostsListings: FC<Props> = ({
  subreddit,
  sort,
  time,
  loadNext = false,
}) => {
  const [postListings, setPostListings] = useState<any[] | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useMe();

  useEffect(() => {
    (async () => {
      setPostListings(null);
      setAfter(null);
      const postsResponse = await getSubredditPosts(subreddit, sort, time);
      setPostListings([postsResponse.data]);
      setAfter(postsResponse.data.data.after);
    })();
  }, [me, subreddit, sort, time]);

  useEffect(() => {
    if (postListings && after && loadNext) {
      (async () => {
        const postsResponse = await getSubredditPosts(
          subreddit,
          sort,
          time,
          after
        );
        setPostListings([...postListings, postsResponse.data]);
        setAfter(postsResponse.data.data.after);
      })();
    }
  }, [subreddit, sort, time, postListings, after, loadNext]);

  return <Posts postListings={postListings} />;
};

export default SubredditPostsListings;
