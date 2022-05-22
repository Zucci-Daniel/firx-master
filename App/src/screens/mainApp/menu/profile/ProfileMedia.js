import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  colors,
  tabBarConfig,
  tabBarIndicatorConfig,
  tabBarLabelConfig,
} from '../../../../config/config';
import Personalities from './Personalities';
import SavedPosts from './../SavedPosts/SavedPosts';
import AuthoredPosts from './../AuthoredPosts/AuthoredPosts';
import AppIndicator from './../../../../components/AppIndicator';

const Tab = createMaterialTopTabNavigator();

const ProfileMedia = () => {
  return (
    <View style={{backgroundColor: colors.neonBg, flex: 1}}>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainerStyle}
        screenOptions={{
          tabBarLabelStyle: {...tabBarLabelConfig, color: colors.calmBlue},
          tabBarStyle: {...tabBarConfig},
          tabBarIndicatorStyle: {...tabBarIndicatorConfig},
          tabBarShowLabel: true,
          tabBarShowIcon: true,
          swipeEnabled: false,
          lazy: true,
          lazyPlaceholder: () => <AppIndicator />,
        }}>
        <Tab.Screen
          name="recentPosts"
          component={AuthoredPosts}
          options={{title: 'your recent posts'}}
        />
        <Tab.Screen name="saved" component={SavedPosts} />
      </Tab.Navigator>
    </View>
  );
};

export default ProfileMedia;

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
  },
});
