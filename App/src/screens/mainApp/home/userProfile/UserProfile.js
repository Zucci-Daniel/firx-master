import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import {
  height,
  colors,
  universalPadding,
  width,
  postSize,
  postHeight,
} from '../../../../config/config';
import {getPost} from '../../../../hooks/useOperation';

import MediaSkeleton from '../../../../components/MediaSkeleton';
import ProfilePane from './../../../../components/ProfilePane';
import Twitter from './../../../../components/icons/Twitter';
import WhatsApp from './../../../../components/icons/WhatsApp';
import Ig from './../../../../components/icons/Ig';
import Fb from './../../../../components/icons/Fb';
import Phone from './../../../../components/icons/Phone';
import {useGetNewUser} from './../../../../hooks/useOperation';
import SocialHandles from '../../../../components/SocialHandles';

//Might have to be a stack later on
const UserProfile = ({navigation, route}) => {
  const {posterUserUID} = route.params;

  const [selectedUser, setSelectedUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getSelectedUser = async posterUserUID => {
    const response = await useGetNewUser('STUDENTS', posterUserUID);

    if (response) {
      // console.log(response, ' selcted user');
      setSelectedUser({...response.data(), id: response.data().id});
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(posterUserUID, ' id');
    getSelectedUser(posterUserUID);
  }, []);

  if (isLoading) return <MediaSkeleton />;
  console.log(selectedUser.profileImage);
  return (
    <View style={styles.container}>
      <ProfilePane
        username={`${selectedUser.firstName} ${selectedUser.lastName}`}
        schoolInfo={`${selectedUser.department} ${selectedUser.level}`}
        externalProfileImage={selectedUser.profileImage}
        dark={true}
        readOnly
      />
      <SocialHandles
        instagram={selectedUser.instagram}
        twitter={selectedUser.twitter}
        whatsapp={selectedUser.whatsapp}
        facebook={selectedUser.facebook}
        phone={selectedUser.phone}
      />
    </View>
  );
};

export default UserProfile;

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
