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

type Props = {
  size?: ThemingProps["size"];
  placeholderValue: [number | null, number | null];
  value: [number | null | undefined, number | null | undefined];
  min: number;
  max: number;
  sliderMin?: number;
  sliderMax?: number;
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
  sliderMin,
  sliderMax,
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

  if (value[0] === undefined) value[0] = placeholderValue[0];
  if (value[0] === null) value[0] = min;

  if (value[1] === undefined) value[1] = placeholderValue[1];
  if (value[1] === null) value[1] = max;

  if (sliderMin === undefined) sliderMin = min;
  if (sliderMax === undefined) sliderMax = max;

  return (
    <>
      <Flex columnGap="4" {...innerProps}>
        <NumberInput
          size={size}
          value={value[0]}
          min={min}
          max={value[1]}
          step={step}
          onChange={onMinChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Box w="full" h="full">
          <RangeSlider
            value={[value[0], value[1]]}
            min={min < sliderMin ? sliderMin - step : sliderMin}
            max={max > sliderMax ? sliderMax + step : sliderMax}
            step={step}
            onChange={(value: [number, number]) => {
              if (value[0] < (sliderMin as number)) value[0] = min;
              if (value[1] > (sliderMax as number)) value[1] = max;
              if (onBothChange) onBothChange(value);
            }}
            onChangeEnd={onChangeEnd}
          >
            <RangeSliderMark value={sliderMin} {...sliderMarkStyles}>
              {sliderMin}
            </RangeSliderMark>
            <RangeSliderMark value={sliderMax} {...sliderMarkStyles}>
              {sliderMax}
            </RangeSliderMark>
            <RangeSliderMark
              value={(sliderMin + sliderMax) / 2}
              {...sliderMarkStyles}
            >
              {(sliderMin + sliderMax) / 2}
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
          value={value[1]}
          min={value[0]}
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
