import React, { FC } from "react";

import NavBar from "./NavBar";

type Props = {
  children: React.ReactNode;
};

const Frame: FC<Props> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default Frame;
