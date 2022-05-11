import React from 'react';
import {View, StyleSheet} from 'react-native';
import {universalPadding} from '../config/config';
import Link from './Link';
import SweetButton from './SweetButton';

const Retry = ({
  handleRetry,
  notice = 'failed due to network',
  buttonText = 'retry',
  extraStyle,
}) => {
  return (
    <View style={[styles.poorNetwork, extraStyle]}>
      <Link readOnly text={notice} />
      <SweetButton text={buttonText} onPress={handleRetry} />
    </View>
  );
};

export default Retry;
const styles = StyleSheet.create({
  poorNetwork: {
    paddingHorizontal: universalPadding / 2,
  },
});
