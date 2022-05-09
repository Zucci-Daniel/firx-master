import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {AccommodationContext} from './accContext/accContext';
import AppList from './../../../../components/AppList';
import {
  colors,
  universalPadding,
  height,
  postHeight,
} from '../../../../config/config';
import {defaultPreferences} from '../../../../hooks/helperArrays';
import AppScrollView from './../../../../components/AppScrollView';
import Link from './../../../../components/Link';
import SeparatedButtons from './../../../../components/SeparatedButtons';
import SweetButton from './../../../../components/SweetButton';
import AppAnimatedImageView from './../../../../components/AppAnimatedImageView';
import AppSwitch from './../../../../components/AppSwitch';
import AppDatePicker from './../../../../components/AppDatePicker';
import {multiPost} from './../../../../hooks/multiPosts';
import {updateDocument} from '../../../../hooks/useOperation';
import {AppContext} from './../../../../appContext';
import AppIndicator from './../../../../components/AppIndicator';

const Preferences = ({navigation}) => {
  const {userUID} = useContext(AppContext);

  const {accommodation, setAccommodation} = useContext(AccommodationContext);
  const [isLoading, setIsLoading] = useState(true);
  const [defaultPref, setDefaultPref] = useState([]);
  const [miniLoading, setMiniLoading] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSelection = pref => {
    setMiniLoading(true);
    let copiedPref = [...accommodation.preferences];

    //remove it if it is there
    if (copiedPref.includes(pref) == true) {
      copiedPref = copiedPref.filter(preference => preference !== pref);
      setAccommodation({
        ...accommodation,
        preferences: [...copiedPref],
      });
    } else {
      //add it if it isnt there
      setAccommodation({
        ...accommodation,
        preferences: [...copiedPref, pref],
      });
    }
    setMiniLoading(false);
  };

  const handlePost = async () => {
    try {
      setShowModal(false);

      const mediaLinks = await multiPost(accommodation.medias);
      if (mediaLinks) {
        //post to firebase
        updateDocument(userUID, 'STUDENTS', {
          accommodationDetails: {...accommodation},
        });
      } else {
        console.log('failed to post accomodation');
      }
    } catch (error) {}
  };

  const handleIsAvialable = value =>
    setAccommodation({...accommodation, available: value});

  const handleHideModal = () => setShowModal(false);

  const handleDate = (date, type) => {
    type == 'startDate'
      ? setAccommodation({...accommodation, startDate: date})
      : setAccommodation({...accommodation, endDate: date});
  };

  useEffect(() => {
    setDefaultPref(defaultPreferences);
    setIsLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {defaultPref.length > 0 && !isLoading ? (
        <>
          <AppAnimatedImageView
            isVisible={showModal}
            onBackdropPress={handleHideModal}
            onBackButtonPress={handleHideModal}>
            <View style={styles.modalContent}>
              <View styles={styles.modalChild}>
                <Link text={'availiable from:'} readOnly centered={false} />
                <AppDatePicker
                  label={
                    accommodation.startDate == ''
                      ? 'when will you like to end search?'
                      : accommodation.startDate
                  }
                  getDate={date => handleDate(date, 'startDate')}
                />
                <Link text={'till:'} readOnly centered={false} />

                <AppDatePicker
                  label={
                    accommodation.endDate == ''
                      ? 'when will you like to end search?'
                      : accommodation.endDate
                  }
                  getDate={date => handleDate(date, 'endDate')}
                />
                <AppList
                  text={"i'm avaiable now"}
                  textColor={colors.dimBlue}
                  extraTextStyles={{
                    fontSize: 16,
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                  }}
                  useDefault={false}>
                  <AppSwitch
                    useValue={accommodation.available}
                    onChange={value => handleIsAvialable(value)}
                  />
                </AppList>
              </View>

              <SweetButton text={'post this'} onPress={handlePost} />
            </View>
          </AppAnimatedImageView>

          <AppScrollView extraStyle={styles.scroll}>
            {defaultPref.length > 0 &&
              defaultPref.map((information, index) => (
                <AppList
                  extraInfoStyles={styles.extraInfoStyles}
                  key={index}
                  text={`${index + 1}) ${information}`}
                  onCancel={() => handleSelection(information)}
                  loading={miniLoading}
                  iconName={
                    accommodation.preferences.includes(information) == true
                      ? 'remove-circle-sharp'
                      : 'add'
                  }
                  color={
                    accommodation.preferences.includes(information) == true
                      ? colors.calmRed
                      : colors.calmBlue
                  }
                  size={40}
                  extraTextStyles={styles.extraTextStyles}
                  extraCancelStyles={styles.extraCancelStyles}
                />
              ))}
          </AppScrollView>

          <SeparatedButtons>
            <Link
              text={'previous'}
              color={colors.info}
              onPress={() => navigation.goBack()}
            />
            <SweetButton
              text={'post this'}
              onPress={() => setShowModal(true)}
            />
          </SeparatedButtons>
        </>
      ) : (
        <AppIndicator />
      )}
    </View>
  );
};

export default Preferences;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    padding: universalPadding / 6,
  },
  scroll: {
    height: '95%',
    width: '100%',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  extraInfoStyles: {
    borderBottomColor: colors.chip,
    bottom: -5,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: universalPadding / 5,
  },
  extraTextStyles: {
    fontSize: 16,
    color: colors.info,
  },
  extraCancelStyles: {
    bottom: -0,
  },
  modalContent: {
    height: height / 2,
    width: '100%',
    backgroundColor: colors.pureWhite,
    alignContent: 'center',
    justifyContent: 'space-between',
    padding: universalPadding / 3,
  },
  modalChild: {
    height: undefined,
    width: undefined,
  },
});
