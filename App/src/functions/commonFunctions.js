import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';
import RNLocation from 'react-native-location';
import { Alert } from 'react-native';
import Share from 'react-native-share';

//this function basically calls a reuseable toast method.
export const showToast = (
  title = 'title',
  message = 'message goes in here',
  toastType = 'warning',
) => {
  Toast.show({
    type: 'appToast',
    text1: title,
    text2: message,
    props: { toastType: toastType },
  });
};

export const convertToCurrency = cash => {
  console.log(' to be converted ', cash);
  return Number(cash).toLocaleString();
};

export const convertToReadableDate = date =>
  dayjs(date.toDate()).format('DD MMM YY, h:mm a');
////
export const naira = () => '\u20A6'; //naira symbol
////

export const getUserLocation = async () => {


  try {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'coarse' // or 'fine'
      }
    });

    console.log(permission)

    let location;
    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: "whenInUse",
        android: {
          detail: "coarse",
          rationale: {
            title: 'We need to access your location',
            message:
              'We need your location, so we can optionally show where you created a post.',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        }
      })
      if (permission) {
        location = await RNLocation.getLatestLocation({ timeout: 100 })
        console.log(location, ' daniel 1')

        let userLocation = {
          location,
          longitude: location.longitude,
          latitude: location.latitude,
          timestamp: location.timestamp,
        };
        return userLocation;
      } else {
        return false
      }

    } else {
      if (permission) {
        location = await RNLocation.getLatestLocation({ timeout: 100 })
        console.log(location, ' daniel')
        let userLocation = {
          location,
          longitude: location.longitude,
          latitude: location.latitude,
          timestamp: location.timestamp,
        };
        return userLocation;

      }
    }
  } catch (error) {
    console.log(error?.mesage)
  }


}


export const appShare = async (whatToShare = `https://www.npmjs.com/package/react-native-share`) => {
  try {
    await Share.open({
      url: whatToShare,
      title: 'Link to react native share package.'
    });
  } catch (err) {
    console.log(err);
  }
};