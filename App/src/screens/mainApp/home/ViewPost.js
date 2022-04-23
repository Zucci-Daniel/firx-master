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
import AppCarousel from '../../../components/AppCarousel';
import AppLoading from '../../../components/AppLoading';
import Post from '../../../components/Post/Post';

import {
  height,
  colors,
  universalPadding,
  width,
  postSize,
  postHeight,
} from '../../../config/config';
import {getPost} from './../../../hooks/useOperation';
import AppPostImage from './../../../components/AppPostImage';
import AppPostVideo from './../../../components/AppPostVideo';
import AppScrollView from '../../../components/AppScrollView';
import MediaSkeleton from '../../../components/MediaSkeleton';

//Might have to be a stack later on
const ViewPost = ({navigation, route}) => {
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
  useEffect(() => {
    handleGetSelectedPost();
  }, []);

  if (isLoading) return <MediaSkeleton />;

  return (
    <View style={styles.container}>
      {isLoading && <ActivityIndicator />}

      <Post
        onPressPostMenu={null}
        profileImage={selectedPost.posterAvatar}
        name={selectedPost.posterName}
        caption={selectedPost.postCaption}
        date={'today :23:00pm wat'}>
        <AppScrollView extraStyle={{paddingBottom: 350}}>
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
        </AppScrollView>
      </Post>
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    // paddingBottom: 400,
    backgroundColor: colors.neonBg,
  },
  media: {
    height: postSize,
    width: width,
  },
});
