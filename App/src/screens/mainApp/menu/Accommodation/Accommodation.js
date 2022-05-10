import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {colors, universalPadding, width} from '../../../../config/config';
import AppMediaDisplay from './../../../../components/AppMediaDisplay';
import MediaDisplayActions from './../../../../components/MediaDisplayActions';
import {useNavigation} from '@react-navigation/native';
import {uploadAfile} from './../../../../hooks/uploadAfile';
import {AppContext} from './../../../../appContext';
import {SignUpInfoContext} from './../../../forms/signUpInfoContext';
import {HomeContext} from './../../home/homeContext';
import {handleOpenCamera, handleOpenGallery} from '../../../../hooks/justHooks';
import {AccommodationContext} from './accContext/accContext';
import {
  handleOpenVideo,
  handlePrepareMedias,
} from './../../../../hooks/justHooks';
import Link from '../../../../components/Link';
import PlaceHolderParagraph from '../../../../components/PlaceHolderParagraph';
import SweetButton from './../../../../components/SweetButton';

const Accommodation = ({accommodationMedias, navigation}) => {
  const {userUID} = useContext(AppContext);
  const {user} = useContext(SignUpInfoContext);

  const [finishedUploadingMedia, setFinishedUploadingMedia] = useState(null);
  //this post state should be global laters!
  const {accommodation, setAccommodation} = useContext(AccommodationContext);
  const camera = async () => {
    const dataArray = await handleOpenCamera();
    if (dataArray) {
      selectedMedia([dataArray]);
    }
  };

  const video = async () => {
    const dataArray = await handleOpenVideo();
    if (dataArray) {
      selectedMedia([dataArray]);
    }
  };
  const gallery = async () => {
    const dataArray = await handleOpenGallery();
    if (dataArray) {
      selectedMedia(dataArray);
    }
  };

  const selectedMedia = data => {
    const stateMedia = accommodation.medias;

    let newMedias = [];
    const awaitingMedias = handlePrepareMedias(data);
    //filter from the awaiting accommodation.medias and chekc if any file exist already instate.
    awaitingMedias.forEach(newItem => {
      const exist = stateMedia.find(media => media.path == newItem.path)
        ? true
        : false;
      exist == false ? newMedias.push(newItem) : null;
    });

    setAccommodation({
      ...accommodation,
      medias: [...accommodation.medias, ...newMedias],
    });
  };
  const removeMedia = id => {
    let stateMedia = accommodation.medias;
    stateMedia = stateMedia.filter(media => media.id !== id);
    setAccommodation({...accommodation, medias: stateMedia});
  };

  // console.log(accommodation.medias,' acc media',accommodation.medias.length)
  return (
    <>
      {!accommodation.medias?.length > 0 && (
        <View style={styles.container}>
          <PlaceHolderParagraph
            text={
              'Start by adding pictures of your home.. click on any button below to add images/videos of your home'
            }
          />
        </View>
      )}
      <AppMediaDisplay
        data={accommodation.medias}
        onRemoveItem={id => removeMedia(id)}
      />

      <View style={styles.wrapper}>
        <MediaDisplayActions
          extraStyles={styles.extraActionsStyles}
          openCamera={camera}
          openGallery={gallery}
          openVideo={video}
        />
        {accommodation.medias?.length > 0 && (
          <SweetButton
            bg={colors.calmGreen}
            text={'descriptions'}
            onPress={() => navigation.navigate('descriptions')}
          />
        )}
      </View>
    </>
  );
};

export default Accommodation;
const styles = StyleSheet.create({
  extraActionsStyles: {
    marginVertical: universalPadding / 3,
    width: '50%',
  },
  container: {
    padding: universalPadding,
    height: '80%',
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: undefined,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 10,
  },
});
