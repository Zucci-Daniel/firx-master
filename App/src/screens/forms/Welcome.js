import React from 'react';
import {View, Text} from 'react-native';
import AppButton from '../../components/AppButton';
import FormTitle from '../../components/FormTitle';
import {useNavigation} from '@react-navigation/native';
import { universalPadding } from '../../config/config';

const Welcome = ({}) => {
  const navigation = useNavigation();

  const handleResetAndNavigate = () => {
    //to prevent going back to login screen
    navigation.navigate('formSection1');
    return navigation.reset({
      index: 0,
      routes: [{name: 'formSection1'}],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: '#010101',
        padding:universalPadding
      }}>
      <FormTitle color={'white'} title="welcome" />

      <AppButton
        wideButton
        title="start"
        onPress={handleResetAndNavigate}
      />
    </View>
  );
};

export default Welcome;
