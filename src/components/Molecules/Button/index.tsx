import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC } from 'react';
import { Colors, globalStyles } from 'src/components/Atoms/Design';
import { H } from '../../Atoms/Typography';

export const BUTTON_HEIGHT = 56;

type Props = {
  buttonText: string;
  isLoading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

const Button: FC<Props> = ({ buttonText, isLoading, onPress, disabled }) => {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[
        styles.button,
        disabled && { opacity: 0.5, backgroundColor: '#5555567A' },
      ]}
      onPress={onPress}
      disabled={disabled}>
      {isLoading ? (
        <View style={{ ...globalStyles.alignItemsRow }}>
          <ActivityIndicator
            size="large"
            color={Colors.primarySurface}
            style={{ marginRight: 5 }}
          />
        </View>
      ) : (
        <View style={globalStyles.alignItemsRow}>
          <H
            fontSize={16}
            text={buttonText}
            style={{
              ...styles.text,
              color: disabled ? Colors.disbledText : Colors.primarySurface,
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    height: BUTTON_HEIGHT,
    borderRadius: 16,
    flexDirection: 'row',
    ...globalStyles.fillCenter,
    backgroundColor: '#00CC66',
  },
  text: {
    color: Colors.primarySurface,
  },
});
