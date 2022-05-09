import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export default Sheet = ({
  children,
  sheetRef,
  modalStyle,
  onBackPress,
  disableBackDrop,
  enableSlideToClose = true,
}) => {
  return (
    <Portal>
      <Modalize
        panGestureEnabled={enableSlideToClose}
        closeOnOverlayTap={disableBackDrop}
        ref={sheetRef}
        onBackButtonPress={onBackPress}
        modalStyle={modalStyle}
        adjustToContentHeight={true}>
        {children}
      </Modalize>
    </Portal>
  );
};
