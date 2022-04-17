import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../config/config';

const PostActionIcon = ({
  onPress,
  value = 4300,
  iconName = 'heart-sharp',
  color = colors.calmBlue,
  showIcon = true,
  showText = true,
  size = 25,
  extraIconStyles,
  useDefault = true,
  columnMode = false,
  valueColor = colors.calmBlue,
  valueSize = 10,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          columnMode ? styles.columnMode : styles.rowMode,
        ]}>
        {showIcon && useDefault && (
          <Entypo
            name={iconName}
            size={size}
            color={color}
            style={[styles.icon, styles.shadow, extraIconStyles]}
          />
        )}
        {showIcon && !useDefault && (
          <Ionicons
            name={iconName}
            size={size}
            color={color}
            style={[styles.icon, styles.shadow, extraIconStyles]}
          />
        )}
        {showText && (
          <Text
            style={[
              styles.value,
              styles.shadow,
              {color: valueColor, fontSize: valueSize},
            ]}>
            {value}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default PostActionIcon;

const styles = StyleSheet.create({
  rowMode: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
  },
  columnMode: {
    flexDirection: 'column',
    // justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
  },
  value: {
    color: 'black',
    fontWeight: '500',
    fontSize: 10,
    textTransform: 'capitalize',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  icon: {
    // marginRight: 5,
    marginRight: 0,
  },
});
