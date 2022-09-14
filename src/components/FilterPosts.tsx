import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC, useContext } from "react";

import ContentCard from "../ContentCard";
import { DisplaySettingsContext } from "../lib/context/DisplaySettingsProvider";
import {
  PostsFilterContext,
  defaultPostsPreset,
  negativePostsPreset,
  positivePostsPreset,
} from "../lib/context/PostsFilterProvider";
import CustomNumberInput from "./CustomNumberInput";

type Props = {};

const FilterPosts: FC<Props> = () => {
  const { postsFilter, setPostsFilter } = useContext(PostsFilterContext);
  const { showAdvancedSettings } = useContext(DisplaySettingsContext);

  return (
    <ContentCard>
      <Heading size="lg">Filter Posts</Heading>
      <VStack divider={<StackDivider />}>
        <ButtonGroup w="full" variant="outline">
          <Button
            w="full"
            colorScheme="blue"
            isActive={postsFilter.id === positivePostsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              if (postsFilter.id === positivePostsPreset.id) {
                setPostsFilter(defaultPostsPreset);
              } else {
                setPostsFilter(positivePostsPreset);
              }
            }}
          >
            Positive
          </Button>
          <Button
            w="full"
            colorScheme="red"
            isActive={postsFilter.id === negativePostsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              if (postsFilter.id === negativePostsPreset.id) {
                setPostsFilter(defaultPostsPreset);
              } else {
                setPostsFilter(negativePostsPreset);
              }
            }}
          >
            Negative
          </Button>
          <Button
            w="full"
            colorScheme="purple"
            isActive={postsFilter.id === defaultPostsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              setPostsFilter(defaultPostsPreset);
            }}
          >
            Default
          </Button>
        </ButtonGroup>

        {showAdvancedSettings && (
          <>
            <VStack w="full" align="start">
              <Heading size="md">Score: Upvotes minus downvotes</Heading>
              <HStack w="full">
                <Box w="full">
                  <Text textAlign="center">Min:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.minUpvoteRatio}
                    value={postsFilter.minScore}
                    min={defaultPostsPreset.minScore}
                    max={postsFilter.maxScore}
                    step={1}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        minScore: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.maxScore}
                    value={postsFilter.maxScore}
                    min={postsFilter.minScore}
                    max={defaultPostsPreset.maxScore}
                    step={1}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        maxScore: value,
                      });
                    }}
                  />
                </Box>
              </HStack>
            </VStack>

            <VStack w="full" align="start">
              <Heading size="md">
                Upvote Ratio: Upvotes divided by total votes
              </Heading>
              <HStack w="full">
                <Box w="full">
                  <Text textAlign="center">Min:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.minUpvoteRatio}
                    value={postsFilter.minUpvoteRatio}
                    min={0}
                    max={postsFilter.maxUpvoteRatio}
                    step={0.001}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        minUpvoteRatio: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.maxUpvoteRatio}
                    value={postsFilter.maxUpvoteRatio}
                    min={postsFilter.minUpvoteRatio}
                    max={1}
                    step={0.001}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        maxUpvoteRatio: value,
                      });
                    }}
                  />
                </Box>
              </HStack>
            </VStack>

            <VStack w="full" align="start">
              <Heading size="md">
                {`Text Sentiment: Sentiment of the post's title and body`}
              </Heading>
              <HStack w="full">
                <Box w="full">
                  <Text textAlign="center">Min:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.minTextSentiment}
                    value={postsFilter.minTextSentiment}
                    min={0}
                    max={postsFilter.maxTextSentiment}
                    step={0.001}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        minTextSentiment: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.maxTextSentiment}
                    value={postsFilter.maxTextSentiment}
                    min={postsFilter.minTextSentiment}
                    max={1}
                    step={0.001}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        maxTextSentiment: value,
                      });
                    }}
                  />
                </Box>
              </HStack>
            </VStack>

            <VStack w="full" align="start">
              <Heading size="md">
                Aggregate Sentiment: Combined score representing overall
                sentiment of post
              </Heading>
              <HStack w="full">
                <Box w="full">
                  <Text textAlign="center">Min:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.minAggSentiment}
                    value={postsFilter.minAggSentiment}
                    min={0}
                    max={postsFilter.maxAggSentiment}
                    step={0.001}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        minAggSentiment: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultPostsPreset.maxAggSentiment}
                    value={postsFilter.maxAggSentiment}
                    min={postsFilter.minAggSentiment}
                    max={1}
                    step={0.001}
                    onChange={(value) => {
                      setPostsFilter({
                        ...postsFilter,
                        id: null,
                        maxAggSentiment: value,
                      });
                    }}
                  />
                </Box>
              </HStack>
            </VStack>
          </>
        )}
      </VStack>
    </ContentCard>
  );
};

export default FilterPosts;
