import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { add, format, parse, startOfToday } from 'date-fns';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdropProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { isEmpty } from 'lodash';

import { Calender, Header, TimePicker } from 'src/components';
import { Colors } from 'src/design';
import Timezone from './lib/Timezone';
import WeekDays from './lib/WeekDays';

const Availability = () => {
  let today = startOfToday();
  const snapPoints = useMemo(() => ['30%', '65%'], []); // Should add a new snappoint '70%' so that i  can grow the BottomSheet when error is present instead of compress but that gives a funny behaviour we can compress for now;

  const thisMonth = format(today, 'MMM-yyyy');
  const nextMonth = format(add(today, { months: 1 }), 'MMM-yyyy');
  const twoMonthAway = format(add(today, { months: 2 }), 'MMM-yyyy');

  let [currentDay, setCurrentDay] = useState<Date | null>(null);
  let [selectedDay, setSelectedDay] = useState<
    Record<string, Record<string, number> | {}>
  >({});

  const [renderedMonths, setRenderedMonths] = useState([
    thisMonth,
    nextMonth,
    twoMonthAway,
  ]);

  const renderItem: ListRenderItem<string> = ({ item }) => {
    return (
      <View key={`${item}`}>
        <Calender
          key={`${item}`}
          currentMonth={item}
          selectedDay={selectedDay}
          onPress={selectDay}
        />
      </View>
    );
  };

  const onScrollEnd = () => {
    // add new months as scroll reach end
    const theFollowingmonth = format(
      add(
        parse(
          renderedMonths[renderedMonths.length - 1],
          'MMM-yyyy',
          new Date(),
        ),
        { months: 1 },
      ),
      'MMM-yyyy',
    );
    setRenderedMonths(months => {
      return [...months, theFollowingmonth];
    });
  };

  const sheetRef = useRef<BottomSheet>(null);
  const handleSheetSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleCloseSheet = useCallback(() => {
    sheetRef.current?.close();
    setCurrentDay(null);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index > -1) {
      console.log('BottomSheet Opened');
    }
    if (index === -1) {
      console.log('BottomSheet Closed');
    }
  }, []);

  const selectDay = useCallback(
    (day: Date) => {
      setCurrentDay(day);
      const formatedDay = format(day, 'dd-MMM-yyyy');

      const isTimePickedForDay =
        !!selectedDay[formatedDay] && !isEmpty(selectedDay[formatedDay]);

      if (isTimePickedForDay) return handleSheetSnapPress(1);

      setSelectedDay(sd => {
        return {
          ...sd,
          [formatedDay]: {},
        };
      });

      handleSheetSnapPress(1);
    },
    [selectedDay, handleSheetSnapPress],
  );

  const saveTime = useCallback(
    (day: Date, object: { startTime: number; endTime: number }) => {
      const formatedDay = format(day, 'dd-MMM-yyyy');
      setSelectedDay(sd => {
        return {
          ...sd,
          [formatedDay]: object,
        };
      });
      handleCloseSheet();
    },
    [handleCloseSheet],
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} pressBehavior={'close'} />
    ),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <>
        <Header headerText="Availability" />
        <WeekDays />
        <View style={{ height: 390 }}>
          <FlatList
            data={renderedMonths}
            renderItem={renderItem}
            pagingEnabled
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => item}
            onEndReached={onScrollEnd}
          />
        </View>
        <Timezone day={today} />
      </>

      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        index={-1}
        onChange={handleSheetChanges}
        handleStyle={styles.handleStyle}
        handleIndicatorStyle={{
          backgroundColor: Colors.secondaryText,
        }}
        style={{ borderTopWidth: 1 }}
        backdropComponent={renderBackdrop}
        backgroundComponent={null}>
        <BottomSheetView style={styles.contentContainer}>
          <TimePicker
            currentDay={currentDay}
            selectedDay={selectedDay}
            closeModal={handleCloseSheet}
            saveRange={saveTime}
            growBottomSheet={handleSheetSnapPress}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.modalBg,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.modalBg,
  },
  handleStyle: {
    backgroundColor: Colors.modalBg,
    borderRadius: 0,
    borderTopWidth: 1,
    borderTopColor: '#F4F4F429',
    borderBottomWidth: 0,
  },
});
