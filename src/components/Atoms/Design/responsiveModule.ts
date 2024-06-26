import { Dimensions, PixelRatio } from 'react-native';

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

const figmaDeviceHeight = 812; // a rough number
const figmaDeviceWidth = 375; // a rough number

export const getWidth = (figmaSize: number) => {
  const sizetoWidthRatio = figmaSize / figmaDeviceWidth;
  return PixelRatio.roundToNearestPixel(screenWidth * sizetoWidthRatio);
};

export const getHeight = (figmaSize: number) => {
  const sizetoHeightRatio = figmaSize / figmaDeviceHeight;
  return PixelRatio.roundToNearestPixel(screenHeight * sizetoHeightRatio);
};
