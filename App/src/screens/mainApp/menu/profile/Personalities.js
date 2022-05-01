import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AppScrollView from '../../../../components/AppScrollView';
import {colors, height, universalPadding, width} from '../../../../config/config';
import {personalityTraits} from '../../../../hooks/helperArrays';
import AppChip from './../../../../components/AppChip';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import Link from './../../../../components/Link';
import ButtonText from './../../../../components/ButtonText';
import AppButton from './../../../../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from './../../../../appContext';
import firestore from '@react-native-firebase/firestore';
import {useSubscribeToDocument} from '../../../../hooks/useSubscribeToDocument';
import AppIndicator from './../../../../components/AppIndicator';

const Personalities = () => {
  const {user} = useContext(SignUpInfoContext);
  const {userUID} = useContext(AppContext);

  const navigation = useNavigation();
  const [personalities, setPersonalities] = useState(user?.personalities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscribe = firestore()
      .collection('STUDENTS')
      .doc(userUID)
      .onSnapshot(documentSnapShot => {
        setPersonalities(documentSnapShot.data().personalities);
        setIsLoading(false);
      });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        {!isLoading && personalities?.length == 0 && (
          <>
            <Link
              readOnly
              extraStyle={styles.empty}
              text={"you haven't added any personality yet!"}
            />
            <AppButton
              buttonColor={colors.skeletonAnimationBg}
              title="add personalities"
              onPress={() => navigation.navigate('editPersonalities')}
            />
          </>
        )}
        <AppScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.scrollContainer}>
              {!isLoading && personalities?.length > 0
                ? personalities.map((item, index) => (
                    <AppChip
                      readOnly
                      bg={colors.skeletonAnimationBg}
                      value={item}
                      key={index}
                      onPress={() => null}
                    />
                  ))
                : null}
            </View>
          </View>
        </AppScrollView>
      </View>
    </View>
  );
};

export default Personalities;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: universalPadding / 4,
  },
  mainContainer: {
    height: height,
    width: width,
  },
  scrollContainer: {
    backgroundColor: 'transparent',
    height: undefined,
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  empty: {
    textAlign: 'center',
    alignSelf: 'center',
    color: colors.info,
    fontWeight: '300',
  },
});
