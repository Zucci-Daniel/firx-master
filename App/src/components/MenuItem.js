import {
  React,
  StyleSheet,
  TouchableOpacity,
  View,
} from '../imports/all_RnComponents';
import {List, MaterialIcons} from '../imports/all_packages';
import {
  colors,
  universalPadding,
  menuIconSize,
  brandFont,
} from '../config/config';

export default function MenuItem({
  onPress,
  title = 'title',
  iconName = 'receipt',
  icon,
  optionColor,
  iconColor,
  optionPadding,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {paddingVertical: optionPadding}]}>
      <List.Item
        titleStyle={[styles.Option, {color: optionColor}]}
        title={title}
        left={props => (
          <List.Icon
            {...props}
            icon={({color}) =>
              icon ? (
                icon
              ) : (
                <MaterialIcons
                  name={iconName}
                  size={menuIconSize}
                  color={iconColor ? iconColor : colors.calmBlue}
                />
              )
            }
          />
        )}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: universalPadding / 3,
  },
  Option: {
    textTransform: 'capitalize',
    color: colors.pureWhite,
    fontSize: 16,
  },
});
