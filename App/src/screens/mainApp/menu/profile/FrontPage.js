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

const FrontPage = ({
  navigation,
  status = 'never have i lost any game, defeated 22games',
}) => {
  const {user} = useContext(SignUpInfoContext);

  const openPhone = async () => {
    try {
      await Linking.openURL('tel:' + user.phoneNumber);
    } catch (error) {
      console.log('not a phone, ', error.message);
    }
  };

  const openWhatsApp = async () => {
    try {
      await Linking.openURL(`whatsapp://send?phone=${user.phoneNumber}`);
    } catch (error) {
      console.log('not a valid whatsapp number, ', error.message);
    }
  };

  const openInstagram = async () => {
    try {
      await Linking.openURL(user.instagram);
    } catch (error) {
      console.log('not a valid ig link, ', error.message);
    }
  };

  const openTwitter = async () => {
    try {
      await Linking.openURL(user.twitter);
    } catch (error) {
      console.log('not a valid twitter link, ', error.message);
    }
  };
  const openFb = async () => {
    try {
      await Linking.openURL(user.facebook);
    } catch (error) {
      console.log('not a valid facebook link, ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ProfilePane dark={true} readOnly />
      <View style={styles.socialHandlerWrapper}>
        <Twitter onPress={openTwitter} />
        <WhatsApp onPress={openWhatsApp} />
        <Ig onPress={openInstagram} />
        <Fb onPress={openFb} />
        <Phone onPress={openPhone} />
      </View>
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
  socialHandlerWrapper: {
    width: undefined,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
});
