import React, {useState} from 'react';
import {Chip} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {universalPadding, width, sMargin, colors} from '../config/config';

import Ionicons from 'react-native-vector-icons/Ionicons';

const AppChip = ({
  value = 'damn',
  onPress = () => console.log('closed'),
  readOnly,
  bg,
  selected
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handlePress = () => {
    onPress();
    setIsSelected(!isSelected);
  };

  return (
    <Chip
      selected={isSelected}
      mode="outlined"
      textStyle={[
        styles.text,
        {color: isSelected ? colors.hairLineColor : colors.calmBlue},
      ]}
      closeIcon={'close'}
      onPress={readOnly ? null : handlePress}
      selectedColor={[colors.calmBlue]}
      style={[
        styles.chip,
        {
          backgroundColor: isSelected
            ? colors.calmBlue
            : bg
            ? bg
            : 'transparent',
        },
      ]}>
      {value}
    </Chip>
  );
};

export default AppChip;

const styles = StyleSheet.create({
  chip: {
    width: undefined,
    height: undefined,

    margin: 5,
  },
  text: {
    color: colors.fadeWhite,
  },
});
