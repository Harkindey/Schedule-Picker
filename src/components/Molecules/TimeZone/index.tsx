import { Platform, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { TIMEZONE } from 'src/utils/timezone';
import { format } from 'date-fns';
import { WorldSVg } from 'src/assets/icons';
import { Body } from 'src/components';
import { globalStyles } from 'src/components/Atoms/Design';

type Props = {
  day: Date;
};
const Timezone: FC<Props> = ({ day }) => {
  return (
    <View style={styles.timeZone}>
      <WorldSVg
        style={{
          marginTop: Platform.select({
            ios: 0,
            android: 3,
          }),
        }}
      />
      <Body
        text={`${TIMEZONE[format(day, 'z') as keyof typeof TIMEZONE].name}`}
        style={{ marginLeft: 10 }}
      />
    </View>
  );
};

export default Timezone;

const styles = StyleSheet.create({
  timeZone: {
    ...globalStyles.row,
    ...globalStyles.fillCenter,
    backgroundColor: '#5555567A',
    paddingVertical: 12,
  },
});
