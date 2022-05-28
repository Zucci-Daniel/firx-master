import AsyncStorage from '@react-native-async-storage/async-storage';
import {log} from './testLog';

export const storeLocally = async (nameOfTheItem, value) => {
  try {
    const jsonValue = typeof value == 'object' ? JSON.stringify(value) : value;
    await AsyncStorage.setItem(nameOfTheItem, jsonValue);
    console.log('successfully stored the item');
    return true;
  } catch (error) {
    console.log('failed to store item ', error.message);
    return false;
  }
};

export const getFromLocalStorage = async nameOfTheItem => {
  // let response;
  try {
    const theItem = await AsyncStorage.getItem(nameOfTheItem);
    if (theItem) {
      return theItem;
    }
  } catch (error) {
    console.log(error.message, ' while getting user data locally');
    response = 'failed to get value';
  }
  // return response;
};
export const getObjectFromLocalStorage = async nameOfTheItem => {
  // let response;
  try {
    const theItem = await AsyncStorage.getItem(nameOfTheItem);
    if (theItem) {
      return JSON.parse(theItem);
    }
  } catch (error) {
    console.log(error.message, ' while getting user data locally');
    response = 'failed to get value';
  }
  // return response;
};

export const removeFromLocalStorage = async nameOfTheItem => {
  let response;

  try {
    await AsyncStorage.removeItem(nameOfTheItem).then(
      () => (response = `removed ${nameOfTheItem} from local storage`),
    );
  } catch (e) {
    console.log(e.message, ' faild to remove the item from local storage');
    response = 'failed to remove item';
  }

  console.log(response);
  return response;
};
