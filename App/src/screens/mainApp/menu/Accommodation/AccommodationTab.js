import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {confirmAction} from './../../../../hooks/postOperations';
import ButtonText from './../../../../components/ButtonText';
import AppCancel from './../../../../components/AppCancel';
import {
  colors,
  tabBarConfig,
  tabBarIndicatorConfig,
  tabBarLabelConfig,
  universalPadding,
  width,
} from '../../../../config/config';
import AppIndicator from './../../../../components/AppIndicator';
import Accommodation from './Accommodation';
import Descriptions from './Descriptions';
import {useNavigation} from '@react-navigation/native';
import {AccommodationContext} from './accContext/accContext';
import Preferences from './Preferences';
import AppBadge from './../../../../components/AppBadge';

const AccommodationTab = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const {accommodation, setAccommodation} = useContext(AccommodationContext);

  const validateDescription =
    accommodation.price !== '' &&
    accommodation.location !== '' &&
    accommodation.nameOfPlace !== ''
      ? true
      : false;

  const validatePreferences =
    accommodation.preferences.length > 0 ? true : false;

  return (
    <View style={styles.Accommodation}>
      <Tab.Navigator
        sceneContainerStyle={styles.sceneContainerStyle}
        screenOptions={{
          tabBarLabelStyle: {
            ...tabBarLabelConfig,
          },
          tabBarStyle: {...tabBarConfig},
          tabBarIndicatorStyle: {
            ...tabBarIndicatorConfig,
            backgroundColor: 'transparent',
          },
          tabBarShowLabel: true,
          tabBarShowIcon: true,
          swipeEnabled: false,
          lazy: true,
          lazyPlaceholder: () => <AppIndicator />,
          tabBarInactiveTintColor: colors.chip,
          tabBarActiveTintColor: 'white',
          tabBarPressColor: 'transparent',
        }}
        screenListeners={{
          tabPress: e => e.preventDefault(),
        }}>
        <Tab.Screen
          name="accommodation"
          component={Accommodation}
          options={{
            title: 'your home',
            tabBarLabelStyle: {
              ...styles.labelStyles,
              backgroundColor:
                accommodation.medias.length > 0
                  ? colors.calmGreen
                  : colors.hairLineColor,
            },
          }}
        />
        <Tab.Screen
          name="descriptions"
          component={Descriptions}
          options={{
            title: 'Description',
            tabBarLabelStyle: {
              ...styles.labelStyles,
              backgroundColor: validateDescription
                ? colors.calmGreen
                : colors.hairLineColor,
            },
          }}
        />
        <Tab.Screen
          name="preferences"
          component={Preferences}
          options={{
            title: 'preference',
            tabBarBadge: () => (
              <AppBadge value={accommodation.preferences.length} />
            ),
            tabBarLabelStyle: {
              ...styles.labelStyles,
              backgroundColor: validatePreferences
                ? colors.calmGreen
                : colors.hairLineColor,
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default AccommodationTab;
const styles = StyleSheet.create({
  sceneContainerStyle: {
    backgroundColor: colors.neonBg,
  },
  Accommodation: {
    flex: 1,
    backgroundColor: colors.neonBg,
    paddingBottom: universalPadding,
  },
  wrapper: {
    height: 50,
    width: width,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  extraActionsStyles: {
    marginVertical: universalPadding / 3,
  },
  labelStyles: {
    paddingHorizontal: 2,
    fontSize: 12,
    borderRadius: universalPadding / 3,
  },
});
