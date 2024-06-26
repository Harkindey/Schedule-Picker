import { StyleSheet } from 'react-native';
import { getHeight, getWidth } from './responsiveModule';

export const globalStyles = StyleSheet.create({
  contain: {
    flex: 1,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  verticalMargin: {
    marginVertical: getHeight(24),
  },
  verticalPadding: {
    paddingVertical: getHeight(24),
  },
  horizontalMargin: {
    marginHorizontal: getWidth(16),
  },
  horizontalPadding: {
    paddingHorizontal: getWidth(16),
  },
  rowCenter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fillCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spaceAround: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  alignItemsRow: { flexDirection: 'row', alignItems: 'center' },
  alignItemsCol: { flexDirection: 'column', alignItems: 'center' },
  row: {
    flexDirection: 'row',
  },
});
