import { ButtonGroup, PropsOf, useBreakpointValue } from "@chakra-ui/react";
import React, { FC } from "react";

import Card from "../Card";

type Props = {
  children: React.ReactNode;
} & PropsOf<typeof Card>;

const ButtonPanel: FC<Props> = ({ children, ...innerProps }) => {
  const hideButtonPanel = useBreakpointValue({ base: true, md: false });

  return (
    <Card hidden={hideButtonPanel} p="2" {...innerProps}>
      <ButtonGroup w="full" variant="outline">
        {children}
      </ButtonGroup>
    </Card>
  );
};

export default ButtonPanel;
