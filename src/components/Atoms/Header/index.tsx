import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import { H } from '../Typography';
import { globalStyles } from 'src/components/Atoms/Design';

export const HEADER_HEIGHT = 52;

type Props = {
  headerText?: string;
};

const Header: FC<Props> = ({ headerText }) => {
  return (
    <View style={styles.header}>
      <View>
        <H
          text={headerText}
          // fontWeight={700}
          fontSize={16}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    ...globalStyles.fillCenter,
    height: HEADER_HEIGHT,
  },
});
