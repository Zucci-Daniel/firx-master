import {
  React,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from '../imports/all_RnComponents';
import {Headline, Subheading} from '../imports/all_packages';
import {
  universalPadding,
  width,
  sMargin,
  colors,
  brandFont,
} from '../config/config';

export default ButtonText = ({onPress, title = 'title',bg='black'}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{paddingHorizontal: universalPadding / 4}}>
      <Text style={[styles.text,{backgroundColor:bg}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'black',
    color: colors.pureWhite,
    fontFamily: brandFont.medium,
    fontWeight: 'bold',
    paddingHorizontal: universalPadding/1.2,
    paddingVertical: universalPadding / 10,
    borderRadius: 5,
    fontSize: 12,
    textTransform:'capitalize'
  },
});
