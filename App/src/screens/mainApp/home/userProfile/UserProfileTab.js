import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SelectedUserContext} from './selectedUserContext';
import AnimatedImage from './../../../../components/AnimatedImage';
import ProfilePane from './../../../../components/ProfilePane';
import SweetButton from './../../../../components/SweetButton';
import SocialHandles from './../../../../components/SocialHandles';
import InfoText from './../../../../components/InfoText';
import {colors, universalPadding, width} from '../../../../config/config';
import SeparatedButtons from '../../../../components/SeparatedButtons';
import MediaSkeleton from './../../../../components/MediaSkeleton';
import {MemoAppChip} from './../../../../components/AppChip';
import Link from './../../../../components/Link';
import PlaceHolderParagraph from './../../../../components/PlaceHolderParagraph';

const UserMainProfile = ({navigation, route}) => {
  const {selectedUserDoc, isFetching} = useContext(SelectedUserContext);
  const [showModal, setShowModal] = useState(false);

  const showImage = () => setShowModal(true);

  const hideModal = () => setShowModal(false);

  const handleGotoAcc = () => {
    navigation.navigate('userAccommodation');
  };

  if (isFetching) return <MediaSkeleton />;

  return (
    <View style={styles.container}>
      <AnimatedImage
        image={selectedUserDoc?.profileImage}
        isVisible={showModal}
        onBackButtonPress={hideModal}
        onBackPress={hideModal}
      />
      <ProfilePane
        noPadding
        onPressOutImage={hideModal}
        onLongPressImage={showImage}
        username={`${selectedUserDoc?.firstName} ${selectedUserDoc?.lastName}`}
        schoolInfo={`${selectedUserDoc?.department} ${selectedUserDoc?.level}`}
        externalProfileImage={selectedUserDoc?.profileImage}
        dark={true}
        readOnly
      />
      <InfoText info={selectedUserDoc?.bio} />
      <SocialHandles
        instagram={selectedUserDoc?.instagram}
        twitter={selectedUserDoc?.twitter}
        whatsapp={selectedUserDoc?.whatsapp}
        facebook={selectedUserDoc?.facebook}
        phone={selectedUserDoc?.phone}
      />
      <SeparatedButtons>
        <SweetButton
          extraStyles={styles.accommodation}
          text="accommodation"
          onPress={() => handleGotoAcc()}
        />
        <SweetButton
          extraStyles={styles.accommodation}
          text="send request"
          bg={colors.info}
          onPress={() => null}
        />
      </SeparatedButtons>

      <View style={styles.mainContainer}>
        <Link readOnly text={`personalities`} centered={false} />

        <View style={styles.scrollContainer}>
          {!isFetching && selectedUserDoc?.personalities?.length > 0
            ? selectedUserDoc?.personalities.map((item, index) => (
                <MemoAppChip
                  readOnly
                  bg={colors.skeletonAnimationBg}
                  value={item}
                  key={index}
                  onPress={() => null}
                />
              ))
            : null}
        </View>
        <PlaceHolderParagraph
          onPress={() => navigation.navigate('userMedia')}
          text={'Swipe right to see your medias'}
          extraStyles={{
            textAlign: 'center',
            color: colors.calmBlue,
            marginVertical: 10,
          }}
        />
      </View>
    </View>
  );
};

export default UserMainProfile;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: width,
    backgroundColor: colors.neonBg,
    justifyContent: 'center',
  },
  container: {
    height: undefined,
    width: width,
    paddingHorizontal: universalPadding / 3,
    paddingBottom: universalPadding / 5,
    backgroundColor: colors.neonBg,
  },

  accommodation: {
    marginVertical: universalPadding / 4,
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
});
