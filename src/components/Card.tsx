import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type Props = BoxProps;

const Card: FC<Props> = (props) => {
  return (
    <Box
      borderWidth={1}
      borderColor="red"
      w="full"
      rounded="md"
      p="4"
      {...props}
    >
      {props.children}
    </Box>
  );
};

export default Card;
