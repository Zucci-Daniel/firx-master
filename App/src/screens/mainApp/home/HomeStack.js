import React, {useContext} from 'react';
import {View} from 'react-native';
import {Stack} from '../../../navigation/create/CreateNavigation';
import Home from './Home';
import CreatePost from './CreatePost';
import ButtonText from './../../../components/ButtonText';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import {AppContext} from './../../../appContext';
import ViewPost from './ViewPost';
import Photo from './Photo';
import Video from './Video';
import Write from './Write';
import Camera from './Camera';
import AppFloatMenu from './../../../components/AppFloatMenu';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppCancel from './../../../components/AppCancel';
import {HomeContextProvider} from './homeContext';

const HomeStack = ({navigation}) => {
  const {showBottomTab, setShowBottomTab} = useContext(AppContext);

  const handleCreatePost = () => {
    navigation.navigate('createPost');
    // setShowBottomTab(!showBottomTab);
  };

  return (
    <HomeContextProvider>
      <Stack.Navigator
        screenOptions={{
          animation: 'slide_from_left',
          headerShadowVisible: false,

          headerLeft: () => (
            <AppCancel
              useStyles={false}
              onCancel={() => navigation.goBack(1)}
            />
          ),
        }}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            title: `Vion`,
            animation: 'slide_from_right',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="createPost"
          component={CreatePost}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="camera"
          component={Camera}
          options={{
            headerShown: false,
            title: '',
          }}
        />
        <Stack.Screen
          name="write"
          component={Write}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="video"
          component={Video}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="photo"
          component={Photo}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </HomeContextProvider>
  );
};

export default HomeStack;
