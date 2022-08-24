import { FC, useContext, useEffect, useState } from "react";

import { getSubredditPosts } from "../lib/api/redditApi";
import { MeContext } from "../lib/context/MeProvider";
import useAtBottom from "../lib/hooks/useAtBottom";
import Posts from "./Posts";

type Props = {
  subreddit: string;
  sort: string;
  time: string;
};

const SubredditPostsListings: FC<Props> = ({ subreddit, sort, time }) => {
  const [postListings, setPostListings] = useState<any[] | null>(null);
  const [after, setAfter] = useState<string | null>(null);
  const { me } = useContext(MeContext);
  const atBottom = useAtBottom(0);

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
    if (postListings && after && atBottom) {
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
  }, [subreddit, sort, time, postListings, after, atBottom]);

  return <Posts postListings={postListings} />;
};

export default SubredditPostsListings;
