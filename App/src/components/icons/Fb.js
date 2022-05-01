import {React, TouchableOpacity} from '../../imports/all_RnComponents';
import Facebook from '../../assets/svg-raw/fb.svg';
import { socialMediaSize } from '../../config/config';

const Fb = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Facebook width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default Fb;
