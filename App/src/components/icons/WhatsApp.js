import {React, TouchableOpacity} from '../../imports/all_RnComponents';

import Wa from '../../assets/svg-raw/whatsapp.svg';

const WhatsApp = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Wa width={40} height={40} />
    </TouchableOpacity>
  );
};

export default WhatsApp;
