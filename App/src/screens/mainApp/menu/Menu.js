import {React, StyleSheet, View, Text} from '../../../imports/all_RnComponents';
import {Profile, MenuList, config} from '../../../imports/all_files';
import {Stack} from '../../../navigation/create/CreateNavigation';
import AuthoredPosts from './AuthoredPosts/AuthoredPosts';
import ButtonText from './../../../components/ButtonText';
import {useNavigation} from '@react-navigation/native';
import SavedPosts from './SavedPosts/SavedPosts';
import Link from './../../../components/Link';
import {height, width} from '../../../config/config';

const {colors, brandFont} = config;

const Menu = () => {
  const navigation = useNavigation();
  //this "might" be a stack navigation, so be prepared!
  return (
    <View style={styles.sceneContainerStyle}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerTintColor: colors.fadeWhite,
          headerStyle: {backgroundColor: colors.neonBg},
          headerShadowVisible: false,
          animation: 'slide_from_right',
          headerTitleStyle: {
            fontFamily: brandFont.medium,
          },
          headerRight: () => (
            <Link text="post" onPress={() => navigation.navigate('camera')} />
          ),
        }}>
        <Stack.Screen name="menuList" component={MenuList} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen
          name="authoredPosts"
          component={AuthoredPosts}
          options={{
            headerTitle: 'Your recent posts',
            headerShown: true,

            animationTypeForReplace: 'push',
          }}
        />
        <Stack.Screen
          name="savedPosts"
          component={SavedPosts}
          options={{
            headerTitle: 'Your saved posts',
            headerShown: true,
            animationTypeForReplace: 'push',
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
    height: height,
    width: width,
  },
});
