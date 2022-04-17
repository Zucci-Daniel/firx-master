import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {width, height} from '../config/config';
import FastImage from 'react-native-fast-image';
import MediaSkeleton from './MediaSkeleton';
import ControlIcon from './ControlIcon';

const AppPostImage = ({imageUri, useHeight = height / 2}) => {
  const [isLoading, setIsLoading] = useState(true);
  const size = isLoading ? 0 : '100%';

  return (
    <Pressable>
      <View style={[styles.container, {height: useHeight}]}>
        <FastImage
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
          onLoadEnd={() => setIsLoading(false)}
          source={
            imageUri ? {uri: imageUri} : require('../../src/assets/henessy.jpg')
          }
          resizeMode={FastImage.resizeMode.cover}
          style={{width: size, height: size}}
        />
        {isLoading && <MediaSkeleton />}
      </View>
      <ControlIcon
        onPress={null}
        iconName={'images'}
        extraPlayStyles={styles.videoIndicator}
        size={20}
      />
    </Pressable>
  );
};

export default AppPostImage;

const styles = StyleSheet.create({
  container: {
    width: width,
    margin: 0,
    position: 'relative',
  },
  videoIndicator: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
