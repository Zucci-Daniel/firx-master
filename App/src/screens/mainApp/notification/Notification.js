import Link from '../../../components/Link';
import { colors } from '../../../config/config';
import {
  React,
  StyleSheet,
  View,
  ScrollView,
} from '../../../imports/all_RnComponents';


const Notification = () => {
  

  return <View style={styles.container}>
    <Link readOnly text={'search feature coming soon'} />
  </View>;
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.neonBg,
    alignContent:'center',
    justifyContent:'center'
  },
});
