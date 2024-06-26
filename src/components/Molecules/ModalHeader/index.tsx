import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { FC } from 'react';
import { CancelSVG, GrabberSVg } from 'src/assets/icons';
import { globalStyles } from 'src/components/Atoms/Design';
import { Body, H } from '../../Atoms/Typography';
import { format } from 'date-fns';

type Props = {
  date: Date;
  closeModal: () => void;
  showHandle?: boolean;
};
const ModalHeader: FC<Props> = ({ date, closeModal, showHandle }) => {
  return (
    <View>
      {!!showHandle && (
        <View style={[globalStyles.fillCenter, { marginVertical: 8 }]}>
          <GrabberSVg />
        </View>
      )}

      <View style={styles.header}>
        <H
          text={`Set availability on ${format(date, 'MMM dd, yyyy')}`}
          fontSize={16}
          textAlign={'center'}
        />
        <TouchableOpacity onPress={closeModal}>
          <CancelSVG />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ModalHeader;

const styles = StyleSheet.create({
  header: {
    ...globalStyles.alignItemsRow,
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 18,
    ...globalStyles.spaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F429',
  },
});
