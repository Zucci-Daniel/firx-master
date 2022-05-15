import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import {universalPadding, colors, height, width} from '../config/config';

export default function LogoSponsor({source}) {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.image} resizeMode='cover' />
    </View>
    // <Text style={styles.Para}>{paragraph}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    width:100,
    height:50,
    padding:universalPadding/10
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
