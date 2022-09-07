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
  PostsFilter,
  PostsFilterContext,
  defaultPostsPreset,
  negativePostsPreset,
  positivePostsPreset,
} from "../../lib/context/PostsFilterProvider";
import useLocalStorage from "../../lib/hooks/useLocalStorage";
import Card from "../Card";
import InputRangeSlider from "../InputRangeSlider";

type Props = BoxProps;

const FilterPostsPanel: FC<Props> = (props) => {
  const [savedPostsFilter, setSavedPostsFilter] =
    useLocalStorage("postsFilter");
  const { postsFilter, setPostsFilter } = useContext(PostsFilterContext);

  useEffect(() => {
    if (savedPostsFilter) setPostsFilter(savedPostsFilter);
  }, [savedPostsFilter, setPostsFilter]);

  const applyPreset = (preset: PostsFilter) => {
    setPostsFilter(preset);
    setSavedPostsFilter(preset);
  };

  const saveCurrentSettings = () => {
    setSavedPostsFilter(postsFilter);
  };

  return (
    <Card {...props}>
      <Heading size="lg">Filter Posts</Heading>
      <ButtonGroup w="full" variant="outline">
        <Tooltip label="Show more positive posts.">
          <Button
            w="full"
            colorScheme="blue"
            isActive={postsFilter.id === positivePostsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              if (postsFilter.id === positivePostsPreset.id) {
                applyPreset(defaultPostsPreset);
              } else {
                applyPreset(positivePostsPreset);
              }
            }}
          >
            Positive
          </Button>
        </Tooltip>
        <Tooltip label="Show more negative posts.">
          <Button
            w="full"
            colorScheme="red"
            isActive={postsFilter.id === negativePostsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              if (postsFilter.id === negativePostsPreset.id) {
                applyPreset(defaultPostsPreset);
              } else {
                applyPreset(negativePostsPreset);
              }
            }}
          >
            Negative
          </Button>
        </Tooltip>
        <Tooltip label="Show all posts.">
          <Button
            w="full"
            colorScheme="purple"
            isActive={postsFilter.id === defaultPostsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              applyPreset(defaultPostsPreset);
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
          defaultPostsPreset.minScore,
          defaultPostsPreset.maxScore,
        ]}
        value={[postsFilter.minScore, postsFilter.maxScore]}
        min={Number.NEGATIVE_INFINITY}
        max={Number.POSITIVE_INFINITY}
        sliderMin={-1000}
        sliderMax={1000}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({ ...postsFilter, id: null, minScore: value });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({ ...postsFilter, id: null, maxScore: value });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minScore: value[0],
            maxScore: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Tooltip label="The ratio of upvotes to total votes on a post.">
        <Heading size="md">By Upvote Ratio</Heading>
      </Tooltip>
      <InputRangeSlider
        placeholderValue={[
          defaultPostsPreset.minUpvoteRatio,
          defaultPostsPreset.maxUpvoteRatio,
        ]}
        value={[postsFilter.minUpvoteRatio, postsFilter.maxUpvoteRatio]}
        min={0}
        max={1}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({ ...postsFilter, id: null, minUpvoteRatio: value });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({ ...postsFilter, id: null, maxUpvoteRatio: value });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minUpvoteRatio: value[0],
            maxUpvoteRatio: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Tooltip label="How positive or negative is the text content of a post. A positive value means a positive sentiment. A negative value means a negative sentiment.">
        <Heading size="md">By Text Sentiment</Heading>
      </Tooltip>
      <InputRangeSlider
        placeholderValue={[
          defaultPostsPreset.minTextSentiment,
          defaultPostsPreset.maxTextSentiment,
        ]}
        value={[postsFilter.minTextSentiment, postsFilter.maxTextSentiment]}
        min={-5}
        max={5}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minTextSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            maxTextSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minTextSentiment: value[0],
            maxTextSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Tooltip label="Combined score that determines the overall sentiment of a post.">
        <Heading size="md">By Aggregate Sentiment</Heading>
      </Tooltip>
      <InputRangeSlider
        placeholderValue={[
          defaultPostsPreset.minAggSentiment,
          defaultPostsPreset.maxAggSentiment,
        ]}
        value={[postsFilter.minAggSentiment, postsFilter.maxAggSentiment]}
        min={-1}
        max={1}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minAggSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            maxAggSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
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

export default FilterPostsPanel;
