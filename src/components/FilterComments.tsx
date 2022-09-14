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
import {
  CommentsFilterContext,
  defaultCommentsPreset,
  negativeCommentsPreset,
  positiveCommentsPreset,
} from "../lib/context/CommentsFilterProvider";
import { DisplaySettingsContext } from "../lib/context/DisplaySettingsProvider";
import CustomNumberInput from "./CustomNumberInput";

type Props = {};

const FilterComments: FC<Props> = () => {
  const { commentsFilter, setCommentsFilter } = useContext(
    CommentsFilterContext
  );
  const { showAdvancedSettings } = useContext(DisplaySettingsContext);

  return (
    <ContentCard>
      <Heading size="lg">Filter Comments</Heading>
      <VStack divider={<StackDivider />}>
        <ButtonGroup w="full" variant="outline">
          <Button
            w="full"
            colorScheme="blue"
            isActive={commentsFilter.id === positiveCommentsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              setCommentsFilter(positiveCommentsPreset);
            }}
          >
            Positive
          </Button>
          <Button
            w="full"
            colorScheme="red"
            isActive={commentsFilter.id === negativeCommentsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              setCommentsFilter(negativeCommentsPreset);
            }}
          >
            Negative
          </Button>
          <Button
            w="full"
            colorScheme="purple"
            isActive={commentsFilter.id === defaultCommentsPreset.id}
            onClick={(event) => {
              event.stopPropagation();
              setCommentsFilter(defaultCommentsPreset);
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
                    defaultValue={defaultCommentsPreset.minScore}
                    value={commentsFilter.minScore}
                    min={defaultCommentsPreset.minScore}
                    max={commentsFilter.maxScore}
                    step={1}
                    onChange={(value) => {
                      setCommentsFilter({
                        ...commentsFilter,
                        id: null,
                        minScore: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultCommentsPreset.maxScore}
                    value={commentsFilter.maxScore}
                    min={commentsFilter.minScore}
                    max={defaultCommentsPreset.maxScore}
                    step={1}
                    onChange={(value) => {
                      setCommentsFilter({
                        ...commentsFilter,
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
                {`Text Sentiment: Sentiment of the comment's body`}
              </Heading>
              <HStack w="full">
                <Box w="full">
                  <Text textAlign="center">Min:</Text>
                  <CustomNumberInput
                    defaultValue={defaultCommentsPreset.minTextSentiment}
                    value={commentsFilter.minTextSentiment}
                    min={0}
                    max={commentsFilter.maxTextSentiment}
                    step={0.001}
                    onChange={(value) => {
                      setCommentsFilter({
                        ...commentsFilter,
                        id: null,
                        minTextSentiment: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultCommentsPreset.maxTextSentiment}
                    value={commentsFilter.maxTextSentiment}
                    min={commentsFilter.minTextSentiment}
                    max={1}
                    step={0.001}
                    onChange={(value) => {
                      setCommentsFilter({
                        ...commentsFilter,
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
                sentiment of comment
              </Heading>
              <HStack w="full">
                <Box w="full">
                  <Text textAlign="center">Min:</Text>
                  <CustomNumberInput
                    defaultValue={defaultCommentsPreset.minAggSentiment}
                    value={commentsFilter.minAggSentiment}
                    min={0}
                    max={commentsFilter.maxAggSentiment}
                    step={0.001}
                    onChange={(value) => {
                      setCommentsFilter({
                        ...commentsFilter,
                        id: null,
                        minAggSentiment: value,
                      });
                    }}
                  />
                </Box>
                <Box w="full">
                  <Text textAlign="center">Max:</Text>
                  <CustomNumberInput
                    defaultValue={defaultCommentsPreset.maxAggSentiment}
                    value={commentsFilter.maxAggSentiment}
                    min={commentsFilter.minAggSentiment}
                    max={1}
                    step={0.001}
                    onChange={(value) => {
                      setCommentsFilter({
                        ...commentsFilter,
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

export default FilterComments;
