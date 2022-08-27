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
import { FC, useEffect, useState } from "react";

import useLocalStorage from "../lib/hooks/useLocalStorage";

type PostsSettingsPreset = {
  id: number;
  minUpvoteRatio: number;
  maxUpvoteRatio: number;
  minTitleSentiment: number;
  maxTitleSentiment: number;
  minCommentsSentiment: number;
  maxCommentsSentiment: number;
  minAggregateSentiment: number;
  maxAggregateSentiment: number;
  upvoteRatioWeight: number;
  titleSentimentWeight: number;
  commentsSentimentWeight: number;
};

const defaultPreset: PostsSettingsPreset = {
  id: 0,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTitleSentiment: -5,
  maxTitleSentiment: 5,
  minCommentsSentiment: -5,
  maxCommentsSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

const positivePreset: PostsSettingsPreset = {
  id: 1,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTitleSentiment: -5,
  maxTitleSentiment: 5,
  minCommentsSentiment: -5,
  maxCommentsSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

const negativePreset: PostsSettingsPreset = {
  id: 2,
  minUpvoteRatio: 0,
  maxUpvoteRatio: 1,
  minTitleSentiment: -5,
  maxTitleSentiment: 5,
  minCommentsSentiment: -5,
  maxCommentsSentiment: 5,
  minAggregateSentiment: -5,
  maxAggregateSentiment: 5,
  upvoteRatioWeight: 0.5,
  titleSentimentWeight: 0.25,
  commentsSentimentWeight: 0.25,
};

type Props = BoxProps;

const DoomScrollFilterPostsSettings: FC<Props> = (props) => {
  const [postsSettings, setPostsSettings] = useLocalStorage("postsSettings");

  const [preset, setPreset] = useState<number | null>(0);

  const [minUpvoteRatio, setMinUpvoteRatio] = useState(
    defaultPreset.minUpvoteRatio
  );
  const [maxUpvoteRatio, setMaxUpvoteRatio] = useState(
    defaultPreset.maxUpvoteRatio
  );
  const [minTitleSentiment, setMinTitleSentiment] = useState(
    defaultPreset.minTitleSentiment
  );
  const [maxTitleSentiment, setMaxTitleSentiment] = useState(
    defaultPreset.maxTitleSentiment
  );
  const [minCommentsSentiment, setMinCommentsSentiment] = useState(
    defaultPreset.minCommentsSentiment
  );
  const [maxCommentsSentiment, setMaxCommentsSentiment] = useState(
    defaultPreset.maxCommentsSentiment
  );
  const [minAggregateSentiment, setMinAggregateSentiment] = useState(
    defaultPreset.minAggregateSentiment
  );
  const [maxAggregateSentiment, setMaxAggregateSentiment] = useState(
    defaultPreset.maxAggregateSentiment
  );

  useEffect(() => {
    if (!postsSettings) return;

    if (postsSettings.preset !== undefined) setPreset(postsSettings.preset);
    if (postsSettings.minUpvoteRatio !== undefined)
      setMinUpvoteRatio(postsSettings.minUpvoteRatio);
    if (postsSettings.maxUpvoteRatio !== undefined)
      setMaxUpvoteRatio(postsSettings.maxUpvoteRatio);
    if (postsSettings.minTitleSentiment !== undefined)
      setMinTitleSentiment(postsSettings.minTitleSentiment);
    if (postsSettings.maxTitleSentiment !== undefined)
      setMaxTitleSentiment(postsSettings.maxTitleSentiment);
    if (postsSettings.minCommentsSentiment !== undefined)
      setMinCommentsSentiment(postsSettings.minCommentsSentiment);
    if (postsSettings.maxCommentsSentiment !== undefined)
      setMaxCommentsSentiment(postsSettings.maxCommentsSentiment);
    if (postsSettings.minAggregateSentiment !== undefined)
      setMinAggregateSentiment(postsSettings.minAggregateSentiment);
    if (postsSettings.maxAggregateSentiment !== undefined)
      setMaxAggregateSentiment(postsSettings.maxAggregateSentiment);
  }, [postsSettings]);

  const saveSettings = (settings: Record<string, any>) => {
    setPostsSettings({
      ...postsSettings,
      ...settings,
    });
  };

  const saveCurrentSettings = () => {
    saveSettings({
      preset,
      minUpvoteRatio,
      maxUpvoteRatio,
      minTitleSentiment,
      maxTitleSentiment,
      minCommentsSentiment,
      maxCommentsSentiment,
      minAggregateSentiment,
      maxAggregateSentiment,
    });
  };

  const applyPreset = (preset: PostsSettingsPreset) => {
    setPreset(preset.id);
    setMinUpvoteRatio(preset.minUpvoteRatio);
    setMaxUpvoteRatio(preset.maxUpvoteRatio);
    setMinTitleSentiment(preset.minTitleSentiment);
    setMaxTitleSentiment(preset.maxTitleSentiment);
    setMinCommentsSentiment(preset.minCommentsSentiment);
    setMaxCommentsSentiment(preset.maxCommentsSentiment);
    setMinAggregateSentiment(preset.minAggregateSentiment);
    setMaxAggregateSentiment(preset.maxAggregateSentiment);
    saveSettings({
      preset: preset.id,
      minUpvoteRatio: preset.minUpvoteRatio,
      maxUpvoteRatio: preset.maxUpvoteRatio,
      minTitleSentiment: preset.minTitleSentiment,
      maxTitleSentiment: preset.maxTitleSentiment,
      minCommentsSentiment: preset.minCommentsSentiment,
      maxCommentsSentiment: preset.maxCommentsSentiment,
      minAggregateSentiment: preset.minAggregateSentiment,
      maxAggregateSentiment: preset.maxAggregateSentiment,
    });
  };

  return (
    <Box {...props}>
      <Heading size="md">Filter Posts</Heading>
      <ButtonGroup w="full">
        <Button
          colorScheme="blue"
          variant={preset === positivePreset.id ? "solid" : "outline"}
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(positivePreset);
          }}
        >
          Positive
        </Button>
        <Button
          colorScheme="red"
          variant={preset === negativePreset.id ? "solid" : "outline"}
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(negativePreset);
          }}
        >
          Negative
        </Button>
        <Button
          colorScheme="blackAlpha"
          variant={preset === defaultPreset.id ? "solid" : "outline"}
          onClick={(event) => {
            event.stopPropagation();
            applyPreset(defaultPreset);
          }}
        >
          Default
        </Button>
      </ButtonGroup>
      <Text>By Upvote Ratio</Text>
      <RangeSlider
        value={[minUpvoteRatio, maxUpvoteRatio]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setMinUpvoteRatio(value[0]);
          setMaxUpvoteRatio(value[1]);
          setPreset(null);
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${minUpvoteRatio}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${maxUpvoteRatio}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>

      <Text>By Title Sentiment</Text>
      <RangeSlider
        value={[minTitleSentiment, maxTitleSentiment]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setMinTitleSentiment(value[0]);
          setMaxTitleSentiment(value[1]);
          setPreset(null);
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${minTitleSentiment}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${maxTitleSentiment}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>

      <Text>By Comments Sentiment</Text>
      <RangeSlider
        value={[minCommentsSentiment, maxCommentsSentiment]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setMinCommentsSentiment(value[0]);
          setMaxCommentsSentiment(value[1]);
          setPreset(null);
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${minCommentsSentiment}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${maxCommentsSentiment}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>

      <Text>By Aggregate Sentiment</Text>
      <RangeSlider
        value={[minAggregateSentiment, maxAggregateSentiment]}
        min={0}
        max={1}
        step={0.01}
        onChange={(value: [number, number]) => {
          setMinAggregateSentiment(value[0]);
          setMaxAggregateSentiment(value[1]);
          setPreset(null);
        }}
        onChangeEnd={saveCurrentSettings}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <Tooltip hasArrow label={`${minAggregateSentiment}`}>
          <RangeSliderThumb index={0} />
        </Tooltip>
        <Tooltip hasArrow label={`${maxAggregateSentiment}`}>
          <RangeSliderThumb index={1} />
        </Tooltip>
      </RangeSlider>
    </Box>
  );
};

export default DoomScrollFilterPostsSettings;
