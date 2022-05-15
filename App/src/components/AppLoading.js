import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';
import {universalPadding} from '../config/config';

const AppLoading = ({message = '', loop}) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/load.json')}
        autoPlay
        loop={loop}
        speed={2}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default AppLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  message: {
    color: 'gray',
    fontSize: 16,
    marginTop: universalPadding * 2,
    fontWeight: '500',
  },
});
