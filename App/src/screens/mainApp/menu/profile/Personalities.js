import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AppScrollView from '../../../../components/AppScrollView';
import {colors, universalPadding, width} from '../../../../config/config';

import {MemoAppChip} from './../../../../components/AppChip';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import AppIndicator from '../../../../components/AppIndicator';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from './../../../../appContext';
import firestore from '@react-native-firebase/firestore';
import Retry from '../../../../components/Retry';

//tjhis file is not in use anymore

const Personalities = () => {
  const {user} = useContext(SignUpInfoContext);
  const {userUID} = useContext(AppContext);

  const navigation = useNavigation();
  const [personalities, setPersonalities] = useState(
    user?.personalities ?? null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const subscribe = firestore()
      .collection('STUDENTS')
      .doc(userUID)
      .onSnapshot(documentSnapShot => {
        setPersonalities(documentSnapShot.data()?.personalities ?? null);
        setIsLoading(false);
      });

    return () => subscribe();
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading && personalities == null && (
        <View style={{height: '100%', justifyContent: 'center'}}>
          <Retry
            notice="you haven't added any personality yet, or your mobile data is turned off"
            handleRetry={() => navigation.navigate('editPersonalities')}
          />
        </View>
      )}
      <View style={styles.section1}>
        <AppScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.scrollContainer}>
              {!isLoading && personalities?.length > 0 ? (
                personalities.map((item, index) => (
                  <MemoAppChip
                    readOnly
                    bg={colors.skeletonAnimationBg}
                    value={item}
                    key={index}
                    onPress={() => null}
                  />
                ))
              ) : (
                <AppIndicator />
              )}
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
    width: width,
    padding: universalPadding / 4,
    backgroundColor: colors.neonBg,
  },

  mainContainer: {
    height: undefined,
    width: width,
    paddingBottom: 300,
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
