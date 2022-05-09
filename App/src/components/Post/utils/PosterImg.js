import React from 'react';
import {Image, View,TouchableOpacity, StyleSheet} from 'react-native';
import {avatarWidth, colors} from '../../../config/config';

const PosterImg = ({profileImage,onTapImage}) => {
  return (
    <TouchableOpacity activeOpacity={0.4} onPress={onTapImage}>
      <View style={styles.logoContainer}>
        <Image
          source={
            profileImage
              ? {uri: profileImage}
              : require('../../../assets/1.jpg')
          }
          style={styles.img}
        />
      </View>
    </TouchableOpacity>
  );
};

export default PosterImg;

const styles = StyleSheet.create({
  logoContainer: {
    width: avatarWidth,
    height: avatarWidth,
    backgroundColor: 'transparent',
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.calmBlue,
  },
  img: {
    height: '100%',
    width: '100%',
  },
});
