import React, {useRef} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

export default Sheet = ({children, sheetRef}) => {
  return (
    <Portal>
      <Modalize ref={sheetRef} modalStyle={{backgroundColor:'transparent'}} adjustToContentHeight={true}>{children}</Modalize>
      {/* <Modalize ref={ref} adjustToContentHeight={true}>{children}</Modalize> */}
    </Portal>
  );
};
