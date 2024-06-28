import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Colors, globalStyles } from 'src/components/Atoms/Design';
import { format, isBefore, isEqual, startOfToday } from 'date-fns';
import { Body } from 'src/components/Atoms/Typography';

type Props = {
  day: Date;
  selected: Record<string, number> | {};
  inCurrentMonth: boolean;
};

const DateItem: FC<Props> = ({ day, selected, inCurrentMonth }) => {
  let today = startOfToday();

  return (
    <View
      style={[
        isEqual(day, today) && styles.selectedDate,
        selected?.startTime &&
          selected?.endTime && { backgroundColor: Colors.green },
      ]}>
      <Body
        text={inCurrentMonth ? format(day, 'd') : ''}
        style={styles.daysOfTheWeek}
        lineHeight={16}
        type={isBefore(day, today) ? 'grey' : 'primary'}
      />
    </View>
  );
};

export default DateItem;

const styles = StyleSheet.create({
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
