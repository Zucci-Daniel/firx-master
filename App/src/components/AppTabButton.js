import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '../imports/all_packages';
import {colors} from '../config/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default AppTabButton = ({
  children,
  text,
  onPress,
  background,
  isActive,
  name,
  color,
  size,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: isActive ? colors.neonBg : colors.neonBg},
      ]}
      contentStyle={styles.innerButton}
      accessibilityRole="link">
      <Ionicons
        name={name}
        color={isActive ? colors.pureWhite : colors.dimBlue}
        size={size}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  innerButton: {
    height: '100%',
    width: '100%',
  },
});
