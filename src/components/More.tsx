import { Box, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { FC, MouseEventHandler, useState } from "react";

import { RedditMore } from "../lib/reddit/redditDataStructs";

type Props = {
  subreddit: string;
  article: string;
  more: RedditMore;
  loadMore: MouseEventHandler<HTMLButtonElement>;
};

const More: FC<Props> = ({ more, loadMore, subreddit, article }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClickMore: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsLoading(true);
    loadMore(event);
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
