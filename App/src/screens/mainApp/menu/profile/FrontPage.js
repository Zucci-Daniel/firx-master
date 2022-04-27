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
  console.log(user);
  const openPhone = url => {
    Linking.openURL('tel:' + user.phoneNumber);
  };
  const openWhatsApp = url => {
    Linking.openURL(
      `whatsapp://send?phone=${user.phoneNumber}=&text=${'my freiend'}`,
    );
  };
  const openInstagram = url => {
    Linking.openURL('https://instagram.com/zucciiiii?igshid=YmMyMTA2M2Y=');
  };
  const openTwitter = url => {
    Linking.openURL(
      'https://twitter.com/wizkidayo?t=YtOC4JTZclNqvhHQ5kLMHg&s=09',
    );
  };

  return (
    <View style={styles.container}>
      <ProfilePane dark={true} readOnly />
      <View style={styles.socialHandlerWrapper}>
        <Twitter onPress={openTwitter} />
        <WhatsApp onPress={openWhatsApp} />
        <Ig onPress={openInstagram} />
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
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});
