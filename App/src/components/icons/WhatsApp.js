import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import Wa from '../../assets/svg-raw/whatsapp.svg';
import { socialMediaSize } from '../../config/config';

const WhatsApp = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Wa width={socialMediaSize} height={socialMediaSize} />
    </TouchableOpacity>
  );
};

export default WhatsApp;
