import React from 'react';
import {colors} from '../../../../config/config';
import FrontPage from './FrontPage';
import ProfileMedia from './ProfileMedia';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AppIndicator from './../../../../components/AppIndicator';

const Tab = createMaterialTopTabNavigator();

const Profile = ({navigation}) => {

  return (
    <>
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: colors.neonBg}}
        screenOptions={{
          lazy: true,
          lazyPlaceholder: () => <AppIndicator />,
          tabBarShowLabel: false,
          tabBarStyle: {display: 'none'},
        }}>
        <Tab.Screen name="frontPage" component={FrontPage} />
        <Tab.Screen name="profileMedia" component={ProfileMedia} />
      </Tab.Navigator>
    </>
  );
};

export default Profile;
