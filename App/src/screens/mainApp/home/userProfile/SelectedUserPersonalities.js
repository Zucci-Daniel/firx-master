import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AppScrollView from '../../../../components/AppScrollView';
import {
  colors,
  height,
  universalPadding,
  width,
} from '../../../../config/config';
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
import {SelectedUserContext} from './selectedUserContext';
import AppAnimatedImageView from '../../../../components/AppAnimatedImageView';

const SelectedUserPersonalities = () => {
  const {
    selectedUserDoc,
    setSelectedUserDoc,
    isFetching,
    setIsFetching,
    id,
    setId,
  } = useContext(SelectedUserContext);

  //   const navigation = useNavigation();
  const [personalities] = useState(selectedUserDoc?.personalities);

  console.log(personalities, ' ===');

  return (
    <View style={styles.container}>
      <View style={styles.section1}>
        {!isFetching && personalities?.length == 0 && (
          <>
            <Link
              readOnly
              extraStyle={styles.empty}
              text={`${selectedUserDoc.firstName} hasn't updated his personality yet`}
            />
          </>
        )}
        <AppScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.scrollContainer}>
              {!isFetching && personalities?.length > 0
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
          <AppAnimatedImageView />
        </AppScrollView>
      </View>
    </View>
  );
};

export default SelectedUserPersonalities;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: universalPadding / 4,
    backgroundColor: 'transparent',
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
