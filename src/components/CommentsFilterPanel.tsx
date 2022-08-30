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
  const [commentsFilter, setCommentsFilter] = useContext(CommentsFilterContext);

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
          colorScheme="blackAlpha"
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

      <Text>By Comment Sentiment</Text>
      <InputRangeSlider
        value={[
          commentsFilter.minCommentSentiment,
          commentsFilter.maxCommentSentiment,
        ]}
        min={-5}
        max={5}
        step={0.001}
        onMinChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minCommentSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            maxCommentSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minCommentSentiment: value[0],
            maxCommentSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Text>By Aggregate Sentiment</Text>
      <InputRangeSlider
        value={[
          commentsFilter.minAggregateSentiment,
          commentsFilter.maxAggregateSentiment,
        ]}
        min={-5}
        max={5}
        step={0.001}
        onMinChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minAggregateSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            maxAggregateSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setCommentsFilter({
            ...commentsFilter,
            id: null,
            minAggregateSentiment: value[0],
            maxAggregateSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />
    </Box>
  );
};

export default CommentsFilterPanel;
