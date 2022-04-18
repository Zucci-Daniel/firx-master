// import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {colors} from '../config/config';

import * as React from 'react';
import {FAB, Portal, Provider} from 'react-native-paper';

const AppFloatMenu = ({onPressButton, handlePost = () => {}}) => {
  const actions = [
    {
      icon: 'lead-pencil',
      label: null,
      small: false,
      onPress: () => handlePost(),
    },
  ];
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'plus'}
          actions={actions}
          fabStyle={styles.fab}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default AppFloatMenu;

const styles = StyleSheet.create({
  fab: {
    backgroundColor: colors.calmBlue,
  },
});
