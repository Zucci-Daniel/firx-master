import React from 'react';
import {StyleSheet, View, Text, Button, Linking} from 'react-native';
import {
  LeaderBoardPane,
  AppButton,
  WinsAndGames,
  Title,
  SMHandle,
  Ig,
  Twitter,
  Fb,
  ProfileDetails,
} from '../../../../imports/all_files';
import {Stack} from '../../../../navigation/create/CreateNavigation';
import {universalPadding, colors} from '../../../../config/config';
import {useContext} from 'react';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import ProfilePane from './../../../../components/ProfilePane';
import Phone from './../../../../components/icons/Phone';
import WhatsApp from './../../../../components/icons/WhatsApp';
import SocialHandles from '../../../../components/SocialHandles';

const FrontPage = () => {
  const {user} = useContext(SignUpInfoContext);

  return (
    <View style={styles.container}>
      <ProfilePane dark={true} readOnly />
      <SocialHandles />
    </View>
  );
};

export default FrontPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: universalPadding / 2,
    backgroundColor: '#010101',
  },
});
