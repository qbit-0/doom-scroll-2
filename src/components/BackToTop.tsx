import { Button, ButtonProps } from "@chakra-ui/react";
import { FC, RefObject } from "react";

type Props = {
  topRef: RefObject<HTMLDivElement>;
} & ButtonProps;

const BackToTop: FC<Props> = ({ topRef, ...innerProps }) => {
  return (
    <Button
      onClick={() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" });
      }}
      {...innerProps}
    >
      Back to Top
    </Button>
  );
};

export default BackToTop;
