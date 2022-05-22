/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';

import color from 'color';
import {colors} from './App/src/config/config';
import {turnOfLocalPersistence} from './App/src/hooks/useOperation';

turnOfLocalPersistence();

//if u notice any off color from react native paper, change it here.
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#010101',
    accent: colors.calmBlue,
    background: '#010101',
    surface: '#010101',
    error: '#B00020',
    text: 'black',
    onSurface: '#000000',
    disabled: color('black').alpha(0.26).rgb().string(),
    placeholder: color('black').alpha(0.54).rgb().string(),
    backdrop: color('black').alpha(0.5).rgb().string(),
    notification: 'cadetblue',
  },
  fonts: configureFonts({
    regular: {
      fontFamily: 'Ubuntu Mono',
      fontWeight: '500',
    },
    medium: {
      fontFamily: 'Ubuntu Mono',
      fontWeight: '800',
    },
    light: {
      fontFamily: 'Ubuntu Mono',
      fontWeight: '800',
    },
    thin: {
      fontFamily: 'Ubuntu Mono',
      fontWeight: '800',
    },
  }),
  animation: {
    scale: 1.0,
  },
};

export default function Main() {
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
