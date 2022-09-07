import { ChevronUpIcon } from "@chakra-ui/icons";
import { ButtonProps, IconButton } from "@chakra-ui/react";
import { FC, RefObject } from "react";

type Props = {
  topRef: RefObject<HTMLDivElement>;
} & ButtonProps;

const BackToTop: FC<Props> = ({ topRef, ...innerProps }) => {
  return (
    <IconButton
      zIndex={20}
      colorScheme="red"
      icon={<ChevronUpIcon />}
      aria-label="back to top"
      rounded="full"
      onClick={() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }}
      {...innerProps}
    />
  );
};

export default BackToTop;
