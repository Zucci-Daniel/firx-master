import { React } from '../imports/all_RnComponents';
import { Stack, Nav_Container as NavContainer } from './create/CreateNavigation';

//later, refactor this
import Auth from './../screens/auths/Auth';
import { useContext } from 'react';
import { AppContext } from './../appContext';
import MainApp from './../screens/mainApp/MainApp';

import { Host } from 'react-native-portalize';

const Navigation = () => {
  const { seenUserUID } = useContext(AppContext);

  return (
    <>
      <NavContainer>
        <Host>{seenUserUID ? <MainApp /> : <Auth />}</Host>
      </NavContainer>
    </>
  );
};

export default Navigation;
