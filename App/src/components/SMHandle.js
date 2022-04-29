import {React, StyleSheet, Text, View} from '../imports/all_RnComponents';
import {universalPadding, width} from '../config/config';
import {TouchableOpacity} from 'react-native';

export default function SMHandle({
  children,
  handle = 'instagram',
  onPress = () => {
    console.log('pressed');
  },
}) {
  return <View style={styles.children}>{children}</View>;
}

const styles = StyleSheet.create({
  children: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: undefined,
    height: undefined,
  },
});
