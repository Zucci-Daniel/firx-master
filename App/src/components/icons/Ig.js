import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Instagram from '../../assets/svg-raw/ig.svg';
import { socialMediaSize } from '../../config/config';

const Ig = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Instagram width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default Ig;
