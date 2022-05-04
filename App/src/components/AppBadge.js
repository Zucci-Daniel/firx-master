import React from 'react';
import {Badge} from 'react-native-paper';

export default AppBadge = ({value}) => {
  return (
    <Badge
      theme={{colors: 'red', mode: 'adaptive'}}
      style={{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 13,
        padding: 0,
        fontWeight:'bold'
      }}>
      {value}
    </Badge>
  );
};

// const styles = StyleSheet.create({

// });
