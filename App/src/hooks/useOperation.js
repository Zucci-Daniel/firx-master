import firestore from '@react-native-firebase/firestore';
import {launchImageLibrary} from 'react-native-image-picker';
import {commonFunctions} from '../imports/all_files';
import {log} from './testLog';
import ImagePicker from 'react-native-image-crop-picker';

export const turnOfLocalPersistence = async () => {
  try {
    await firestore().settings({persistence: false});
  } catch (error) {
    console.warn('failed to clear persistence ', error.message);
  }
  // console.log('lollll')
};

export const addNewUserToDb = (colRef, docID, newUser) => {
  const response = firestore()
    .collection(colRef)
    .doc(docID)
    .set(newUser)
    .then(response => {
      console.log(`added a new user to ${colRef} db`);
      response = true;
    })
    .catch(error => {
      console.log(error.message, `can't add a new user to ${colRef}`);
      response = false;
    });
  return response;
};

export const useGetNewUser = async (colRef = 'STUDENTS', docID) => {
  try {
    const response = await firestore().collection(colRef).doc(docID).get();
    log(response.exists, ' it exists, useGetNewUse()', docID);
    return response;
  } catch (error) {
    log(`error`, ' useOperation() ', error.message);
  }
};

export const getAllPost = async colRef => {
  try {
    const allPosts = [];
    const response = await firestore().collection(colRef).get();

    if (response) {
      response.forEach(post => allPosts.push({...post.data()}));
    }

    return allPosts;
  } catch (error) {
    console.log(error.message, ' failed');
  }
};

export const addNewPost = async (colRef, docID, newUser) => {
  await toggleNetwork();

  const response = firestore()
    .collection(colRef)
    .doc(docID)
    .set(newUser)
    .then(response => {
      console.log(`added a new post to ${colRef} collection`);
      response = true;
    })
    .catch(error => {
      console.log(error.message, `can't create a post to ${colRef}`);
      response = false;
    });
  return response;
};

export const toggleNetwork = async () => {
  console.log('toggling network');
  // const response = await firestore().disableNetwork();
  // response && (await firestore().enableNetwork());
};

export const getIfDocExist = async (colRef, docID) => {
  try {
    await toggleNetwork();
    let userExist;
    const response = await firestore().collection(colRef).doc(docID).get();
    console.log(response, ' searching for him');
    return (userExist = response.exists);
  } catch (error) {
    console.log(`error checking if doc exists `, error.message);
  }
};

// export const handleImagePicker = async () => {
//   //use image crop picker isntead
//   try {
//     let choosedImage;
//     const result = await launchImageLibrary({mediaType: 'photo'});
//     if (!result.didCancel) {
//       console.log(
//         result.assets[0].uri,
//         ' file name from handleImagePicker function ',
//       );
//       choosedImage = result.assets[0].uri;
//     }
//     return choosedImage;
//   } catch (error) {
//     console.log(error.image, ' failed selecting an image');
//   }
// };

export const handleImagePicker = async () => {
  try {
    const result = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
    });
    return result.path;
  } catch (error) {
    console.log(error.image, ' failed selecting an image');
  }
};

export const updateDocument = (id, colRef = 'STUDENTS', newDetails) => {
  firestore()
    .collection(colRef)
    .doc(id)
    .update(newDetails)
    .then(() => console.log(' updated!'))
    .catch(error => console.log('failed, ', error.message));
};

export const addToArray = (
  colRef = 'STUDENTS',
  id,
  value,
  fieldName,
  successMessage = 'Post saved!',
  errorMessage = 'Failed to save post',
) => {
  try {
    firestore()
      .collection(colRef)
      .doc(id)
      .update({
        [fieldName]: firestore.FieldValue.arrayUnion(value),
      });

    commonFunctions.showToast('', successMessage, 'SUCCESS');
  } catch (error) {
    commonFunctions.showToast('', errorMessage, 'ERROR');
  }
};

export const getPost = async (colRef = 'AllPosts', postId) => {
  try {
    const response = await firestore().collection(colRef).doc(postId).get();
    log(response.exists, ' it exists, useGetNewUse()', postId);
    return response;
  } catch (error) {
    commonFunctions.showToast('', 'cannot get post now!', 'ERROR');
  }
};
