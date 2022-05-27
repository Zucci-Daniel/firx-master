import React, {createContext, useState} from 'react';

export const AccommodationContext = createContext();

export const AccommodationContextProvider = ({children}) => {
  const [accommodation, setAccommodation] = useState({
    nameOfPlace: '',
    price: '',
    location: '',
    medias: [],
    extraInfo: [],
    preferences: [],
    available: false,
    startDate: '',
    endDate: '',
  });
  const [isLoading, setIsLoading] = useState(null);
  const [isPosting, setIsPosting] = useState(null);

  return (
    <AccommodationContext.Provider
      value={{
        accommodation,
        setAccommodation,
        isLoading,
        setIsLoading,
        isPosting,
        setIsPosting,
      }}>
      {children}
    </AccommodationContext.Provider>
  );
};
