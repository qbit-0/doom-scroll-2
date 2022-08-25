import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Heading,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";

import Card from "./Card";

type Props = {};

const DoomScrollSettings: FC<Props> = () => {
  return (
    <Card>
      <Box p="4">
        <Heading>DoomScroll Settings</Heading>
        <Accordion allowMultiple>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Switch>Filter Posts</Switch>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <Text>Presets</Text>
              <Button>Good</Button>
              <Button>Neutral</Button>
              <Button>Bad</Button>
              <Button>Reset</Button>
              <Text>By Upvote Ratio</Text>
              <RangeSlider>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Button>Reset</Button>

              <Text>By Title Sentiment</Text>
              <RangeSlider>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Button>Reset</Button>

              <Text>By Comments Sentiment</Text>
              <RangeSlider>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Button>Reset</Button>

              <Text>By Aggregate Sentiment</Text>
              <RangeSlider>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
              <Button>Reset</Button>

              <Accordion allowMultiple>
                <AccordionItem>
                  <AccordionButton>
                    <Text>Post Agggregate Sentiment Weights</Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <Text>Upvote Ratio Weight</Text>
                    <Slider>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text>Title Sentiment Weight</Text>
                    <Slider>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Text>Comments Sentiment Weight</Text>
                    <Slider>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
                    <Button>Reset</Button>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <Switch>Filter Comments</Switch>
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel></AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </Card>
  );
};

export default DoomScrollSettings;
