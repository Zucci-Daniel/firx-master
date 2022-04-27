import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import Tt from '../../assets/svg-raw/tiktok.svg';

const TikTok = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Tt width={40} height={40} />
    </TouchableOpacity>
  );
};

export default TikTok;
