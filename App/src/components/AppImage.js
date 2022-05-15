import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useContext} from 'react';
import {Avatar} from '../imports/all_packages';
import {SignUpInfoContext} from './../screens/forms/signUpInfoContext';
import {handleImagePicker} from './../hooks/useOperation';
import {colors, width} from '../config/config';
import {theme} from 'react-native-paper';

export default AppImage = ({
  clustered,
  onPress,
  source,
  size = width / 5,
  theImage,
  readOnly = false,
  onLongPressImage,
  onPressOutImage,
}) => {
  const {user, setUser} = useContext(SignUpInfoContext);
  // const [imageUri, setimageUri] = useState();

  const handleSelectImage = async () => {
    const image = await handleImagePicker();
    // setimageUri(image);
    if (image) {
      setUser({...user, profileImage: image});
      theImage && theImage(image);
    } else {
      console.log(' user canceled selection ');
      theImage(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={readOnly ? 1 : 0.2}
        onPress={readOnly ? null : handleSelectImage}
        delayLongPress={200}
        delayPressOut={10}
        onLongPress={onLongPressImage}
        onPressOut={onPressOutImage}>
        {user.profileImage !== null && (
          <Avatar.Image
            style={{borderWidth: 2, borderColor: colors.calmBlue}}
            size={size}
            source={{uri: source ? source : user.profileImage}}
            theme={{
              ...theme,
              backgroundColor: 'white',
              mode: 'adaptive',
              roundness: 15,
            }}
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
