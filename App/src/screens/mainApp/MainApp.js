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

const MainApp = ({navigation, route}) => {
  // const {selectedUser} = route.params;

  return (
    <HomeContextProvider>
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
              title: 'Edit your accommodation',
            }}
          />
        </Stack.Navigator>
      </View>
    </HomeContextProvider>
  );
};

export default MainApp;
