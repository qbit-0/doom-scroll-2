import { Button } from "@chakra-ui/react";
import { FC } from "react";

type Props = {};

const BackToTop: FC<Props> = () => {
  return (
    <Button
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      Back to Top
    </Button>
  );
};

export default BackToTop;
