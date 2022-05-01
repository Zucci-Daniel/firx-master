import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import AppScrollView from '../../../../components/AppScrollView';
import {
  width,
  colors,
  height,
  universalPadding,
} from '../../../../config/config';
import {personalityTraits} from '../../../../hooks/helperArrays';
import AppChip from './../../../../components/AppChip';
import Link from './../../../../components/Link';
import {addToArray, updateDocument} from './../../../../hooks/useOperation';
import {AppContext} from './../../../../appContext';
import AppIndicator from './../../../../components/AppIndicator';
import {useNavigation} from '@react-navigation/native';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';

const EditPersonality = () => {
  const {userUID} = useContext(AppContext);
  const {user} = useContext(SignUpInfoContext);

  const navigation = useNavigation();
  const [personalities, setPersonalities] = useState(user?.personalities);
  const [isUpdating, setIsUpdating] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [personalitiesArray, setPersonalitiesArray] = useState([]);

  const handleOnSelectChip = item => {
    let copiedPersonalities = [...personalities];

    //add it if it isnt there
    if (personalities.includes(item) == true) {
      copiedPersonalities = copiedPersonalities.filter(
        personality => personality !== item,
      );
      setPersonalities([...copiedPersonalities]);
    } else {
      //remove it if it is there

      setPersonalities(old => [...old, item]);
    }
  };

  const handleSubmit = async () => {
    console.log('gona');
    setIsUpdating(true);
    try {
      const updateDocumentResponse = await addToArray(
        'STUDENTS',
        userUID,
        personalities,
        'personalities',
      );
      if (updateDocumentResponse) {
        console.log('success!', updateDocumentResponse);
        setIsUpdating(false);
        navigation.goBack();
      } else setIsUpdating(false);
    } catch (error) {
      console.log(error.message, ' faild to update personaliteies');
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    setPersonalitiesArray(personalityTraits);
    setIsLoading(false);
  }, []);
  return (
    <View style={styles.container}>
      {personalities.length > 0 && !isUpdating ? (
        <Link extraStyle={styles.save} text={'save'} onPress={handleSubmit} />
      ) : personalities.length > 0 && isUpdating ? (
        <AppIndicator
          forSubmiting
          extraIndicatorStyle={styles.extraIndicatorStyle}
        />
      ) : null}
      {/* ///maps from the selected personalities */}
      <View style={styles.section1}>
        {personalities.length == 0 && (
          <Link
            readOnly
            extraStyle={styles.empty}
            text={'your personalities shows up here!'}
          />
        )}
        <AppScrollView>
          <View style={styles.scrollContainer}>
            {personalities.length > 0 &&
              personalities.map((item, index) => (
                <AppChip
                  readOnly
                  bg={colors.skeletonAnimationBg}
                  value={item}
                  key={index}
                  onPress={() => null}
                />
              ))}
          </View>
        </AppScrollView>
      </View>

      {/* ///maps from the list personalities */}
      <View style={styles.section2}>
        <Link
          readOnly
          extraStyle={styles.empty}
          text={'select personalities'}
        />
        <AppScrollView>
          <View style={styles.scrollContainer}>
            {!isLoading ? (
              personalitiesArray.map((item, index) => (
                <AppChip
                  selected={personalities.includes(item) == true ? true : false}
                  value={item}
                  key={index}
                  onPress={() => handleOnSelectChip(item)}
                />
              ))
            ) : (
              <AppIndicator extraIndicatorStyle={styles.extraIndicatorStyle} />
            )}
          </View>
        </AppScrollView>
      </View>
    </View>
  );
};

export default EditPersonality;
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: colors.neonBg,
  },
  section1: {
    height: '30%',
    width: '100%',
  },
  section2: {
    height: undefined,
    width: '100%',
  },
  selectedPersonalities: {
    width: width,
    height: undefined,
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: universalPadding / 3,
  },
  empty: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.info,
  },
  save: {
    textAlign: 'center',
    alignSelf: 'flex-end',
  },
});
