import React, { useState } from 'react';
import { Chip } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { colors } from '../config/config';

export const MemoAppChip = ({
  value = 'damn',
  onPress = () => console.log('closed'),
  readOnly,
  bg,
  selected,
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  const handlePress = () => {
    onPress();
    setIsSelected(!isSelected);
  };
  // console.log('app chp');
  return (
    <Chip
      selected={isSelected}
      mode="outlined"
      textStyle={[
        styles.text,
        { color: isSelected ? colors.hairLineColor : colors.calmBlue },
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

// const chipAreEqual = (prev, next) =>
//   prev.selected === next.selected && prev.value === next.value;

// export const MemoAppChip = React.memo(AppChip, chipAreEqual);



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
