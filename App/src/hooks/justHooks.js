import {useNetInfo} from '@react-native-community/netinfo';
import ImagePicker from 'react-native-image-crop-picker';
import {postSize, width} from '../config/config';
import uuid from 'react-native-uuid';

export const useCheckNetworkStatus = () => {
  const netInfo = useNetInfo();

  let subscribeToNetworkStats = netInfo.isInternetReachable;

  const subscribeToNetworkStatus = () =>
    netInfo.isInternetReachable ? true : false;

  const networkStatus = () => {
    null;
  };
  return {networkStatus, subscribeToNetworkStats, subscribeToNetworkStatus};
};

export const handleOpenCamera = async () => {
  try {
    const response = await ImagePicker.openCamera({
      width: width,
      height: postSize,
      cropping: true,
    });

    if (response) return response;
    else console.log('failed to get image');
  } catch (error) {
    console.log(error.message, ' fail');
  }
};

export const handleOpenVideo = async () => {
  try {
    const response = await ImagePicker.openCamera({
      mediaType: 'video',
    });
    if (response) return response;
    else console.log('failed to get image');
  } catch (error) {
    console.log(error.message, ' fail');
  }
};
export const handleOpenGallery = async () => {
  try {
    const response = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
      includeBase64: true,
      compressVideoPreset: 'HighestQuality',
    });
    if (response) return response;
    else console.log('failed to get image');
  } catch (error) {
    console.log(error.message, ' fail');
  }
};

export const handlePrepareMedias = data => {
  let awaitingMedias = [];

  data.map((item, index) => {
    const newItem = {
      id: uuid.v4(),
      height: item.height,
      mime:
        item.mime == 'image/jpeg' || item.mime == 'image/png'
          ? 'picture'
          : item.mime == 'video/mp4'
          ? 'video'
          : alert('zucci check the type of file you got'),
      modificationDate: item.modificationDate,
      path: item.path,
      size: item.size,
      width: item.width,
    };
    awaitingMedias.push(newItem);
  });

  return awaitingMedias;
};

export const extractFirstTwoLetterOfWordToUpperCase = sentence => {
  let result = '';
  const sentenceToWordsInArray = sentence.split(' ');
  for (let index = 0; index < sentenceToWordsInArray.length; index++) {
    if (index === 2) {
      break;
    }

    const word = sentenceToWordsInArray[index];
    const letter = word.charAt(0).toUpperCase();

    result = `${result}${letter}`;
  }

  return result;
};
