import {React, StyleSheet, View, Text} from '../imports/all_RnComponents';
import {Headline, Subheading} from '../imports/all_packages';
import {universalPadding, colors} from '../config/config';

export default InfoText = ({info = 'information', extraStyles}) => {
  return <Headline style={[styles.balance, extraStyles]}>{info}</Headline>;
};

const styles = StyleSheet.create({
  balance: {
    color: colors.fadeWhite,
    width: '90%',
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 14,
    textAlign: 'justify',
    marginVertical: 10,
    marginBottom: universalPadding / 3,
  },
});
