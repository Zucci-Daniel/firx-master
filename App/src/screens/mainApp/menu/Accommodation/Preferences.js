import React, {useContext, useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {AccommodationContext} from './accContext/accContext';
import AppList from './../../../../components/AppList';
import {colors, universalPadding, height} from '../../../../config/config';
import {defaultPreferences} from '../../../../hooks/helperArrays';
import AppScrollView from './../../../../components/AppScrollView';
import Link from './../../../../components/Link';
import SeparatedButtons from './../../../../components/SeparatedButtons';
import SweetButton from './../../../../components/SweetButton';

const Preferences = ({navigation}) => {
  const {accommodation, setAccommodation} = useContext(AccommodationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [defaultPref, setDefaultPref] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    setDefaultPref([...defaultPreferences]);
    setIsLoading(false);
  }, []);

  const handleSelection = pref => {
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
  };

  console.log(accommodation.preferences, ' acc');

  return (
    <View style={styles.container}>
      {!isLoading && (
        <AppScrollView extraStyle={styles.scroll}>
          {defaultPref.map((information, index) => (
            <AppList
              extraInfoStyles={styles.extraInfoStyles}
              key={index}
              text={`${index + 1}) ${information}`}
              onCancel={() => handleSelection(information)}
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
      )}

      <SeparatedButtons>
        <Link
          text={'previous'}
          color={colors.info}
          onPress={() => navigation.goBack()}
        />
        <SweetButton text={'post this'} onPress={null} />
      </SeparatedButtons>
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
});
