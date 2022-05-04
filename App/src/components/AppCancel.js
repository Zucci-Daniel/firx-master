import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../config/config';

const AppCancel = ({
  onCancel,
  iconName = 'close',
  extraStyle,
  color = colors.calmRed,
  size = 50,
  useStyles = true,
  custom,
}) => {
  return (
    <TouchableOpacity
      onPress={onCancel}
      style={[useStyles && styles.cancel, extraStyle]}>
      {custom ? custom : <Ionicons name={iconName} size={size} color={color} />}
    </TouchableOpacity>
  );
};

export default AppCancel;

const styles = StyleSheet.create({
  cancel: {
    position: 'absolute',
    bottom: StatusBar.currentHeight * 1,
    zIndex: 1,
  },
});
