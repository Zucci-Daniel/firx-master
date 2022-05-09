import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import AppCarousel from '../../../../components/AppCarousel';
import AppLoading from '../../../../components/AppLoading';
import Post from '../../../../components/Post/Post';

import {
  height,
  colors,
  universalPadding,
  width,
  postSize,
  postHeight,
} from '../../../../config/config';
import {getPost} from '../../../../hooks/useOperation';
import AppPostImage from '../../../../components/AppPostImage';
import AppPostVideo from '../../../../components/AppPostVideo';
import AppScrollView from '../../../../components/AppScrollView';
import MediaSkeleton from '../../../../components/MediaSkeleton';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from './../../../../appContext';

//Might have to be a stack later on
const ViewPost = ({navigation, route}) => {
  const {userUID} = useContext(AppContext);

  const globalNavigation = useNavigation();
  const {postId} = route.params;

  const [selectedPost, setSelectedPost] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleGetSelectedPost = async () => {
    try {
      const post = await getPost('AllPosts', postId);
      if (post) {
        setSelectedPost({...post.data()});
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfileSelection = (posterUID, userUID) => {
    if (posterUID == userUID)
      return globalNavigation.navigate('menu', {screen: 'profile'});
    else
      globalNavigation.navigate('userProfileStack', {
        screen: 'userProfile',
        params: {posterUserUID: posterUID},
      });
  };

  useEffect(() => {
    handleGetSelectedPost();
  }, []);

  if (isLoading) return <MediaSkeleton />;

  return (
    <AppScrollView>
      <View style={styles.container}>
        {isLoading && <ActivityIndicator />}

        <Post
          onTapInitials={() =>
            handleProfileSelection(selectedPost.posterUserUID, userUID)
          }
          onPressPostMenu={null}
          profileImage={selectedPost.posterAvatar}
          name={selectedPost.posterName}
          caption={selectedPost.postCaption}
          date={'today :23:00pm wat'}>
          <View style={styles.scrollContainer}>
            {selectedPost.postMedias.map(media => {
              return media.type == 'picture' ? (
                <AppPostImage
                  useHeight={postHeight}
                  key={media.id}
                  imageUri={media?.url}
                />
              ) : (
                <AppPostVideo
                  key={media.id}
                  useHeight={postHeight}
                  shouldPlay={false}
                  videoUri={media?.url}
                  thumbnail={media?.thumbnail}
                />
              );
            })}
          </View>
        </Post>
      </View>
    </AppScrollView>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: width,
    backgroundColor: colors.neonBg,
  },
  media: {
    height: postSize,
    width: width,
  },
  scrollContainer: {
    paddingBottom: 300,
  },
});
