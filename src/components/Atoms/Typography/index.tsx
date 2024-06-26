import React, { FC, ReactNode } from 'react';
import {
  StyleSheet,
  TextProps,
  TextStyle,
  StyleProp,
  Text,
  ColorValue,
} from 'react-native';
import { Colors } from 'src/components/Atoms/Design/colors';

export type TextColorVariant = 'primary' | 'green' | 'danger' | 'grey';

type Props = {
  text: ReactNode;
  fontSize?: TextStyle['fontSize'];
  fontWeight?: TextStyle['fontWeight'];
  lineHeight?: TextStyle['lineHeight'];
  textAlign?: TextStyle['textAlign'];
  type?: TextColorVariant;
} & TextProps;

const styles = StyleSheet.create({
  head: {
    fontFamily: 'Lazzer-Bold',
  },
  body: {
    fontFamily: 'Lazzer-SemiBold',
  },
  paragraph: {
    fontFamily: 'Lazzer-Light',
  },
});

const typeObject: { [key in TextColorVariant]: ColorValue } = {
  primary: Colors.primaryText,
  green: Colors.green,
  danger: Colors.red,
  grey: Colors.disbledText,
};

const TextComponent = (
  size: number,
  defaultStyle: StyleProp<TextStyle>,
): FC<Props> => {
  return ({
    fontSize = size,
    text,
    style,
    type,
    lineHeight,
    textAlign,
    fontWeight,
    ...rest
  }) => {
    return (
      <Text
        style={[
          defaultStyle,
          {
            fontSize,
            lineHeight,
            textAlign,
            fontWeight,
            color: type ? typeObject[type] : typeObject.primary,
          },
          style,
        ]}
        {...rest}>
        {text}
      </Text>
    );
  };
};

export const P: FC<Props> = TextComponent(14, styles.paragraph);
export const Body: FC<Props> = TextComponent(16, styles.body);
export const H: FC<Props> = TextComponent(18, styles.head);
