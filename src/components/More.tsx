import { Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, MouseEventHandler, useState } from "react";

import useReddit from "../lib/hooks/useReddit";
import { RedditComment, RedditMore } from "../lib/reddit/redditDataStructs";

type Props = {
  subreddit: string;
  article: string;
  more: RedditMore;
  updateReplies: (replies: (RedditComment | RedditMore)[]) => void;
};

const More: FC<Props> = ({ more, updateReplies, subreddit, article }) => {
  const [isLoading, setIsLoading] = useState(false);
  const moreChildren = useReddit<any>(
    isLoading
      ? {
          method: "POST",
          path: "/api/morechildren",
          query: {
            api_type: "json",
            id: more.data.id,
            link_id: `t3_${article}`,
          },
          data: new URLSearchParams({
            children: more.data.children.join(","),
          }).toString(),
        }
      : null
  );

  const handleClickMore: MouseEventHandler<HTMLButtonElement> = async () => {
    setIsLoading(true);
    // await new Promise((resolve, reject) => {
    //   while (!moreChildren);
    //   resolve(true);
    // });
    updateReplies(moreChildren["json"]["data"]["things"]);
  };

  return (
    <Box w="full">
      {more.data.count > 0 ? (
        <Button isLoading={isLoading} onClick={handleClickMore}>{`${
          more.data.count
        } more ${more.data.count > 1 ? "replies" : "reply"}`}</Button>
      ) : (
        <NextLink
          href={`/r/${subreddit}/comments/${article}/comment/${more.data.parent_id.slice(
            3,
            more.data.parent_id.length
          )}`}
        >
          <Button>Continue Thread</Button>
        </NextLink>
      )}
    </Box>
  );
};

export default More;
