import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {colors, sMargin, inputBorder} from '../config/config';

export default DetailChip = ({
  detail = 'detail',
  value = 'value',
  spaceLetter = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.detail}>{`${detail}`}</Text>

      <Text
        style={[
          styles.value,
          {letterSpacing: spaceLetter ? 4 : 0},
        ]}>{`  ${value}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  value: {
    color: 'red',
    fontWeight: '600',
    fontSize: 16,
    color: colors.hairLineColor,
    textTransform: 'capitalize',
  },
  detail: {
    color: colors.chip,
    fontWeight: '400',
    textTransform: 'capitalize',
  },
});
