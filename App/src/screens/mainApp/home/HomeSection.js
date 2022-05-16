import React from 'react';

import {FeedContextProvider} from '../../../store/feedStore/feedContext';
import Home from './Home';

const HomeSection = () => {
  return (
    <FeedContextProvider>
      <Home />
    </FeedContextProvider>
  );
};

export default HomeSection;
