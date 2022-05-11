import React, {createContext, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import CountrySelectConponent from 'react-native-element-dropdown/src/SelectCountry';
import {useGetNewUser} from '../../../../hooks/useOperation';

export const SelectedUserContext = createContext();

export const SelectedUserContextProvider = ({children}) => {
  //get thier id and make a request here to fetch thier deatils

  const [isFetching, setIsFetching] = useState(true);
  const [id, setId] = useState(null);

  const [selectedUserDoc, setSelectedUserDoc] = useState(null);

  const stopFetching = () => {
    //the changes takes half seconds to update the components, so use timeout to avoid glitches
    setTimeout(() => {
      setIsFetching(false);
    }, 500);
  };

  const getSelectedUser = async id => {
    setIsFetching(true);
    try {
      const response = await useGetNewUser('STUDENTS', id);
      if (response) {
        setSelectedUserDoc({...response.data()});
        stopFetching();
      } else stopFetching();
    } catch (error) {
      console.log('failed to get selected user, ', error.message);
    }
  };

  useEffect(() => {
    getSelectedUser(id);
  }, [id]);

  return (
    <SelectedUserContext.Provider
      value={{
        selectedUserDoc,
        setSelectedUserDoc,
        id,
        setId,
        isFetching,
        setIsFetching,
        getSelectedUser,
      }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
