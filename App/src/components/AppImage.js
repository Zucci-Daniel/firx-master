import {
  React,
  StyleSheet,
  TouchableOpacity,
  useState,
  View,
  Text,
} from '../imports/all_RnComponents';
import {useContext} from 'react';
import {Avatar} from '../imports/all_packages';
import {launchImageLibrary} from 'react-native-image-picker';
import {SignUpInfoContext} from './../screens/forms/signUpInfoContext';
import {useGetFirstLetters} from './../hooks/useGetFirstLetters';
import {handleImagePicker} from './../hooks/useOperation';
import {width} from '../config/config';
import {theme} from 'react-native-paper';


export default AppImage = ({
  clustered,
  onPress,
  source = require('../assets/1.jpg'),
  size = width / 5,
  theImage,
  readOnly = false,
}) => {
  const {user, setUser} = useContext(SignUpInfoContext);
  // const [imageUri, setimageUri] = useState();

  const handleSelectImage = async () => {
    const image = await handleImagePicker();
    // setimageUri(image);
    if (image) {
      setUser({...user, profileImage: image});
      theImage && theImage(image);
    }
  };

  return (
    <>
      <TouchableOpacity onPress={readOnly ? null : handleSelectImage}>
        {user.profileImage !== null && (
          <Avatar.Image
            size={size}
            source={{uri: user.profileImage}}
            theme={{...theme, backgroundColor: 'white'}}
          />
        )}
        {!user.profileImage && (
          <Avatar.Image size={size} source={require('../assets/avatar.png')} />
        )}
        {!user.profileImage && (
          <View style={styles.AppImageDefault}>
            <Text style={styles.placeHolderName}>
              {/* {useGetFirstLetters(user?.firstName, user?.lastName)} */}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  AppImageDefault: {
    height: 100,
    width: 100,
    backgroundColor: 'black',
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeHolderName: {
    fontSize: 100 / 3,
  },
});
