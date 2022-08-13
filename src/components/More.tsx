import { Box, Button } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";

type Props = {
  more: any;
  handleClickMore: MouseEventHandler<HTMLButtonElement>;
};

const More: FC<Props> = ({ more, handleClickMore }) => {
  const count = more["data"]["count"];
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
