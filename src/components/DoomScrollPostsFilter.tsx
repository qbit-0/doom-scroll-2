import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
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
} from "../lib/context/PostsFilterProvider";
import useLocalStorage from "../lib/hooks/useLocalStorage";

type Props = BoxProps;

const DoomScrollFilterPostsSettings: FC<Props> = (props) => {
  const [savedPostsFilter, setSavedPostsFilter] =
    useLocalStorage("postsFilter");

  const [postsFilter, setPostsFilter] = useContext(PostsFilterContext);

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
    <Box {...props}>
      <Heading size="md">Filter Posts</Heading>
      <ButtonGroup w="full">
        <Button
          colorScheme="blue"
          variant={
            postsFilter.id === positivePostsPreset.id ? "solid" : "outline"
          }
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(positivePostsPreset);
          }}
        >
          Positive
        </Button>
        <Button
          colorScheme="red"
          variant={
            postsFilter.id === negativePostsPreset.id ? "solid" : "outline"
          }
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(negativePostsPreset);
          }}
        >
          Negative
        </Button>
        <Button
          colorScheme="blackAlpha"
          variant={
            postsFilter.id === defaultPostsPreset.id ? "solid" : "outline"
          }
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(defaultPostsPreset);
          }}
        >
          Default
        </Button>
      </ButtonGroup>
      <Text>By Upvote Ratio</Text>
      <RangeSlider
        value={[postsFilter.minUpvoteRatio, postsFilter.maxUpvoteRatio]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minUpvoteRatio: value[0],
            maxUpvoteRatio: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${postsFilter.minUpvoteRatio}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${postsFilter.maxUpvoteRatio}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>

      <Text>By Title Sentiment</Text>
      <RangeSlider
        value={[postsFilter.minTitleSentiment, postsFilter.maxTitleSentiment]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minTitleSentiment: value[0],
            maxTitleSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${postsFilter.minTitleSentiment}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${postsFilter.maxTitleSentiment}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>

      <Text>By Comments Sentiment</Text>
      <RangeSlider
        value={[
          postsFilter.minCommentsSentiment,
          postsFilter.maxCommentsSentiment,
        ]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minCommentsSentiment: value[0],
            maxCommentsSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${postsFilter.minCommentsSentiment}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${postsFilter.maxCommentsSentiment}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>

      <Text>By Aggregate Sentiment</Text>
      <RangeSlider
        value={[
          postsFilter.minAggregateSentiment,
          postsFilter.maxAggregateSentiment,
        ]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minAggregateSentiment: value[0],
            maxAggregateSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${postsFilter.minAggregateSentiment}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${postsFilter.maxAggregateSentiment}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>
    </Box>
  );
};

export default DoomScrollFilterPostsSettings;
