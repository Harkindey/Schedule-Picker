import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Colors, globalStyles } from 'src/components/Atoms/Design';
import { Body } from 'src/components';
import { objectValues } from 'src/utils/helper';
import { DATE_WIDTH, WEEK_DAYS } from 'src/utils/constants';

const WeekDays = () => {
  return (
    <View style={{}}>
      <View style={styles.dayOfTheWeeksContainer}>
        {objectValues(WEEK_DAYS).map((day, index) => (
          <View
            style={[styles.dayContainer, { width: DATE_WIDTH }]}
            key={`${day}-${index}`}>
            <Body text={day} style={styles.daysOfTheWeek} type="grey" />
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeekDays;

const styles = StyleSheet.create({
  dayOfTheWeeksContainer: {
    ...globalStyles.row,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.disbledText,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  dayContainer: {
    paddingVertical: 9.5,
    paddingHorizontal: 5.5,
    ...globalStyles.fillCenter,
  },
  daysOfTheWeek: {
    textAlign: 'center',
  },
});
