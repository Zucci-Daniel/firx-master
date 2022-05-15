import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../../config/config';

import Link from '../../../components/Link';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Link readOnly text={'search feature coming soon'} />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
