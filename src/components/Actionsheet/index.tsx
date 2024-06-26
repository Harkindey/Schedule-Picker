import React, { FC, ReactNode } from 'react';
import Modal, { ModalProps } from 'react-native-modal';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import { CancelSVG, GrabberSVg } from 'src/assets/icons';
import { Colors, globalStyles } from 'src/design';
import { Body } from '../Typography';
import styles from './style';

type Props = {
  isModalVisible: boolean;
  closeModal: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onShow?: () => void;
  title?: string;
  subtitle?: string;
  animationTimining?: number;
  subtitleViewStyle?: StyleProp<ViewStyle>;
  hideCloseButton?: boolean;
} & Partial<ModalProps>;

const ActionSheet: FC<Props> = ({
  isModalVisible,
  closeModal,
  children,
  style,
  onShow,
  title,
  subtitle,
  animationTimining,
  onModalHide,
  subtitleViewStyle,
  hideCloseButton,
  ...rest
}) => {
  return (
    <View>
      <Modal
        onBackButtonPress={closeModal}
        onBackdropPress={closeModal}
        isVisible={isModalVisible}
        backdropColor={String(Colors.modalOverlayColor)}
        style={{ ...styles.modal }}
        animationIn="slideInUp"
        animationInTiming={300}
        animationOut="slideOutDown"
        animationOutTiming={300}
        useNativeDriver
        onShow={onShow}
        onModalHide={onModalHide}
        propagateSwipe
        swipeDirection={['down']}
        avoidKeyboard={true}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        // {...rest}
      >
        <View style={[styles.modalView, style]}>{children}</View>
      </Modal>
    </View>
  );
};

export default ActionSheet;
