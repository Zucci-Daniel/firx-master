import {React} from '../../imports/all_RnComponents';
import {MainNavigation} from '../../imports/all_files';
import {Stack} from '../../navigation/create/CreateNavigation';
import EditProfile from './menu/profile/EditProfile';
import {HomeContextProvider} from './home/homeContext';
import EditPersonality from './menu/profile/EditPersonality';
import Camera from './home/Camera';
import AccommodationSection from './menu/Accommodation/AccommodationSection';

const MainApp = ({navigation, route}) => {
  // const {selectedUser} = route.params;

  return (
    <HomeContextProvider>
      <Stack.Navigator
        screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="mainNavigation" component={MainNavigation} />
        {/* //idealy, this shouldnt be here, i did this beecause i dont want to show the tab bar */}
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{
            headerShown: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="editProfile"
          component={EditProfile}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="editPersonalities"
          component={EditPersonality}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="AccommodationTab" component={AccommodationSection} />
      </Stack.Navigator>
    </HomeContextProvider>
  );
};

export default MainApp;
