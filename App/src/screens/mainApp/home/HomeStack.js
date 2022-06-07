import React, { useContext, useEffect, useRef, useState } from 'react';
import { Stack } from '../../../navigation/create/CreateNavigation';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ViewPost from './userProfile/ViewPost';
import { colors, universalPadding, width } from '../../../config/config';
import SelectedUserStack from './SelectedUserStack';

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeSection from './HomeSection';
import Sheet from '../../../components/Sheet';
import MenuItem from '../../../components/MenuItem';
import { SignUpInfoContext } from './../../forms/signUpInfoContext';
import { extractFirstTwoLetterOfWordToUpperCase } from '../../../hooks/justHooks';
import Security from './Security';
import { detectBiometrics } from '../../../hooks/operations';

const HomeStack = ({ navigation }) => {

  const bottomSheetRef = useRef(null);
  const openSheet = () => bottomSheetRef.current.open();
  const closeSheet = () => bottomSheetRef.current.close();

  const { user, setUser } = useContext(SignUpInfoContext);
  const [isBiometricSupported, setIsBiometricSupported] = useState(null)


  const _handleBiometrics = async () => {
    const response = await detectBiometrics()
    console.log(response, 'resposne');
    if (response === '' || response === 'error' || response === undefined) {
      setIsBiometricSupported(false)
    } else {
      setIsBiometricSupported(true)
    }
  }

  console.log(isBiometricSupported)

  useEffect(() => {
    //check if biometric is supported
    _handleBiometrics()
    //update the state

  }, [])


  const actions = [
    {
      title: 'create a post',
      onPress: () => navigation.navigate('camera'),
      iconName: 'post-add',
      color: colors.pureWhite,
    },
    {
      title: 'view my profile',
      onPress: () => null,
      iconName: 'account-circle',
    },
    {
      title: 'copy profile link',
      onPress: () => null,
      iconName: 'content-copy',
    },
    {
      title: 'switch account',
      onPress: () => null,
      iconName: 'switch-account',
    },
    {
      title: 'add security',
      onPress: () => isBiometricSupported ? navigation.navigate('security') : null,
      iconName: 'security',
      disabled: !isBiometricSupported//tricky, calm down and read the code again.
    },
  ];

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_left',
          headerShadowVisible: false,
          headerTintColor: colors.calmBlue,
          headerStyle: { backgroundColor: colors.neonBg },
        }}>
        <Stack.Screen
          name="home"
          component={HomeSection}
          options={{
            title: ``,
            animation: 'slide_from_right',
            headerShown: true,

            headerLeft: () => (
              <Entypo name="app-store" size={30} color={colors.calmBlue} />
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={openSheet}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    textTransform: 'uppercase',
                    color: colors.calmBlue,
                    flexDirection: 'row',
                    fontSize: 20,
                  }}>
                  {extractFirstTwoLetterOfWordToUpperCase(
                    user?.firstName + ' ' + user?.lastName,
                  )}
                </Text>
                <Ionicons name="chevron-down-outline" size={30} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="viewPost"
          component={ViewPost}
          options={{
            animation: 'slide_from_right',
            headerShown: true,
            title: 'Post Details',
          }}
        />

        <Stack.Screen
          name="userProfileStack"
          component={SelectedUserStack}
          options={{
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <Sheet sheetRef={bottomSheetRef} modalStyle={styles.sheetStyle}>
        <Entypo
          name="app-store"
          size={70}
          color={colors.calmBlue}
          style={{ alignSelf: 'center', padding: 20 }}
        />
        <View style={[styles.container, { height: undefined }]}>
          <View style={styles.actionRow}>
            {actions.map((action, index) => (
              <MenuItem
                key={index}
                title={action.title}
                optionColor={action.color ? action.color : colors.calmBlue}
                iconColor={
                  action.iconColor ? action.iconColor : colors.calmBlue
                }
                onPress={() => {
                  action.onPress();
                  closeSheet();
                }}
                iconName={action.iconName}
                disabled={action?.disabled}
              />
            ))}
          </View>
        </View>
      </Sheet>
    </>
  );
};

export default HomeStack;

const styles = StyleSheet.create({
  container: {
    paddingVertical: universalPadding / 2,
    width: width,
    backgroundColor: colors.skeletonAnimationBg,
  },
  actionRow: {
    width: '100%',
  },
  sheetStyle: {
    backgroundColor: colors.skeletonAnimationBg,
  },
});
