import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {colors, postSize, universalPadding, width} from '../../config/config';
import PosterImg from './utils/PosterImg';
import PosterInitials from './utils/PosterInitials';
import PostActionIcon from './../PostActionIcon';

let defaultHieght = undefined;

const PostHeader = ({
  onTapImage,
  profileImage,
  name,
  date,
  location,
  onPressPostMenu,
  showMenu = true,
  showNameAndLocation = true,
  showSeperator = true,
}) => {
  return (
    <View style={[styles.postHeader]}>
      <View style={[styles.container]}>
        <View style={[styles.wrapper]}>
          <PosterImg profileImage={profileImage} />

          <PosterInitials showSeperator={showSeperator} name={name} date={date} location={location} />
        </View>

        {showMenu && (
          <PostActionIcon
            useDefault={false}
            onPress={onPressPostMenu}
            iconName="ellipsis-vertical-outline"
            showText={false}
            color={colors.calmBlue}
          />
        )}
      </View>
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  postHeader: {
    backgroundColor: 'transparent',
    width: '98%',
    alignSelf: 'center',
    paddingVertical: universalPadding / 15,
    paddingHorizontal: universalPadding / 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
