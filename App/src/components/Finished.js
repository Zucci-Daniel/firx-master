import React from 'react';
import {View, Text} from 'react-native';
import {colors, height, width} from '../config/config';
import LottieView from 'lottie-react-native';

const Finished = () => {
  return (
    <View
      style={{
        height: height / 3,
        width: width,
        marginBottom: height / 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <View
        style={{
          backgroundColor: 'transparent',
          height: '100%',
          width: '100%',
        }}>
        <LottieView
          source={require('../assets/f.json')}
          autoPlay
          loop={false}
          speed={2}
        />
      </View>
      <Text
        style={{
          fontSize: 24,
          fontStyle: 'italic',
          fontWeight: '400',
          color: colors.calmBlue,
        }}>
        You're all caught up!
      </Text>
    </View>
  );
};

export default Finished;
