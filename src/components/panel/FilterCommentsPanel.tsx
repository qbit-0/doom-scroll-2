import {
  BoxProps,
  Button,
  ButtonGroup,
  Heading,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { FC, useContext, useEffect } from "react";

import {
  CommentsFilter,
  CommentsFilterContext,
  defaultCommentsPreset,
  negativeCommentsPreset,
  positiveCommentsPreset,
} from "../../lib/context/CommentsFilterProvider";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import Card from "../Card";
import InputRangeSlider from "../InputRangeSlider";

type Props = BoxProps;

const FilterCommentsPanel: FC<Props> = (props) => {
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
    <Card {...props}>
      <Heading size="lg">Filter Comments</Heading>
      <ButtonGroup w="full" variant="outline">
        <Tooltip label="Show more positive comments.">
          <Button
            w="full"
            colorScheme="blue"
            isActive={commentsFilter.id === positiveCommentsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              applyPreset(positiveCommentsPreset);
            }}
          >
            Positive
          </Button>
        </Tooltip>
        <Tooltip label="Show more negative comments.">
          <Button
            w="full"
            colorScheme="red"
            isActive={commentsFilter.id === negativeCommentsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              applyPreset(negativeCommentsPreset);
            }}
          >
            Negative
          </Button>
        </Tooltip>
        <Tooltip label="Show all comments.">
          <Button
            w="full"
            colorScheme="purple"
            isActive={commentsFilter.id === defaultCommentsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              applyPreset(defaultCommentsPreset);
            }}
          >
            Default
          </Button>
        </Tooltip>
      </ButtonGroup>

      <Tooltip label="Upvotes subtracted by downvotes.">
        <Heading size="md">By Score</Heading>
      </Tooltip>
      <InputRangeSlider
        placeholderValue={[
          defaultCommentsPreset.minCommentScore,
          defaultCommentsPreset.maxCommentScore,
        ]}
        value={[commentsFilter.minCommentScore, commentsFilter.maxCommentScore]}
        min={Number.NEGATIVE_INFINITY}
        max={Number.POSITIVE_INFINITY}
        sliderMin={-1000}
        sliderMax={1000}
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

      <Tooltip label="How positive or negative is the text content of a comment. A positive value means a positive sentiment. A negative value means a negative sentiment.">
        <Heading size="md">By Text Sentiment</Heading>
      </Tooltip>
      <InputRangeSlider
        placeholderValue={[
          defaultCommentsPreset.minTextSentiment,
          defaultCommentsPreset.maxTextSentiment,
        ]}
        value={[
          commentsFilter.minTextSentiment,
          commentsFilter.maxTextSentiment,
        ]}
        min={-5}
        max={5}
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

      <Tooltip label="Combined score that determines the overall sentiment of a comment.">
        <Heading size="md">By Aggregate Sentiment</Heading>
      </Tooltip>
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
    </Card>
  );
};

export default FilterCommentsPanel;
