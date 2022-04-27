import {React, StyleSheet, Text, View} from '../imports/all_RnComponents';
import {universalPadding} from '../config/config';
import {TouchableOpacity} from 'react-native';

export default function SMHandle({
  logo,
  handle = 'instagram',
  onPress = () => {
    console.log('pressed');
  },
}) {
  return <TouchableOpacity onPress={onPress}>{logo}</TouchableOpacity>;
}

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'red',
  },
});
