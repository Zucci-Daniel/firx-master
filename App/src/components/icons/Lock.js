import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import Locked from '../../assets/svg-raw/lock.svg';

const Lock = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Locked width={50} height={50} />
    </TouchableOpacity>
  );
};

export default Lock;
