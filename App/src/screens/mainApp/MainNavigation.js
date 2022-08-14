import React, { useState } from 'react';

import { StyleSheet } from 'react-native';

import { BottomTab } from '../../navigation/create/CreateNavigation';
import { tabBarBottomConfig, colors, brandFont } from '../../config/config';
import AppTabButton from '../../components/AppTabButton';
import { useContext } from 'react';
import HomeStack from './home/HomeStack';
import { AppContext } from './../../appContext';
import Menu from './menu/Menu';
import ButtonText from './../../components/ButtonText';
import Search from './search/Search';

const MainNavigation = ({ navigation, route }) => {

  const { showBottomTab } = useContext(AppContext);
  const [currentRoute, setCurrentRoute] = useState('homeStack');

  const handleRouteChange = (destination, routeName) => {
    setCurrentRoute(routeName);
    return navigation.navigate(destination);
  };

  return (
    <>
      <BottomTab.Navigator
        sceneContainerStyle={{ backgroundColor: colors.neonBg }}
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
          options={({ route }) => ({
            tabBarButton: ({ color, size }) => (
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
          name="search"
          component={Search}
          options={({ route }) => ({
            tabBarButton: ({ color, size }) => (
              <AppTabButton
                isActive={currentRoute === route.name ? true : false}
                onPress={() => handleRouteChange('search', route.name)}
                name="search"
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
            headerTitle: 'Search',
          })}
        />
        <BottomTab.Screen
          name="menu"
          component={Menu}
          options={({ route }) => ({
            tabBarButton: ({ color, size }) => (
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

export default MainNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
