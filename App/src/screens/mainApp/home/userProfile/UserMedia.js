import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  colors,
  tabBarConfig,
  tabBarIndicatorConfig,
  tabBarLabelConfig,
} from '../../../../config/config';
import SelectedUserAuthoredPosts from './SelectedUserAuthoredPosts';
import AppIndicator from './../../../../components/AppIndicator';
import {SelectedUserContext} from './selectedUserContext';
import UserAccommodation from './userAccommodation';

const Tab = createMaterialTopTabNavigator();

const UserMedia = ({route, navigation}) => {
  const {selectedUserDoc, isFetching, setId, getSelectedUser} =
    useContext(SelectedUserContext);

  return (
    <View style={{flex: 1}}>
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
          name="selectedUserAuthoredPosts"
          component={SelectedUserAuthoredPosts}
          options={{title: `${selectedUserDoc?.firstName ?? 'Anonymous'}'s posts`}}
        />
        <Tab.Screen
          name="userAccommodation"
          component={UserAccommodation}
          options={{title: `accommodation`}}
        />
      </Tab.Navigator>
    </View>
  );
};

export default UserMedia;

const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
  },
});
