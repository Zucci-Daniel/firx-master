import firestore from '@react-native-firebase/firestore';
import { commonFunctions } from '../imports/all_files';
import { log } from './testLog';
import {
  getObjectFromLocalStorage,
  storeLocally,
} from './useLocalStorageFunctions';

export const turnOfLocalPersistence = async () => {
  try {
    await firestore().settings({ persistence: false });
  } catch (error) {
    console.warn('failed to clear persistence ', error.message);
  }
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
      response.forEach(post => allPosts.push({ ...post.data() }));
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

// export const handleImagePicker = async () => {
//   try {
//     const result = await ImagePicker.openPicker({
//       width: 300,
//       height: 400,
//       cropping: true,
//       mediaType: 'photo',
//     });
//     console.log('result path ', result.path);
//     return result.path;
//   } catch (error) {
//     console.log(error.image, ' failed selecting an image');
//     return false;
//   }
// };

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
  //this isn't the right name for this function.
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
      const responseObj = { ...response.data() };

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
        personalities: responseObj.personalities,
      };
      try {
        await storeLocally('currentUserBasicInfo', userBasicInfo);
      } catch (error) {
        log(' faild to store response locally', error.message);
      }
      return userBasicInfo;
    } else {
      log('failed to get user info from firebase ');
      return false;
    }
  } catch (error) {
    console.log(
      'error from useOperation, failed to get user basic information , ',
      error.message,
    );
  }
  return false;
};

export const useGetUserBasicInformationFromLocalStorage = async id => {
  try {
    const responseFromStorage = await getObjectFromLocalStorage(
      'currentUserBasicInfo',
    );

    if (responseFromStorage) {
      return responseFromStorage;
    } else {
      console.log(
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
  console.log('getting your basic info your online');
  if (online) {
    try {
      const response = await useGetUserInformationFromFirestore(id);
      if (response) {
        return response;
      } else {
        const response = await useGetUserBasicInformationFromLocalStorage(id);
        return response;
      }
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

export const getFilteredPosts = async (
  postsBlacklisted,
  lastItem,
  limit = 10,
) => {
  try {
    const baseUrl = firestore()
      .collection('AllPosts')
      .orderBy('postID', 'desc');
    const postCondition = lastItem ? baseUrl.startAfter(lastItem) : baseUrl;

    if (!postsBlacklisted.length > 0) {
      //just get all random post.
      let response = await postCondition.limit(limit).get();

      if (response) {
        const lastVisibleItem = response.docs[response.docs.length - 1];

        let results = response.docs.map(result => ({
          id: result.id,
          ...result.data(),
        }));

        return { postsArray: results, lastVisibleItem: lastVisibleItem };
      } else {
        console.log('check ur filterOutBlackList method');
      }
    }

    if (postsBlacklisted || postsBlacklisted.length > 0) {
      console.log(' posts black list passed!!!', postsBlacklisted);
      var copiedPostsBlacklisted = [...postsBlacklisted];
      var batches = [];
      var index = 0;
      var batchChunks = [...splitArrayInChunks(copiedPostsBlacklisted, limit)];

      var lastQueryResult;

      while (index < batchChunks.length) {
        if (lastQueryResult) {
          console.log('?????????????????');
          console.log(batchChunks[index]);
          console.log('?????????????????');
          const results = await postCondition
            .where('postID', 'in', ['fdcda429-3f52-4c4c-b9c5-3025d4e3e04b'])
            .startAfter(lastQueryResult)
            .limit(10)
            .get();

          if (results) {
            batches.push(results.docs);
          } else {
            console.log('there is no result from the RUNNING WITH LAST QUERY!');
          }
        }
        //////
        else {
          console.log('?????????????????');
          console.log(batchChunks[index][0]);
          console.log('?????????????????');
          const results = await postCondition
            .where('postID', 'in', ['fdcda429-3f52-4c4c-b9c5-3025d4e3e04b'])
            .limit(10)
            .get();
          if (results) {
            lastQueryResult = results.docs[results.docs.length - 1];
            batches.push(results.docs);
          } else {
            console.log(
              'there is no result from the RUNNING WITH NO LAST QUERY!',
            );
          }
        }

        index++;
      }

      var allPosts = batches.flat().map(result => ({
        id: result.id,
        ...result.data(),
      }));

      return {
        lastVisibleItem: lastQueryResult,
        postsArray: allPosts,
      };
    }
  } catch (error) {
    console.log('FATAL ERROR ', error.message);
    return false;
  }
};

//move this to a diff file
export function* splitArrayInChunks(arr, n) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

export const useGetBlackLists = async id => {
  let postsBlackListed = [];
  let profilesBlackListed = [];

  try {
    const response = await firestore().collection('STUDENTS').doc(id).get();

    if (response) {
      postsBlackListed = [...response.data().postsBlackListed];
      profilesBlackListed = [...response.data().profilesBlackListed];

      return {
        postsBlackListed,
        profilesBlackListed,
      };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchPostsFromServer = async (
  blackListedPosts,
  blackListedProfiles,
  afterDoc,
  limit,
) => {
  console.log(
    blackListedPosts,
    blackListedProfiles,
    afterDoc,
    limit,
    ' post server payload',
  );
  try {
    const querySnapshot = await getFilteredPosts(
      blackListedPosts,
      afterDoc,
      limit,
    );
    // console.log(querySnapshot, ' snappy');
    if (querySnapshot) {
      const { lastVisibleItem, postsArray } = querySnapshot;

      //get last post

      //push the post to an array ,
      const posts = [];
      if (postsArray.length !== 0 || postsArray.length <= limit) {
        postsArray.forEach(documentSnapshot => {
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
        lastVisibleItem,
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
