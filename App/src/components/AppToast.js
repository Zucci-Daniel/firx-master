import React from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {MaterialIcons, Ionicons} from '../imports/all_packages';
import {universalPadding, width, sMargin, colors} from '../config/config';

export default AppToast = ({message, title, type = 'error', ...props}) => {
  //converting the string gotten from the type parameters into lowercase first before checking it. incase the we mistakenly parse in mixtures of letter case.✌
  let formattedType = type.toLowerCase();

  const displayStylesBasedOnType = () => {
    switch (formattedType) {
      case 'warning':
        return styles.warning;

      case 'success':
        return styles.success;

      case 'error':
        return styles.error;

      case 'alert':
        return styles.alert;

      default:
        return styles.success;
    }
  };

  const displayIconBasedOnType = () => {
    switch (formattedType) {
      case 'warning':
        return <Ionicons name="md-warning" size={50} />;

      case 'success':
        return <Ionicons name="checkmark-sharp" size={50} />;

      case 'error':
        return <MaterialIcons name="error" size={50} color={'#fff'} />;

      case 'alert':
        return <Ionicons name="alert" size={50} />;

      default:
        return <Ionicons name="checkmark-sharp" size={50} />;
    }
  };

  return (
    <View style={[styles.container, displayStylesBasedOnType()]} {...props}>
      {/* {displayIconBasedOnType()} */}
      <View style={styles.wrapper}>
        <Text style={(styles.title, {fontSize: title ? 14 : 0})}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '98%',
    padding: universalPadding / 3,
    // position: 'absolute',
    flexDirection: 'row',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // elevation: 5,
    // zIndex: 10000,
  },
  wrapper: {
    marginHorizontal: universalPadding / 5,
  },
  title: {
    color: 'white',
    textTransform: 'capitalize',
  },
  message: {
    color: 'white',
    fontSize: 13,
    textTransform: 'capitalize',
  },
  error: {
    backgroundColor: '#CC3333',
  },
  success: {
    backgroundColor: '#4BB543',
  },
  warning: {
    backgroundColor: '#FFCC00',
  },
  alert: {
    // backgroundColor: '#1A2B61',
    backgroundColor: 'gray',
  },
});
