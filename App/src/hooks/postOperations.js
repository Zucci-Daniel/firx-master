import {Alert} from 'react-native';
import {commonFunctions} from '../imports/all_files';
import firestore from '@react-native-firebase/firestore';
import {addToArray} from './useOperation';

///CONFIRM ACTION ISN'T IN USE.
export const confirmAction = (
  id,
  yes,
  no,
  messageTitle = 'POST WILL BE DELETED FOREVER!',
  message = 'you wann delete this anyways?',
  positive = 'Delete anyways',
  negative = 'cancel',
) => {
  Alert.alert(messageTitle, message, [
    {
      text: negative,
      onPress: null,
      style: 'cancel',
    },
    {
      text: positive,
      onPress: () => {
        yes(id);
        return true;
      },
    },
  ]);
};

export const handleDeletePost = async id => {
  try {
    await firestore().collection('AllPosts').doc(id).delete();
    return true;
  } catch (error) {
    console.log(error.message, ' error deleting');
    return false;
  }
};

export const handleSavePost = (id, to) => {
  addToArray('STUDENTS', to, id, 'postsSaved');
};

export const handleUnfollowAuthor = (id, to, unfollowedAuthor) => {
  try {
    addToArray('STUDENTS', to, id, 'profilesBlackListed');
    commonFunctions.showToast(
      '',
      `you've just unfollowed ${unfollowedAuthor}`,
      'alert',
    );
  } catch (error) {
    commonFunctions.showToast(
      '',
      `failed to unfollowed ${unfollowedAuthor}`,
      'error',
    );
  }
};
export const handleStopSeeingPost = (id, to) => {
  try {
    addToArray('STUDENTS', to, id, 'postsBlackListed');
    console.log('', `done`, 'alert');
  } catch (error) {
    commonFunctions.showToast('', `failed`, 'error');
  }
};
