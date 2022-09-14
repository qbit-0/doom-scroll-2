import { ChevronUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { FC, RefObject } from "react";

type Props = {
  topRef: RefObject<HTMLDivElement>;
};

const BackToTop: FC<Props> = ({ topRef }) => {
  return (
    <IconButton
      zIndex={20}
      colorScheme="yellow"
      icon={<ChevronUpIcon />}
      aria-label="back to top"
      rounded="full"
      onClick={() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
};

export default BackToTop;
