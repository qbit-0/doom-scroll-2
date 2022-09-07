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
    <Box ref={carouselRef} w="lg" {...innerProps}>
      <Slider
        dotsClass="slick-dots slick-thumb"
        infinite={false}
        speed={300}
        slidesToShow={1}
        slidesToScroll={1}
        swipeToSlide={true}
        adaptiveHeight
      >
        {srcs.map((src, index) => {
          return (
            <Image
              src={src}
              alt={`image-${index}`}
              objectFit="contain"
              maxH="md"
              key={index}
            />
          );
        })}
      </Slider>
    </Box>
  );
};

export default Carousel;
