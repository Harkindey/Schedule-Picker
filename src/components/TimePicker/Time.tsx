import { StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { format } from 'date-fns';
import { getWidth, globalStyles } from 'src/design';
import { H } from '../Typography';

type Props = {
  time: Date;
  currentTime: number;
  index: number;
};

const Time: FC<Props> = ({ time, index, currentTime }) => {
  return (
    <View style={styles.text} key={index}>
      <H
        text={format(time, ' h:mm')}
        fontSize={32}
        type={index === currentTime ? 'green' : 'grey'}
      />
      <H
        text={format(time, 'aaa')}
        fontSize={16}
        type={index === currentTime ? 'green' : 'grey'}
      />
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  text: {
    width: getWidth(94),
    ...globalStyles.fillCenter,
    height: 96,
    // marginLeft: 20,
  },
});
