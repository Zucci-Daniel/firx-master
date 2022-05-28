import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, universalPadding, height} from '../../../config/config';
import {useContext} from 'react';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import {logOut} from './../../../hooks/useUserAuthFunctions';
import {AppContext} from './../../../appContext';
import {FlatList} from 'react-native';
import {confirmAction} from './../../../hooks/postOperations';
import ProfilePane from './../../../components/ProfilePane';
import MenuItem from './../../../components/MenuItem';
import Entypo from 'react-native-vector-icons/Entypo';

const MenuList = ({navigation}) => {
  const menu = [
    {
      id: 11,
      optionColor: colors.calmRed,
      onPress: () =>
        confirmAction(
          null,
          handleLogout,
          null,
          'Already leaving?',
          'are you sure you wanna logout?',
          'logout',
          'nahh',
        ),
      title: `log out`,
      iconName: 'logout',
      iconColor: colors.calmRed,
    },
    {
      id: 8,
      optionColor: colors.calmRed,
      onPress: () => null,
      title: `profiles black listed`,
      iconName: 'block-flipped',
    },

    {
      id: 10,
      optionColor: colors.calmRed,
      onPress: () => null,
      title: `unfollowed`,
      iconName: 'block-flipped',
    },

    {
      id: 5,
      optionColor: colors.info,
      onPress: () => null,
      title: `more about me`,
      iconName: 'sports-kabaddi',
    },
    {
      id: 52,
      optionColor: colors.info,
      onPress: () => navigation.navigate('AccommodationTab'),
      title: `accommodation`,
      iconName: 'sports-kabaddi',
    },
  ];

  const {setSeenUserUID} = useContext(AppContext);
  const {user} = useContext(SignUpInfoContext);

  const handleLogout = () => {
    setSeenUserUID(null);
    logOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Entypo
          name="app-store"
          size={50}
          color={colors.calmBlue}
          style={{alignSelf: 'center'}}
        />
        <FlatList
          data={menu}
          keyExtractor={item => item.title + item.id}
          renderItem={(
            {item: {optionColor, title, iconName, onPress, iconColor}},
            index,
          ) => (
            <MenuItem
              optionColor={optionColor}
              title={title}
              iconName={iconName}
              onPress={onPress}
              iconColor={iconColor && iconColor}
            />
          )}
        />
        <ProfilePane dark onPress={() => navigation.navigate('profile')} />
      </View>
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: colors.neonBg,
    position: 'relative',
    padding: universalPadding / 4,
  },
  wrapper: {
    height: undefined,
    backgroundColor: colors.neonBg,
    position: 'relative',
  },
});
