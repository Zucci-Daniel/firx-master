import {React} from '../../imports/all_RnComponents';

import {Stack} from '../../navigation/create/CreateNavigation';
import EditProfile from './menu/profile/EditProfile';
import {HomeContextProvider} from './home/homeContext';
import EditPersonality from './menu/profile/EditPersonality';
import Camera from './home/Camera';
import AccommodationSection from './menu/Accommodation/AccommodationSection';
import {View} from 'react-native';
import {colors} from '../../config/config';
import MainNavigation from './MainNavigation';
import {FeedContextProvider} from '../../store/feedStore/feedContext';
import AppHeader from './../../components/AppHeader';

const MainApp = ({navigation, route}) => {
  return (
    <View style={{flex: 1, backgroundColor: colors.neonBg}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          headerStyle: {backgroundColor: colors.neonBg},
          headerTintColor: colors.calmBlue,
        }}>
        <Stack.Screen name="mainNavigation" component={MainNavigation} />
        {/* //idealy, this shouldnt be here, i did this beecause i dont want to show the tab bar */}
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{
            headerShown: false,
            title: '',
            animation: 'slide_from_left',
          }}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            title: 'Edit your profile',
          }}
        />
        <Stack.Screen
          name="editPersonalities"
          component={EditPersonality}
          options={{
            headerShown: true,
            title: 'Edit your personalities',
          }}
        />
        <Stack.Screen
          name="AccommodationTab"
          component={AccommodationSection}
          options={{
            headerShown: true,
            headerLeft: () => <AppHeader title={`Edit your accommodation`} />,
            title: '',
          }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default MainApp;
