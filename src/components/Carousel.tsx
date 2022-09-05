import { Box, BoxProps, Image } from "@chakra-ui/react";
import { FC, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type Props = {
  srcs: string[];
} & BoxProps;

const Carousel: FC<Props> = ({ srcs, ...innerProps }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <Box ref={carouselRef} w="md" {...innerProps}>
      <Slider
        dotsClass="slick-dots slick-thumb"
        infinite={false}
        speed={250}
        slidesToShow={3}
        slidesToScroll={1}
        swipeToSlide={true}
        customPaging={(index: number) => {
          return <Image src={srcs[index]} alt={`image-${index}`} />;
        }}
      >
        {srcs.map((src, index) => {
          return <Image src={src} alt={`image-${index}`} key={index} />;
        })}
      </Slider>
    </Box>
  );
};

export default Carousel;
