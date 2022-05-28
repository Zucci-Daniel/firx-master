import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors, width} from '../config/config';
import {useNavigation} from '@react-navigation/native';

const AppHeader = ({
  onPress = () => console.log('waiting for u to attach a handler'),
  title = 'title..',
}) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    try {
      navigation.canGoBack() ? navigation.goBack() : onPress();
    } catch (error) {
      console.log('check yor app header', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavigation()}>
        <Ionicons
          name="chevron-back-sharp"
          color={colors.calmBlue}
          size={30}
          style={{marginLeft: -10}}
        />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  container: {
    height: undefined,
    width: undefined,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.calmBlue,
    textTransform: 'capitalize',
  },
});
