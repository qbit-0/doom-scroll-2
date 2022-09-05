import {
  Box,
  Flex,
  FlexProps,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderMark,
  RangeSliderMarkProps,
  RangeSliderProps,
  RangeSliderThumb,
  RangeSliderTrack,
  ThemingProps,
  UseCounterProps,
} from "@chakra-ui/react";
import React, { FC } from "react";

import { defaultPostsPreset } from "../lib/context/PostsFilterProvider";

type Props = {
  size?: ThemingProps["size"];
  placeholderValue: [number, number];
  value: [number | undefined, number | undefined];
  min: number;
  max: number;
  step: number;
  onMinChange: UseCounterProps["onChange"];
  onMaxChange: UseCounterProps["onChange"];
  onBothChange: RangeSliderProps["onChange"];
  onChangeEnd: RangeSliderProps["onChangeEnd"];
  sliderMarks?: React.ReactNode;
} & Omit<FlexProps, "onChange">;

const InputRangeSlider: FC<Props> = ({
  size,
  placeholderValue,
  value,
  min,
  max,
  step,
  onMinChange,
  onMaxChange,
  onBothChange,
  onChangeEnd,
  ...innerProps
}) => {
  const sliderMarkStyles: Omit<RangeSliderMarkProps, "value"> = {
    mt: "1",
    ml: "-2",
    textAlign: "center",
    color: "white",
    p: "0.5",
    fontSize: "sm",
  };

  return (
    <>
      <Flex columnGap="4" {...innerProps}>
        <NumberInput
          size={size}
          value={value[0] === undefined ? placeholderValue[0] : value[0]}
          min={min}
          max={value[1] === undefined ? placeholderValue[1] : value[1]}
          step={step}
          onChange={onMinChange}
        >
          <NumberInputField w="24" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Box w="full" h="full">
          <RangeSlider
            value={[
              value[0] === undefined ? placeholderValue[0] : value[0],
              value[1] === undefined ? placeholderValue[1] : value[1],
            ]}
            min={min}
            max={max}
            step={step}
            onChange={onBothChange}
            onChangeEnd={onChangeEnd}
          >
            <RangeSliderMark value={min} {...sliderMarkStyles}>
              {min}
            </RangeSliderMark>
            <RangeSliderMark value={max} {...sliderMarkStyles}>
              {max}
            </RangeSliderMark>
            <RangeSliderMark value={(min + max) / 2} {...sliderMarkStyles}>
              {(min + max) / 2}
            </RangeSliderMark>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Box>
        <NumberInput
          size={size}
          value={value[1] === undefined ? placeholderValue[1] : value[1]}
          min={value[0] === undefined ? placeholderValue[0] : value[0]}
          max={max}
          step={step}
          onChange={onMaxChange}
        >
          <NumberInputField w="24" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>
    </>
  );
};

export default InputRangeSlider;
