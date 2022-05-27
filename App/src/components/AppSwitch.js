import * as React from 'react';
import {Switch} from 'react-native-paper';
import {onChange} from 'react-native-reanimated';
import {colors} from '../config/config';
import ToggleSwitch from 'toggle-switch-react-native';

const AppSwitch = ({onChange = () => {}, useValue}) => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(useValue);

  const onToggleSwitch = value => {
    setIsSwitchOn(!isSwitchOn);
    onChange(value);
  };

  return (
    <ToggleSwitch
      isOn={isSwitchOn}
      onColor={'#00C159'}
      offColor={'#DDD9D9'}
      size="medium"
      onToggle={value => onToggleSwitch(value)}
    />
  );
};

export default AppSwitch;
