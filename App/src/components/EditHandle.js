import React from 'react';
import {StyleSheet, View} from 'react-native';
import {universalPadding} from '../config/config';
import AppInput2 from './AppInput2';

export default function EditHandle() {
  return (
    <>
      <View style={styles.container}>
        <AppInput2 />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: universalPadding / 3,
  },
  logo: {
    alignSelf: 'center',
  },
});
