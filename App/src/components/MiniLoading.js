import React from 'react';
import {View} from 'react-native';
import {universalPadding, width} from '../config/config';
import LottieView from 'lottie-react-native';

const MiniLoading = () => {
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        height: 200,
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
      }}>
      <LottieView
        source={require('../assets/load.json')}
        autoPlay
        loop={true}
        speed={1}
      />
    </View>
  );
};

export default MiniLoading;
