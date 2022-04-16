import {React, StyleSheet, useState} from '../../imports/all_RnComponents';
import {Notification, Menu, ButtonText} from '../../imports/all_files';
import {Ionicons} from '../../imports/all_packages';
import {BottomTab} from '../../navigation/create/CreateNavigation';
import {tabBarBottomConfig, colors, brandFont} from '../../config/config';
import AppTabButton from '../../components/AppTabButton';
import {useContext} from 'react';
import {SignUpInfoContext} from './../forms/signUpInfoContext';
import HomeStack from './home/HomeStack';
import {Button, View} from 'react-native';
import {AppContext} from './../../appContext';
import AppFloatMenu from './../../components/AppFloatMenu';

const InsideApp = ({navigation}) => {
  const {showBottomTab} = useContext(AppContext);
  const [currentRoute, setCurrentRoute] = useState('homeStack');
  const handleRouteChange = (destination, routeName) => {
    setCurrentRoute(routeName);
    return navigation.navigate(destination);
  };

  return (
    <>
      <BottomTab.Navigator
        sceneContainerStyle={{backgroundColor: 'black'}}
        initialRouteName="homeStack"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarInactiveTintColor: colors.pureWhite,
          tabBarActiveBackgroundColor: colors.pureWhite,
          tabBarStyle: {
            ...tabBarBottomConfig,
            display: showBottomTab ? 'flex' : 'none',
          },
          tabBarHideOnKeyboard: true,
          animation: 'slide_from_right',
          headerTintColor: 'gray',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.brandColor,
            borderBottomColor: 'transparent',
            shadowColor: 'transparent',
          },
          headerTitleStyle: {
            fontFamily: brandFont.medium,
            fontSize: 13,
            fontWeight: '700',
          },
        }}>
        <BottomTab.Screen
          name="homeStack"
          component={HomeStack}
          options={({route}) => ({
            tabBarButton: ({color, size}) => (
              <AppTabButton
                isActive={currentRoute === route.name ? true : false}
                onPress={() => handleRouteChange('homeStack', route.name)}
                name="home-outline"
                size={20}
              />
            ),
            headerShown: false,
          })}
        />

        <BottomTab.Screen
          name="notification"
          component={Notification}
          options={({route}) => ({
            tabBarButton: ({color, size}) => (
              <AppTabButton
                isActive={currentRoute === route.name ? true : false}
                onPress={() => handleRouteChange('notification', route.name)}
                name="notifications-outline"
                size={20}
              />
            ),

            tabBarBadge: 77,
            tabBarBadgeStyle: {
              backgroundColor: 'red',
              height: 25,
              width: 25,
              borderRadius: 25,
              fontSize: 10,
              fontWeight: 'bold',
            },
            headerRight: () => <ButtonText title="mark all as read" />,
            headerTitle: 'Notifications',
          })}
        />
        <BottomTab.Screen
          name="menu"
          component={Menu}
          options={({route}) => ({
            tabBarButton: ({color, size}) => (
              <AppTabButton
                isActive={currentRoute === route.name ? true : false}
                onPress={() => handleRouteChange('menu', route.name)}
                name="menu-sharp"
                size={20}
              />
            ),
            headerShown: false,
          })}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default InsideApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
