import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {universalPadding, width, sMargin, colors} from '../config/config';

export default AppCheckBox = ({
  label = 'option',
  checked = true,
  onPress,
  selected = false,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touch}>
      <Text style={[styles.label, selected ? styles.selected : styles.null]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: 'black',
    width: '80%',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding: universalPadding / 3,
    borderRadius: universalPadding / 4,
    textAlign: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'goldenrod',
  },
  touch: {
    marginBottom: 20,
  },

  selected: {
    backgroundColor: 'gold',
    width: '90%',
  },
});
