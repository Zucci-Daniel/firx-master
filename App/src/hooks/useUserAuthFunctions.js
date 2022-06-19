import auth from '@react-native-firebase/auth';
import { useContext } from 'react';
import { removeFromLocalStorage } from './useLocalStorageFunctions';
import { AppContext } from '../appContext';

export const logOut = () => {
  removeFromLocalStorage('userUID');
  removeFromLocalStorage('currentUserBasicInfo');
  // return auth().signOut();

};
