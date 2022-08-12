import { chakra } from "@chakra-ui/react";
import Image from "next/image";

const CustomImage = chakra(Image, {
  shouldForwardProp: (prop) => ["width", "height", "src", "alt"].includes(prop),
});

export default CustomImage;
