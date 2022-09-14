import { Image, useBoolean } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  src: string;
  blur?: boolean;
};

const CustomImage: FC<Props> = ({ src, blur }) => {
  const [blurOverride, setBlurOverride] = useBoolean();

  return (
    <Image
      src={src}
      alt="post image"
      objectFit="contain"
      dropShadow="lg"
      onClick={() => {
        if (blur && !blurOverride) {
          setBlurOverride.on();
        } else {
          window.open(src, "_blank");
        }
      }}
      cursor="pointer"
      filter="auto"
      blur={blur && !blurOverride ? "30px" : "none"}
    />
  );
};

export default CustomImage;
