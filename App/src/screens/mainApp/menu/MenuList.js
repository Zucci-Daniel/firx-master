import {React, StyleSheet, View} from '../../../imports/all_RnComponents';
import {ProfilePane, MenuItem} from '../../../imports/all_files';
import {colors, universalPadding} from '../../../config/config';
import {useContext} from 'react';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import {logOut} from './../../../hooks/useUserAuthFunctions';
import {AppContext} from './../../../appContext';
import {FlatList} from 'react-native';
import {confirmAction} from './../../../hooks/postOperations';

const MenuList = ({navigation}) => {
  const menu = [
    {
      id: 1,
      optionColor: colors.info,
      onPress: () => navigation.navigate('authoredPosts'),
      title: 'post authored',
      iconName: 'post-add',
    },
    {
      id: 2,
      optionColor: colors.info,
      onPress: () => navigation.navigate('savedPosts'),
      title: 'post saved',
      iconName: 'save-alt',
    },
    {
      id: 3,
      optionColor: colors.pureWhite,
      onPress: () => null,
      title: `following ${1.4}k`,
      iconName: 'people',
    },
    {
      id: 4,
      optionColor: colors.pureWhite,
      onPress: () => null,
      title: `followed by ${3.4}m people`,
      iconName: 'people-outline',
    },
    {
      id: 5,
      optionColor: colors.info,
      onPress: () => null,
      title: `hobbies`,
      iconName: 'sports-kabaddi',
    },
    {
      id: 6,
      optionColor: colors.info,
      onPress: () => null,
      title: `interests`,
      iconName: 'sentiment-very-satisfied',
    },
    {
      id: 7,
      optionColor: colors.info,
      onPress: () => null,
      title: `personalities`,
      iconName: 'self-improvement',
    },
    {
      id: 8,
      optionColor: colors.calmRed,
      onPress: () => null,
      title: `profiles black listed`,
      iconName: 'block-flipped',
    },
    {
      id: 9,
      optionColor: colors.calmRed,
      onPress: () => null,
      title: `posts black listed`,
      iconName: 'block-flipped',
    },
    {
      id: 10,
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
  ];

  const {setSeenUserUID} = useContext(AppContext);
  const {user} = useContext(SignUpInfoContext);

  const handleLogout = () => {
    setSeenUserUID(null);
    logOut();
  };

  return (
    <View style={styles.container}>
      <ProfilePane dark onPress={() => navigation.navigate('profile')} />

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
    </View>
  );
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
    position: 'relative',
    padding: universalPadding / 4,
  },
});
