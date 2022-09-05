import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Heading,
  NumberInput,
  Text,
} from "@chakra-ui/react";
import { FC, useContext, useEffect } from "react";

import {
  CommentsFilter,
  CommentsFilterContext,
  defaultCommentsPreset,
  negativeCommentsPreset,
  positiveCommentsPreset,
} from "../lib/context/CommentsFilterProvider";
import useLocalStorage from "../lib/hooks/useLocalStorage";
import InputRangeSlider from "./InputRangeSlider";

type Props = BoxProps;

const CommentsFilterPanel: FC<Props> = (props) => {
  const [savedCommentsFilter, setSavedCommentsFilter] =
    useLocalStorage("commentsFilter");
  const { commentsFilter, setCommentsFilter } = useContext(
    CommentsFilterContext
  );

  useEffect(() => {
    if (savedCommentsFilter) setCommentsFilter(savedCommentsFilter);
  }, [savedCommentsFilter, setCommentsFilter]);

  const applyPreset = (preset: CommentsFilter) => {
    setCommentsFilter(preset);
    setSavedCommentsFilter(preset);
  };

  const saveCurrentSettings = () => {
    setSavedCommentsFilter(commentsFilter);
  };

  return (
    <Box {...props}>
      <Heading size="md">Filter Comments</Heading>
      <ButtonGroup w="full">
        <Button
          w="full"
          colorScheme="blue"
          variant={
            commentsFilter.id === positiveCommentsPreset.id
              ? "solid"
              : "outline"
          }
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(positiveCommentsPreset);
          }}
        >
          Positive
        </Button>
        <Button
          w="full"
          colorScheme="red"
          variant={
            commentsFilter.id === negativeCommentsPreset.id
              ? "solid"
              : "outline"
          }
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(negativeCommentsPreset);
          }}
        >
          Negative
        </Button>
        <Button
          w="full"
          colorScheme="purple"
          variant={
            commentsFilter.id === defaultCommentsPreset.id ? "solid" : "outline"
          }
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(defaultCommentsPreset);
          }}
        >
          Default
        </Button>
      </ButtonGroup>

      <Text>By Comment Score (After Hyperbolic Tangent)</Text>
      <InputRangeSlider
        placeholderValue={[
          defaultCommentsPreset.minCommentScore,
          defaultCommentsPreset.maxCommentScore,
        ]}
        value={[commentsFilter.minCommentScore, commentsFilter.maxCommentScore]}
        min={-1}
        max={1}
        step={0.001}
        onMinChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minCommentScore: value,
          });
        }}
        onMaxChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            maxCommentScore: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minCommentScore: value[0],
            maxCommentScore: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Text>By Text Sentiment</Text>
      <InputRangeSlider
        placeholderValue={[
          defaultCommentsPreset.minTextSentiment,
          defaultCommentsPreset.maxTextSentiment,
        ]}
        value={[
          commentsFilter.minTextSentiment,
          commentsFilter.maxTextSentiment,
        ]}
        min={-1}
        max={1}
        step={0.001}
        onMinChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minTextSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            maxTextSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minTextSentiment: value[0],
            maxTextSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Text>By Aggregate Sentiment</Text>
      <InputRangeSlider
        placeholderValue={[
          defaultCommentsPreset.minAggSentiment,
          defaultCommentsPreset.maxAggSentiment,
        ]}
        value={[commentsFilter.minAggSentiment, commentsFilter.maxAggSentiment]}
        min={-1}
        max={1}
        step={0.001}
        onMinChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minAggSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            maxAggSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minAggSentiment: value[0],
            maxAggSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />
    </Box>
  );
};

export default CommentsFilterPanel;
