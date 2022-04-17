import {
  React,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from '../imports/all_RnComponents';
import {Headline, Subheading, Badge, Button} from '../imports/all_packages';
import {universalPadding, width, sMargin, colors} from '../config/config';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default AppTabButton = ({
  children,
  text,
  onPress,
  background,
  isActive,
  name,
  color,
  size,
}) => {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      style={[
        styles.button,
        {backgroundColor: isActive ? colors.neonBg : colors.neonBg},
      ]}
      contentStyle={styles.innerButton}
      accessibilityRole="link">
      {/* {children} */}
      <Ionicons
        name={name}
        color={isActive ? 'white' : colors.calmBlue}
        size={size}
        style={{fontWeight: 'bold'}}
      />
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderWidth: 0,
    borderRadius:0
  },
  innerButton: {
    height: '100%',
    width: '100%',
  },
});
