import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {Ionicons} from 'react-native-vector-icons/Ionicons';
import {width} from '../config/config';
const actions = [
  {
    // text: 'Accessibility',
    icon: require('../assets/camera.png'),
    name: 'camera',
    position: 2,
    color: 'gray',
    buttonSize: 60,
  },
  {
    // text: 'Location',
    icon: require('../assets/post.png'),
    name: 'write',
    position: 3,
    color: 'gray',
    buttonSize: 60,
  },
];

const AppFloatMenu = ({onPressButton}) => {
  return (
    <View style={styles.container}>
      <FloatingAction
        actions={actions}
        buttonSize={50}
        color={'#010101'}
        tintColor="white"
        onPressItem={name => {
          console.log(`selected button: ${name}`);
          onPressButton(name);
        }}
      />
    </View>
  );
};

export default AppFloatMenu;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 5,
    right: -10,
  },
});
