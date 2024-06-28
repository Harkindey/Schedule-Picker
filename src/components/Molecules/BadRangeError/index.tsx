import { Platform, StyleSheet, View } from 'react-native';
import React from 'react';
import { WarningSVG } from 'src/assets/icons';
import { P } from 'src/components/Atoms/Typography';

const BadRangeError = () => {
  return (
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
  );
};

export default BadRangeError;
