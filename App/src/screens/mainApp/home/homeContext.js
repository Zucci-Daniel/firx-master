import React, {createContext, useState} from 'react';

export const HomeContext = createContext();

export const HomeContextProvider = ({children}) => {
  const [posted, setPosted] = useState(0);

  return (
    <HomeContext.Provider value={{posted, setPosted}}>
      {children}
    </HomeContext.Provider>
  );
};
