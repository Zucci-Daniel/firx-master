import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors, height, universalPadding, width} from '../config/config';

const AppAnimatedImageView = ({
  isVisible = false,
  onBackdropPress,
  onBackButtonPress,
  selectedItem,
  backdropColor,
  backdropOpacity = 0.9,
  children,
}) => {
  return (
    <Modal
      style={styles.modal}
      isVisible={isVisible}
      onBackButtonPress={onBackButtonPress}
      onBackdropPress={onBackdropPress}
      animationIn="zoomIn"
      animationOut="zoomOut"
      animationInTiming={200}
      animationOutTiming={400}
      backdropColor={backdropColor ? backdropColor : colors.neonBg}
      backdropOpacity={backdropOpacity}
      propagateSwipe
      backdropTransitionInTiming={100}
      backdropTransitionOutTiming={100}>
      <View style={styles.modalView}>{selectedItem || children}</View>
    </Modal>
  );
};

export default AppAnimatedImageView;

const styles = StyleSheet.create({
  modal: {
    width: width,
    margin: 0,
    padding: universalPadding / 5,
  },
  modalView: {
    width: '100%',
    height: undefined,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
