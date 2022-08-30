import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Heading,
  Text,
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
import InputRangeSlider from "./InputRangeSlider";

type Props = BoxProps;

const PostsFilterPanel: FC<Props> = (props) => {
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
          w="full"
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
          w="full"
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
          w="full"
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
      <InputRangeSlider
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

      <Text>By Title Sentiment</Text>
      <InputRangeSlider
        value={[postsFilter.minTitleSentiment, postsFilter.maxTitleSentiment]}
        min={-5}
        max={5}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minTitleSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            maxTitleSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minTitleSentiment: value[0],
            maxTitleSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Text>By Comments Sentiment</Text>
      <InputRangeSlider
        value={[
          postsFilter.minCommentsSentiment,
          postsFilter.maxCommentsSentiment,
        ]}
        min={-5}
        max={5}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minCommentsSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            maxCommentsSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minCommentsSentiment: value[0],
            maxCommentsSentiment: value[1],
          });
        }}
        onChangeEnd={saveCurrentSettings}
      />

      <Text>By Aggregate Sentiment</Text>
      <InputRangeSlider
        value={[
          postsFilter.minAggregateSentiment,
          postsFilter.maxAggregateSentiment,
        ]}
        min={-5}
        max={5}
        step={0.001}
        onMinChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            minAggregateSentiment: value,
          });
        }}
        onMaxChange={(_, value) => {
          setPostsFilter({
            ...postsFilter,
            id: null,
            maxAggregateSentiment: value,
          });
        }}
        onBothChange={(value: [number, number]) => {
          setPostsFilter({
            ...postsFilter,
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

export default PostsFilterPanel;
