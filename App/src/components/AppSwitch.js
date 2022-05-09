import * as React from 'react';
import {Switch} from 'react-native-paper';
import {onChange} from 'react-native-reanimated';
import {colors} from '../config/config';
const AppSwitch = ({onChange = () => {}, useValue}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(useValue);

  const onToggleSwitch = value => {
    setIsSwitchOn(!isSwitchOn);
    onChange(value);
  };

  return (
    <Switch
      color="#66ff00"
      value={isSwitchOn}
      onValueChange={value => onToggleSwitch(value)}
    />
  );
};

export default AppSwitch;
