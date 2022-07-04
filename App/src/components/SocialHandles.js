import React, { useContext } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import Twitter from './icons/Twitter';
import WhatsApp from './icons/WhatsApp';
import Ig from './icons/Ig';
import Fb from './icons/Fb';
import Phone from './icons/Phone';
import { SignUpInfoContext } from './../screens/forms/signUpInfoContext';
import { universalPadding } from '../config/config';
import AppLink from 'react-native-app-link';

const SocialHandles = ({ instagram, whatsapp, facebook, phone, twitter }) => {
  const { user } = useContext(SignUpInfoContext);

  const openLink = async (link, tel = false) => {
    try {
      const convertToNumber = typeof parseInt(link);
      const instagram = link.includes('instagram') == true;
      const twitter = link.includes('twitter') == true;
      const facebook = link.includes('facebook') == true;

      if ((twitter || facebook || instagram) && !tel) {
        return await AppLink.maybeOpenURL(link, {
          appName: 'Facebook',
          playStoreId: 'com.facebook.katana',
        });
      }
      if (convertToNumber == 'number' && !tel) {
        return await AppLink.maybeOpenURL(`whatsapp://send?phone=${link}`, {
          appName: 'whatsapp',
          playStoreId: 'com.whatsapp',
        });
      }
      if (convertToNumber == 'number' && tel) {
        return await Linking.openURL('tel:' + link);
      }
    } catch (error) {
      console.log('not a valid link, ', error.message);
    }
  };

  return (
    <View style={styles.socialHandlerWrapper}>
      <WhatsApp
        onPress={() => openLink(whatsapp ? whatsapp : user.whatsapp, false)}
      />
      <Twitter
        onPress={() => openLink(twitter ? twitter : user.twitter, false)}
      />
      <Ig
        onPress={() => openLink(instagram ? instagram : user.instagram, false)}
      />
      <Fb
        onPress={() => openLink(facebook ? facebook : user.facebook, false)}
      />
      <Phone
        onPress={() => openLink(whatsapp ? whatsapp : user.whatsapp, true)}
      />
    </View>
  );
};

export default SocialHandles;

const styles = StyleSheet.create({
  socialHandlerWrapper: {
    width: '50%',
    height: undefined,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: universalPadding / 6,
  },
});
