import {useState, useContext} from 'react';
import {Alert} from 'react-native';

import storage from '@react-native-firebase/storage';
import {SignUpInfoContext} from './../screens/forms/signUpInfoContext';
import {showToast} from '../functions/commonFunctions';

export const useUploadFile = imageUri => {
  // const {user, setUser} = useContext(SignUpInfoContext);
  const [transfered, settransfered] = useState(null);
  const [loading, setloading] = useState(null);

  const uploadFile = async imageUri => {
    const uploadUri = imageUri;
    try {
      const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
      setloading(true);
      settransfered(0);
      const storageRef = storage().ref(`media/${filename}`);
      const task = storageRef.putFile(uploadUri);
      task.on('state_changed', taskSnapshot => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });

      await task;
      const url = await storageRef.getDownloadURL();
      console.log(`this is your fxxx download url  ${url}`);
      setloading(false);
      settransfered(null);
      return url;
    } catch (error) {
      console.log(error);
      showToast('Failed', error.message, 'ERROR');

      return false;
    }
  };

  return uploadFile;
};
