import { ComponentStyleConfig } from "@chakra-ui/react";

export const Card: ComponentStyleConfig = {
  baseStyle: {
    display: "flex",
    bgColor: "bg.100",
    borderWidth: [0, 0, 1],
    rounded: ["none", "none", "md"],
    borderColor: "gray.500",
    w: "full",
    p: "4",
    boxShadow: "md",
    overflow: "hidden",
  },
};
