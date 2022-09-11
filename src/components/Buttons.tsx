import { ButtonGroup, useBreakpointValue } from "@chakra-ui/react";
import React, { FC } from "react";

import Card from "./Card";

type Props = {
  children: React.ReactNode;
};

const Buttons: FC<Props> = ({ children }) => {
  const hideButtonPanel = useBreakpointValue({ base: true, md: false });

  return (
    <Card boxProps={{ hidden: hideButtonPanel, p: "2" }}>
      <ButtonGroup w="full" variant="outline">
        {children}
      </ButtonGroup>
    </Card>
  );
};

export default Buttons;
