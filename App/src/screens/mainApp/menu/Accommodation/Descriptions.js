import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import AppInputField from './../../../../components/form-components/AppInputField';
import {colors, universalPadding} from '../../../../config/config';
import AppInput from './../../../../components/AppInput';
import Link from '../../../../components/Link';
import AppScrollView from '../../../../components/AppScrollView';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppIconButton from './../../../../components/AppIconButton';
import {AccommodationContext} from './accContext/accContext';
import {Paragraph} from 'react-native-paper';
import AppCancel from './../../../../components/AppCancel';
import PlaceHolderParagraph from './../../../../components/PlaceHolderParagraph';
import AppList from '../../../../components/AppList';
import SeparatedButtons from '../../../../components/SeparatedButtons';

const Descriptions = ({navigation}) => {
  const {accommodation, setAccommodation} = useContext(AccommodationContext);

  const {
    control,
    handleSubmit,
    watch,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      nameOfPlace: accommodation.nameOfPlace,
      price: accommodation.price,
      location: accommodation.location,
    },
    mode: 'all',
    shouldUnregister: false,
  });

  const [info, setInfo] = useState('');

  const handleExtraInfo = () => {
    setAccommodation({
      ...accommodation,
      extraInfo: [...accommodation.extraInfo, info],
    });
    setInfo('');
  };

  const onRemove = information => {
    const filteredAccomodation = accommodation.extraInfo.filter(
      info => info !== information,
    );
    setAccommodation({...accommodation, extraInfo: [...filteredAccomodation]});
  };

  const handleNext = data => {
    navigation.navigate('preferences');

    console.log(data);
    setAccommodation({
      ...accommodation,
      price: data.price,
      nameOfPlace: data.nameOfPlace,
      location: data.location,
    });
  };
  const {location, nameOfPlace, price} = watch();

  const validate =
    location != '' && nameOfPlace != '' && price != '' ? true : false;

  return (
    <View style={styles.container}>
      <AppScrollView extraStyle={styles.AppScrollView}>
        <AppInputField
          textColor={colors.fadeWhite}
          background={'transparent'}
          control={control}
          name="nameOfPlace"
          label={'The name of your home?'}
          required={{
            required: 'we need this!',
          }}
        />

        <AppInputField
          textColor={colors.fadeWhite}
          background={'transparent'}
          control={control}
          name="location"
          label={'Location of your home?'}
          required={{
            required: 'we need this!',
          }}
        />
        <AppInputField
          keyboardType={'number-pad'}
          textColor={colors.fadeWhite}
          background={'transparent'}
          control={control}
          name="price"
          label={'Price of rent?'}
          required={{
            required: 'we need this!',
          }}
        />
        <View style={styles.extraInfoWrapper}>
          {accommodation.extraInfo.length == 0 && (
            <Link
              text={'extra info about your home shows up here'}
              color={colors.chip}
              readOnly
            />
          )}

          {accommodation.extraInfo.map((information, index) => (
            <AppList
              key={index}
              text={`${index + 1}) ${information}`}
              onCancel={() => onRemove(information)}
            />
          ))}
        </View>
        <View style={styles.inputWrapper}>
          <AppInput
            extraStyles={styles.input}
            textColor={colors.fadeWhite}
            background={'transparent'}
            value={info}
            onChangeText={text => setInfo(text)}
            label={
              accommodation.extraInfo.length > 0
                ? 'Add more information?'
                : 'Extra information'
            }
          />
          <AppIconButton
            iconName="pencil"
            extraStyle={{
              backgroundColor: !info == '' ? colors.fadeWhite : colors.chip,
            }}
            onPress={!info == '' ? handleExtraInfo : null}
          />
        </View>
      </AppScrollView>

      <SeparatedButtons>
        <Link
          text={'back'}
          onPress={() => navigation.goBack()}
          color={colors.info}
        />

        {validate && (
          <Link
            color={colors.calmGreen}
            text={'add prefrences'}
            onPress={handleSubmit(handleNext)}
          />
        )}
      </SeparatedButtons>
    </View>
  );
};

export default Descriptions;

const styles = StyleSheet.create({
  AppScrollView: {
    height: '85%',
  },
  container: {
    height: '100%',
    padding: universalPadding / 4,
  },
  extraInfoWrapper: {
    height: undefined,
    marginVertical: universalPadding / 2,
    width: '100%',
  },
  input: {
    width: '80%',
  },
  inputWrapper: {
    flexDirection: 'row',
    height: undefined,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
});
