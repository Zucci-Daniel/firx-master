import React from 'react';
import {StyleSheet, View} from 'react-native';
import {RadioButton} from '../imports/all_packages';

export default AppRadioButton = ({label = 'Bank Transfer', color = 'red'}) => {
  const [checked, setChecked] = React.useState('first');

  return (
    <View style={styles.wrapper}>
      <RadioButton.Item
        label={label}
        value="first"
        status={checked === 'first' ? 'checked' : 'unchecked'}
        onPress={() => setChecked('first')}
        color={color}
        uncheckedColor={'#fff'}
        mode="android"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: 0,
    padding: 0,
  },
  TextInput: {},
});
