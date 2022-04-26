import {React} from '../../imports/all_RnComponents';
import {MainNavigation} from '../../imports/all_files';
import {Stack} from '../../navigation/create/CreateNavigation';
import ViewPost from './home/ViewPost';
import {useRoute} from '@react-navigation/native';
import EditProfile from './menu/profile/EditProfile';

const MainApp = ({navigation, route}) => {
  // const {selectedUser} = route.params;

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="mainNavigation" component={MainNavigation} />
      <Stack.Screen name="viewPost" component={ViewPost} />
      <Stack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainApp;
