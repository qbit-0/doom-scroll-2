import { Box, Button } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";

import { RedditMore } from "../lib/reddit/redditDataStructs";

type Props = {
  more: RedditMore;
  handleClickMore: MouseEventHandler<HTMLButtonElement>;
};

const More: FC<Props> = ({ more, handleClickMore }) => {
  const count = more.data.count;
  return (
    <Box w="full">
      {count > 0 ? (
        <Button onClick={handleClickMore}>{`${count} more ${
          count > 1 ? "replies" : "reply"
        }`}</Button>
      ) : (
        <Button>Continue Thread</Button>
      )}
    </Box>
  );
};

export default More;
