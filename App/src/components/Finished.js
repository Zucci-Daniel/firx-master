import React from 'react';
import {View} from 'react-native';
import {width} from '../config/config';
import LottieView from 'lottie-react-native';

const Finished = () => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        height: 400,
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
      }}>
      <LottieView
        source={require('../assets/f.json')}
        autoPlay
        loop={false}
        speed={2}
      />
    </View>
  );
};

export default Finished;
