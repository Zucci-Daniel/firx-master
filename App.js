import React, {useEffect, useState, useContext} from 'react';
import Toast from 'react-native-toast-message';
import {StatusBar, LogBox, View} from 'react-native';
import {AppToast, commonFunctions} from './App/src/imports/all_files';
import Navigation from './App/src/navigation/Navigation';

import {SignUpInfoContextProvider} from './App/src/screens/forms/signUpInfoContext';
import {AppContext} from './App/src/appContext';
import {getFromLocalStorage} from './App/src/hooks/useLocalStorageFunctions';
import {log} from './App/src/hooks/testLog';
import {useCheckNetworkStatus} from './App/src/hooks/justHooks';
import AppLoading from './App/src/components/AppLoading';
import {turnOfLocalPersistence} from './App/src/hooks/useOperation';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

//refactor

export default App = () => {
  const {networkStatus, subscribeToNetworkStats} = useCheckNetworkStatus();

  const page = 'app';
  const [showBottomTab, setShowBottomTab] = useState(true);
  const [seenUserUID, setSeenUserUID] = useState(null);
  const [userUID, setUserUID] = useState(null);

  const [isReady, setIsReady] = useState(false);
  const [hasCompletedSignUp, setHasCompletedSignUp] = useState(null);

  const [statusBarColor, setStatusBarColor] = useState(null);

  const checkForUserUID = async () => {
    const response = await getFromLocalStorage('userUID');
    setIsReady(true);

    if (response) {
      log('got the user id ', page, response);
      setUserUID(response);
      return setSeenUserUID(true);
    } else log('no user id ', page, response);
  };

  useEffect(() => {
    log('checking for user id => ', page);
    checkForUserUID();
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs([
      'Require cycles are allowed, but can result in uninitialized values.',
      "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
      'new NativeEventEmitter()',
    ]);
  }, []);

  const toastConfig = {
    //aside from text1, text2, which are the default package props, any other props assigned via props.propName are my custom properties, and i can call them in the show method object where im calling the toast service, and then parse the custom assigned props which in this case is "toastType" in the props object in that place. 😘 simple and short
    appToast: ({text1, text2, props}) => (
      <AppToast title={text1} message={text2} type={props.toastType} />
    ),
  };

  useEffect(() => {
    networkStatus();
    animateStatusBarColor();
  }, [subscribeToNetworkStats]);

  const animateStatusBarColor = () => {
    setStatusBarColor(subscribeToNetworkStats ? 'green' : 'gray');
    setTimeout(() => {
      setStatusBarColor('black');
    }, 2000);
  };

  if (!isReady) return <AppLoading message="" />;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <AppContext.Provider
          value={{
            seenUserUID,
            setSeenUserUID,
            userUID,
            setUserUID,
            showBottomTab,
            setShowBottomTab,
            hasCompletedSignUp,
          }}>
          <SignUpInfoContextProvider>
            <StatusBar backgroundColor={statusBarColor} />
            <Navigation />
            <Toast config={toastConfig} topOffset={0} />
          </SignUpInfoContextProvider>
        </AppContext.Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};
