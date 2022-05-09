import {
  React,
  StyleSheet,
  Text,
  TouchableOpacity,
} from '../imports/all_RnComponents';
import {colors, universalPadding} from '../config/config';

export default function Link({
  text,
  onPress,
  extraStyle,
  readOnly = false,
  color,
  touchStyles,
  centered = true,
}) {
  return (
    <TouchableOpacity
      style={touchStyles}
      onPress={onPress}
      activeOpacity={readOnly ? 1 : 0.7}>
      <Text
        style={[
          styles.Link,
          extraStyle,
          {
            color: color ? color : colors.dimBlue,
            alignSelf: centered ? 'center' : 'flex-start',
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  Link: {
    color: '#435CAC',
    margin: universalPadding / 3,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
});
