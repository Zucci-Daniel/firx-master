import React from 'react';
import {View} from 'react-native';
import { AccommodationContextProvider } from './accContext/accContext';
import AccommodationTab from './AccommodationTab';

const AccommodationSection = () => {
  return (
    <AccommodationContextProvider>
      <AccommodationTab />
    </AccommodationContextProvider>
  );
};

export default AccommodationSection;
