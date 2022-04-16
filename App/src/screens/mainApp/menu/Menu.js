import {React, StyleSheet, View, Text} from '../../../imports/all_RnComponents';
import {Profile, MenuList, config} from '../../../imports/all_files';
import {Stack} from '../../../navigation/create/CreateNavigation';
import AuthoredPosts from './AuthoredPosts/AuthoredPosts';
import ButtonText from './../../../components/ButtonText';
import {useNavigation} from '@react-navigation/native';
import SavedPosts from './SavedPosts/SavedPosts';

const {colors, brandFont} = config;

const Menu = () => {
  const navigation = useNavigation();
  //this "might" be a stack navigation, so be prepared!
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: colors.hairLineColor,
        headerShadowVisible: false,
        animation: 'slide_from_right',
        headerTitleStyle: {
          fontFamily: brandFont.medium,
        },
      }}>
      <Stack.Screen name="menuList" component={MenuList} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen
        name="authoredPosts"
        component={AuthoredPosts}
        options={{
          headerTitle: 'Your recent posts',
          headerShown: true,
          // headerRight: () => (
          //   <ButtonText
          //     title="Create A Post!"
          //     onPress={() => navigation.navigate('createPost')}
          //   />
          // ),
          animationTypeForReplace:'push'
        }}
      />
      <Stack.Screen
        name="savedPosts"
        component={SavedPosts}
        options={{
          headerTitle: 'Your saved posts',
          headerShown: true,
          // headerRight: () => (
          //   <ButtonText
          //     title="Create A Post!"
          //     onPress={() => navigation.navigate('createPost')}
          //   />
          // ),
          animationTypeForReplace:'push'
        }}
      />
    </Stack.Navigator>
  );
};

export default Menu;
