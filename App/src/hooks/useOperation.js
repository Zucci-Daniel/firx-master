import firestore from '@react-native-firebase/firestore';
import {commonFunctions} from '../imports/all_files';
import {log} from './testLog';
import ImagePicker from 'react-native-image-crop-picker';
import {getObjectFromLocalStorage, storeLocally} from './useLocalStorageFunctions';
import {useCheckNetworkStatus} from './justHooks';

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


export const useGetUserInformationFromFirestore = async id => {
  try {
    const response = await useGetNewUser('STUDENTS', id);

    if (response) {
      //prepare the data. because u don't want to store every user from the db to the local storage, we're basically taking what we want.
      const responseObj = {...response.data()};

      const userBasicInfo = {
        birthdate: responseObj.birthdate,
        gender: responseObj.gender,
        firstName: responseObj.firstName,
        lastName: responseObj.lastName,
        typeOfStudent: responseObj.typeOfStudent,
        school: responseObj.school,

        department: responseObj.department,
        level: responseObj.level,
        profileImage: responseObj.profileImage,
        phoneNumber: responseObj.phoneNumber,
      };
      try {
        await storeLocally('currentUserBasicInfo', userBasicInfo);
        return userBasicInfo;
      } catch (error) {
        log(' faild to store response locally', error.message);
      }
    } else {
      log('failed to get user info from firebase ');
    }
  } catch (error) {
    console.log(
      'error from useOperation, failed to get user basic information , ',
      error.message,
    );
  }
};

export const useGetUserBasicInformationFromLocalStorage = async id => {
  try {
    const responseFromStorage = await getObjectFromLocalStorage(
      'currentUserBasicInfo',
    );

    if (responseFromStorage) {
      console.log(`got basic info locally , setting user context `);
      console.log(responseFromStorage, ' the response from local storage');
      return responseFromStorage;
    } else {
      commonFunctions.showToast(
        'operation failed',
        `could'nt get basic info locally`,
        'ERROR',
      );
    }
  } catch (error) {
    console.log(error.message, ' failed to get user information');
  }
};
