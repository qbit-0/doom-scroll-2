import {
  AddIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MinusIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useNumberInput,
} from "@chakra-ui/react";
import React, { FC } from "react";

type Props = {
  defaultValue: number;
  value?: number | null;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  sliderMarks?: React.ReactNode;
};

const CustomNumberInput: FC<Props> = ({
  defaultValue,
  value,
  min,
  max,
  step,
  onChange,
}) => {
  value = value === null ? defaultValue : value;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      value,
      min,
      max,
      step,
      onChange: (value) => {
        onChange(Number.parseFloat(value));
      },
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <VStack spacing={0}>
      <ButtonGroup w="full" variant="outline" isAttached>
        <Button w="full" roundedBottom="none" {...inc}>
          <ChevronUpIcon />
        </Button>
        {max !== undefined && (
          <Button
            w="full"
            roundedBottom="none"
            isDisabled={value === max}
            onClick={() => {
              onChange(max);
            }}
          >
            Max
          </Button>
        )}
      </ButtonGroup>
      <Input rounded="none" textAlign="center" {...input}></Input>
      <ButtonGroup w="full" variant="outline" isAttached>
        <Button w="full" roundedTop="none" {...dec}>
          <ChevronDownIcon />
        </Button>
        {min !== undefined && (
          <Button
            w="full"
            roundedTop="none"
            isDisabled={value === min}
            onClick={() => {
              onChange(min);
            }}
          >
            Min
          </Button>
        )}
      </ButtonGroup>
    </VStack>
  );
};

export default CustomNumberInput;
