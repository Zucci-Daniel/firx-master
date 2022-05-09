import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useGetNewUser} from './../../../../hooks/useOperation';
import AppMediaDisplay from './../../../../components/AppMediaDisplay';
import AppScrollView from './../../../../components/AppScrollView';
import AppList from './../../../../components/AppList';
import {
  colors,
  height,
  universalPadding,
  width,
} from '../../../../config/config';
import Link from './../../../../components/Link';
import AppIndicator from './../../../../components/AppIndicator';
import {convertToCurrency, naira} from '../../../../functions/commonFunctions';
import SweetButton from './../../../../components/SweetButton';
import PostHeader from './../../../../components/Post/PostHeader';

const UserAccommodation = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accommodation, setAccommodation] = useState(null);
  // const [user, setUser] = useState(null);

  const {userID, image, name} = route.params;

  const fetchAccommodationDetails = async id => {
    const response = await useGetNewUser('STUDENTS', id);
    if (response) {
      console.log(response.data()?.accommodationDetails);
      setAccommodation(
        response.data()?.accommodationDetails
          ? {...response.data()?.accommodationDetails}
          : false,
      );
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    console.log('fetch his details', userID);
    fetchAccommodationDetails(userID);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <AppIndicator />}
      {accommodation == false && !isLoading && (
        <Link
          touchStyles={{
            flex: 1,
            justifyContent: 'center',
          }}
          text={`no home posted yet`}
          color={colors.info}
          readOnly
        />
      )}
      {accommodation !== false && !isLoading && (
        <>
          <AppScrollView>
            <PostHeader
              showDateAndLocation={false}
              name={`${name}'s Accommodation`}
              profileImage={image}
              showMenu={false}
            />
            <Link
              centered={false}
              extraStyle={{fontSize: 25}}
              text={accommodation?.nameOfPlace}
              color={colors.calmBlue}
              readOnly
            />
            <Link
              centered={false}
              extraStyle={{fontSize: 20}}
              text={`${naira()}${convertToCurrency(accommodation?.price)}.00`}
              color={colors.info}
              readOnly
            />
            <AppMediaDisplay showRemove={false} data={accommodation?.medias} />
            <Link
              centered={false}
              text={
                accommodation?.available == true
                  ? `available!`
                  : 'not available yet'
              }
              color={
                accommodation?.available == true
                  ? colors.calmGreen
                  : colors.calmRed
              }
              extraStyle={{fontSize: 25}}
              readOnly
            />
            <Link
              centered={false}
              text={`location`}
              color={colors.calmBlue}
              readOnly
            />

            <AppList useDefault={false} text={`${accommodation?.location}`} />
            <View style={styles.extraInfoWrapper}>
              <Link
                centered={false}
                text={`hostel information`}
                color={colors.calmBlue}
                readOnly
              />

              {accommodation?.extraInfo?.length == 0 && (
                <Link
                  centered={false}
                  text={`no extra information about this home`}
                  color={colors.chip}
                  readOnly
                />
              )}
              {accommodation?.extraInfo?.map((information, index) => (
                <AppList
                  useDefault={false}
                  key={index + information}
                  text={`${index + 1}) ${information}`}
                />
              ))}
            </View>
            <View style={styles.extraInfoWrapper}>
              <Link
                centered={false}
                text={`preferences`}
                color={colors.calmBlue}
                readOnly
              />
              {accommodation?.preferences?.length == 0 && (
                <Link
                  centered={false}
                  text={`no preferences set yet, you both can discuss those later.`}
                  color={colors.chip}
                  readOnly
                />
              )}
              {accommodation?.preferences?.map((information, index) => (
                <AppList
                  useDefault={false}
                  key={index + information}
                  text={`${index + 1}) ${information}`}
                />
              ))}
            </View>
            <SweetButton
              text={'send roommate request'}
              extraStyles={{
                marginBottom: 200,
                width: '70%',
                alignSelf: 'center',
              }}
            />
          </AppScrollView>
        </>
      )}
    </View>
  );
};

export default UserAccommodation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
    paddingVertical: universalPadding / 3,
  },
  extraInfoWrapper: {
    height: undefined,
    marginTop: universalPadding / 5,
    marginBottom: universalPadding,
    width: '100%',
  },
});
