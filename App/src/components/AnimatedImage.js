import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {colors, postSize} from '../config/config';
import AppAnimatedImageView from './AppAnimatedImageView';

const AnimatedImage = ({image, isVisible, onBackPress,onBackButtonPress}) => {
  return (
    <AppAnimatedImageView isVisible={isVisible} onBackdropPress={onBackPress} onBackButtonPress={onBackButtonPress}  >
      <View style={styles.imageShowCase}>
        <Image
          style={{width: '100%', height: '100%'}}
          source={{
            uri: image,
          }}
        />
      </View>
    </AppAnimatedImageView>
  );
};

export default AnimatedImage;

const styles = StyleSheet.create({
  imageShowCase: {
    alignSelf: 'center',
    height: postSize,
    width: '100%',
    borderWidth: 0,
    borderColor: colors.calmBlue,
  },
});
