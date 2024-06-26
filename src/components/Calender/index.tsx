import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { FC, memo, useEffect } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';

import { Body } from 'src/components';
import { Colors, globalStyles } from 'src/design';
import { DATE_WIDTH } from 'src/utils/constants';

type Props = {
  currentMonth: string;
  selectedDay: Record<string, Record<string, number> | {}>;
  onPress: (day: Date) => void;
};

const Calender: FC<Props> = memo(({ currentMonth, selectedDay, onPress }) => {
  let today = startOfToday();
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(firstDayCurrentMonth)),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  return (
    <View style={{ height: 390 }}>
      <View style={{ paddingVertical: 12, ...globalStyles.fillCenter }}>
        <Body text={format(firstDayCurrentMonth, 'MMM yyyy')} fontSize={16} />
      </View>
      <View
        style={[
          styles.daysContainer,
          { flexDirection: 'row', flexWrap: 'wrap' },
        ]}>
        {days.map((day, index) => {
          const InCurrentMonth = isSameMonth(firstDayCurrentMonth, day);
          const formatedDay = format(day, 'dd-MMM-yyyy');
          const selected = selectedDay[formatedDay];
          return (
            <TouchableOpacity
              key={`${day.toString()}+${currentMonth}`}
              onPress={() => onPress(day)}
              disabled={!InCurrentMonth || isBefore(day, today)}
              style={[styles.dayContainer, {}]}>
              <View
                style={[
                  selected && styles.selectedDate,
                  selected?.startTime &&
                    selected?.endTime && { backgroundColor: Colors.green },
                ]}
                key={`${day.toString()}+${currentMonth}`}>
                <Body
                  text={InCurrentMonth ? format(day, 'd') : ''}
                  key={`${day.toString()}+${currentMonth}`}
                  style={styles.daysOfTheWeek}
                  lineHeight={16}
                  type={isBefore(day, today) ? 'grey' : 'primary'}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
});

export default Calender;
const styles = StyleSheet.create({
  daysContainer: {
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: Colors.disbledText,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dayContainer: {
    paddingVertical: 9.5,
    paddingHorizontal: 5.5,
    ...globalStyles.fillCenter,
    width: DATE_WIDTH,
    height: 40,
    marginVertical: 8,
  },
  daysOfTheWeek: {
    textAlign: 'center',
  },
  selectedDate: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    backgroundColor: Colors.red,
    ...globalStyles.fillCenter,
  },
});
