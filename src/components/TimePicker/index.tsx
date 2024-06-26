import { Platform, StyleSheet, View } from 'react-native';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  eachMinuteOfInterval,
  endOfDay,
  format,
  isAfter,
  isEqual,
  startOfDay,
  startOfToday,
} from 'date-fns';
import Carousel from 'react-native-reanimated-carousel';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

import { Body, Button, ModalHeader, P, Time } from 'src/components';
import { getWidth, globalStyles, screenWidth } from 'src/design';
import { WarningSVG } from 'src/assets/icons';
import { isEmpty } from 'lodash';
import { useBottomSheet } from '@gorhom/bottom-sheet';

type Props = {
  currentDay: Date | null;
  closeModal: () => void;
  saveRange: (
    day: Date,
    object: {
      startTime: number;
      endTime: number;
    },
  ) => void;
  selectedDay: Record<string, {} | Record<string, number>>;
  growBottomSheet: (index: any) => void;
};

const baseOptions = {
  // vertical: false,
  width: 110,
  height: 96,
  snapEnabled: true,
  // scrollAnimationDuration: 100,
  modeConfig: {
    parallaxScrollingScale: 0.9,
    parallaxScrollingOffset: 50,
  },
  loop: false,
} as const;

let today = startOfToday();
const dayTimeIntervalArray = [
  ...eachMinuteOfInterval(
    {
      start: startOfDay(today),
      end: endOfDay(today),
    },
    { step: 15 },
  ),
  endOfDay(today),
];

const TimePicker: FC<Props> = ({
  currentDay,
  closeModal,
  saveRange,
  selectedDay,
  growBottomSheet,
}) => {
  const { snapToIndex } = useBottomSheet();
  const formatedDay = useMemo(() => {
    return currentDay
      ? format(currentDay, 'dd-MMM-yyyy')
      : format(new Date(), 'dd-MMM-yyyy');
  }, [currentDay]);

  const [startTime, setStartTime] = useState(24); // 24 is the index of 6 AM on dayTimeIntervalArray Array
  const [endTime, setEndTime] = useState(80); // 80 is the index of 8 PM on dayTimeIntervalArray Array

  useEffect(() => {
    const isTimePickedForDay =
      !!selectedDay[formatedDay] && !isEmpty(selectedDay[formatedDay]);

    if (isTimePickedForDay) {
      setStartTime(selectedDay[formatedDay].startTime);
      setEndTime(selectedDay[formatedDay].endTime);
    }

    if (currentDay === null) {
      setStartTime(24);
      setEndTime(80);
    }
  }, [selectedDay, formatedDay, currentDay]);

  // Commented out because generating dateInterval for each day causes performances issues in rendering,
  // I can get the time selected from the index later when i need to make API calls
  // const dayTimeIntervalArray = useMemo(() => {
  //   if (!currentDay) return [];
  //   return [
  //     ...eachMinuteOfInterval(
  //       {
  //         start: startOfDay(currentDay),
  //         end: endOfDay(currentDay),
  //       },
  //       { step: 15 },
  //     ),
  //     endOfDay(currentDay),
  //   ];
  // }, [currentDay]);

  const badRange = useMemo(
    () =>
      isAfter(dayTimeIntervalArray[startTime], dayTimeIntervalArray[endTime]) ||
      isEqual(dayTimeIntervalArray[startTime], dayTimeIntervalArray[endTime]),
    [startTime, endTime],
  );

  useEffect(() => {
    // Grow the BottomSheet if range is bad
    // if (badRange) {
    //   growBottomSheet(2);
    // } else {
    //   growBottomSheet(1);
    // }
  }, [badRange]);

  const handleProgressChange = (_: number, absoluteProgress: number) => {
    if (startTime !== absoluteProgress) {
      // Vibrate!
      RNReactNativeHapticFeedback.trigger('soft', {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ModalHeader
        date={currentDay ? currentDay : new Date()}
        closeModal={closeModal}
        // showHandle={true}
      />
      <View style={styles.start}>
        <Body text="Start work at" style={{ marginLeft: 20, marginTop: 20 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Carousel
              {...baseOptions}
              onProgressChange={handleProgressChange}
              data={dayTimeIntervalArray}
              defaultIndex={startTime}
              style={styles.carouselStyle}
              renderItem={({ item, index }) => (
                <Time time={item} index={index} currentTime={startTime} />
              )}
              onSnapToItem={index => setStartTime(index)}
            />
          </View>
        </View>
      </View>

      <View style={styles.start}>
        <Body text="End work by" style={{ marginLeft: 20, marginTop: 20 }} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Carousel
              {...baseOptions}
              onProgressChange={handleProgressChange}
              data={dayTimeIntervalArray}
              defaultIndex={endTime}
              style={styles.carouselStyle}
              renderItem={({ item, index }) => (
                <Time time={item} index={index} currentTime={endTime} />
              )}
              onSnapToItem={index => setEndTime(index)}
            />
          </View>
        </View>
      </View>
      {badRange && (
        <View
          style={{
            marginVertical: 20,
          }}>
          <View style={{ paddingHorizontal: 20, flexDirection: 'row' }}>
            <WarningSVG
              style={{
                marginTop: Platform.select({
                  ios: 4,
                  android: 6,
                }),
              }}
            />
            <P
              style={{ marginLeft: 20, fontFamily: 'FiraCode-Regular' }}
              text="Select an end time that’s later than your start time."
              type="danger"
            />
          </View>
        </View>
      )}
      <View style={styles.bottom}>
        <Button
          onPress={() =>
            currentDay && saveRange(currentDay, { startTime, endTime })
          }
          buttonText="Set time"
          disabled={badRange}
        />
      </View>
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  text: {
    width: getWidth(94),
    ...globalStyles.fillCenter,
    height: 96,
  },
  bottom: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F429',
  },
  start: {
    flex: 1,
  },
  carouselStyle: {
    width: screenWidth,
    ...globalStyles.fillCenter,
  },
});
