import Toast from 'react-native-toast-message';
import dayjs from 'dayjs';

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
    props: {toastType: toastType},
  });
};

export const convertToCurrency = cash => {
  console.log(' to be converted ', cash);
  return Number(cash).toLocaleString();
};

export const convertToReadableDate = date =>
  dayjs(date.toDate()).format('DD MMM YY, h:mm a');

export const naira = () => '\u20A6';//naira symbol
