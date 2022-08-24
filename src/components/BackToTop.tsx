import { Button } from "@chakra-ui/react";
import { FC, RefObject, useRef } from "react";

type Props = {
  topRef: RefObject<HTMLDivElement>;
};

const BackToTop: FC<Props> = ({ topRef }) => {
  return (
    <Button
      onClick={() => {
        topRef.current?.scrollIntoView();
      }}
    >
      Back to Top
    </Button>
  );
};

export default BackToTop;
