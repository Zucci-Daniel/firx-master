import React, {createContext, useState} from 'react';
import CountrySelectConponent from 'react-native-element-dropdown/src/SelectCountry';

export const SignUpInfoContext = createContext();

export const SignUpInfoContextProvider = ({children}) => {
  const [didUpdateBasicInfo, setDidUpdateBasicInfo] = useState(false);

  const [user, setUser] = useState({
    birthdate: '',
    gender: '',
    firstName: '',
    lastName: '',
    typeOfStudent: '',
    school: '',
    department: '',
    level: '',
    profileImage: null,
    phoneNumber: '',
  });

  return (
    <SignUpInfoContext.Provider
      value={{user, setUser, didUpdateBasicInfo, setDidUpdateBasicInfo}}>
      {children}
    </SignUpInfoContext.Provider>
  );
};
