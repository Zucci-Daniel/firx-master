import firestore from '@react-native-firebase/firestore';
import {commonFunctions} from '../imports/all_files';
import {log} from './testLog';
import ImagePicker from 'react-native-image-crop-picker';
import {
  getObjectFromLocalStorage,
  storeLocally,
} from './useLocalStorageFunctions';
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

export const addNewPost = (colRef, docID, newUser) => {
  firestore()
    .collection(colRef)
    .doc(docID)
    .set(newUser)
    .then(response => {
      console.log(`added a new post to ${colRef} collection`);
    })
    .catch(error => {
      console.log(error.message, `can't create a post to ${colRef}`);
    });
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
    console.log('result path ', result.path);
    return result.path;
  } catch (error) {
    console.log(error.image, ' failed selecting an image');
    return false;
  }
};

export const updateDocument = async (id, colRef = 'STUDENTS', newDetails) => {
  try {
    await firestore().collection(colRef).doc(id).update(newDetails);

    console.log('done updating');
    return true;
  } catch (error) {
    console.log('failed to update, ', error.message);
    return false;
  }
};
// export const updateDocument = (id, colRef = 'STUDENTS', newDetails) => {
//   firestore()
//     .collection(colRef)
//     .doc(id)
//     .update(newDetails)
//     .then(() => console.log(' updated!'))
//     .catch(error => console.log('failed, ', error.message));
// };

export const updateAllPostsFields = async (
  id,
  colRef = 'AllPosts',
  newDetails,
) => {
  const allPosts = await firestore()
    .collection(colRef)
    .where('posterUserUID', '==', id)
    .get();

  const batchPost = firestore().batch();

  if (allPosts) {
    allPosts.forEach(postSnapShot =>
      batchPost.update(postSnapShot.ref, newDetails),
    );
    batchPost.commit();
    return true;
  }
};

export const addToArray = async (
  colRef = 'STUDENTS',
  id,
  value,
  fieldName,
  successMessage = 'Post saved!',
  errorMessage = 'Failed to save post',
) => {
  try {
    await firestore()
      .collection(colRef)
      .doc(id)
      .update(
        Array.isArray(value)
          ? {
              [fieldName]: firestore.FieldValue.arrayUnion(...value),
            }
          : {
              [fieldName]: firestore.FieldValue.arrayUnion(value),
            },
      );
    console.log(fieldName, ' updated');
    return true;
  } catch (error) {
    commonFunctions.showToast('', errorMessage, 'ERROR');
    return false;
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
      const responseObj = {...response.data()};

      const userBasicInfo = {
        birthdate: responseObj.birthdate,
        gender: responseObj.gender,
        firstName: responseObj.firstName,
        lastName: responseObj.lastName,
        typeOfStudent: responseObj.typeOfStudent,
        school: responseObj.school,
        bio: responseObj.bio,
        department: responseObj.department,
        level: responseObj.level,
        profileImage: responseObj.profileImage,
        profileImageLocalPath: responseObj.profileImageLocalPath,
        phoneNumber: responseObj.phoneNumber,
        instagram: responseObj.instagram,
        facebook: responseObj.facebook,
        whatsapp: responseObj.whatsapp,
        twitter: responseObj.twitter,
        personalities:responseObj.personalities
      };
      try {
        console.log(
          'storing the information from firestore locally.',
          userBasicInfo,
        );
        await storeLocally('currentUserBasicInfo', userBasicInfo);
      } catch (error) {
        log(' faild to store response locally', error.message);
      }
      return userBasicInfo;
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

export const useGetUserInformation = async (id, online) => {
  if (online) {
    try {
      const response = await useGetUserInformationFromFirestore(id);
      return response;
    } catch (error) {
      console.log(
        "you're online but we failed to get your info from firstore, we're fetching your details locally",
        error.message,
      );
      const response = await useGetUserBasicInformationFromLocalStorage(id);
      return response;
    }
  } else {
    console.log('getting your basic info locally');
    const response = await useGetUserBasicInformationFromLocalStorage();
    return response;
  }
};

export const useFilteredPosts = async (
  postsBlacklisted,
  lastItem,
  limit = 10,
) => {
  const baseUrl = firestore()
    .collectionGroup('AllPosts')
    .orderBy('postID', 'desc');
  const postCondition = lastItem ? baseUrl.startAfter(lastItem) : baseUrl;

  if (!postsBlacklisted.length > 0) {
    //just get all random post.
    let response = await postCondition.limit(limit).get();

    if (response) {
      //bring the store post func here from home

      let results = response.docs.map(result => ({
        id: result.id,
        ...result.data(),
      }));

      return results;
    } else {
      console.log('check ur filterOutBlackList method');
    }
  } else {
    console.log(' posts black list passed!!!', postsBlacklisted);
  }

  if (postsBlacklisted || postsBlacklisted.length > 0) {
    //do not change the postsBlacklisted array
    var copiedPostsBlacklisted = [...postsBlacklisted];
    //remove the black listed post

    var batches = [];

    var index = 0;
    while (index < copiedPostsBlacklisted.length) {
      var batch = copiedPostsBlacklisted.splice(0, 10);

      batches.push(
        postCondition
          .where('postID', 'not-in', [...batch])
          .limit(limit)
          .get()
          .then(results => {
            var output = results.docs.map(result => ({
              id: result.id,
              ...result.data(),
            }));

            // console.log(output, ' output', output.length);
            return output;
          }),
      );
      index++;
    }

    return Promise.all(batches).then(response => {
      return response.flat();
    });
  }
};

export const useGetBlackLists = async id => {
  let postsBlacklisted = [];
  let profilesBlackListed = [];

  try {
    const response = await firestore().collection('STUDENTS').doc(id).get();

    if (response) {
      postsBlacklisted = [...response.data().postsBlackListed];
      profilesBlackListed = [...response.data().profilesBlackListed];

      return {
        postsBlacklisted,
        profilesBlackListed,
      };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const useFetchPosts = async (
  blackListedPosts,
  blackListedProfiles,
  afterDoc,
  limit,
) => {
  try {
    const querySnapshot = await useFilteredPosts(
      blackListedPosts,
      afterDoc,
      limit,
    );
    if (querySnapshot) {
      //get last post
      var lastPost = querySnapshot[querySnapshot.length - 1];

      //push the post to an array ,
      const posts = [];
      if (querySnapshot.length !== 0 || querySnapshot.length <= limit) {
        querySnapshot.forEach(documentSnapshot => {
          if (
            blackListedProfiles
              ? blackListedProfiles.includes(documentSnapshot.posterUserUID) ==
                false
              : true
          ) {
            posts.push({
              item: {
                ...documentSnapshot,
              },
              type: 'normal',
            });
          }
        });
      }

      return {
        lastPost,
        posts,
      };
    } else {
      console.log('theres is no snapshot');
    }
  } catch (error) {
    console.log(error.message, ' failed to get whateverr');
    return false;
  }
};
