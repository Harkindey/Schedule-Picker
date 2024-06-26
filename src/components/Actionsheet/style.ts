import { StyleSheet } from 'react-native';
import { Colors, globalStyles } from 'src/design';

const ActionSheetStyles = StyleSheet.create({
  modal: {
    margin: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  modalView: {
    flex: 1,
    backgroundColor: Colors.modalBg,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    // height: screenHeight / 4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 0,
    paddingHorizontal: 0,
    paddingBottom: 20,
  },
  header: {
    ...globalStyles.alignItemsRow,
    paddingHorizontal: 20,
    paddingVertical: 12,
    ...globalStyles.spaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F429',
  },
});

export default ActionSheetStyles;
