import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppCancel from './../../../components/AppCancel';
import {AppContext} from './../../../appContext';
import AppTextArea from '../../../components/AppTextArea';
import {height, universalPadding, colors, width} from '../../../config/config';
import {addNewPost, handleImagePicker} from './../../../hooks/useOperation';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import firestore from '@react-native-firebase/firestore';

import uuid from 'react-native-uuid';
import SendPost from './../../../components/SendPost';
import {useUploadFile} from './../../../hooks/useUploadFile';
import {commonFunctions} from '../../../imports/all_files';
import {log} from './../../../hooks/testLog';
import AppLoading from '../../../components/AppLoading';
import {useCheckNetworkStatus} from './../../../hooks/justHooks';
import ImagePicker from 'react-native-image-crop-picker';

//Might have to be a stack later on
const CreatePost = ({navigation, route}) => {
  const {networkStatus, subscribeToNetworkStats} = useCheckNetworkStatus();

  const {userUID} = useContext(AppContext);
  //for locating logs
  const thisPage = 'createPostPage';

  const uploadFile = useUploadFile();
  const [selectedPost, setSelectedPost] = useState({
    id: '',
    postImage: null,
    caption: '',
  });

  const {user} = useContext(SignUpInfoContext);
  const [isPostLoading, setIsPostLoading] = useState(null);
  // const [isPosting, setIsPosting] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [post, setPost] = useState({
    postID: uuid.v4(),
    postImage: null,
    postedOn: firestore.FieldValue.serverTimestamp(),
    posterAvatar: user.profileImage,
    posterName: `${user.firstName} ${user.lastName}`,
    posterUserUID: userUID,
    postCaption: '',
    postLocation: null,
    postLikes: [],
    postComments: [],
    postShares: [],
    postPushes: [],
    postTopFiguresLikes: [],
    postDislikes: [],
  });

  useState(() => {
    if (route.params) {
      const {repostID, repostImage, repostCaption} = route.params;
      setPost({...post, postImage: repostImage, postCaption: repostCaption});
    }
  }, []);

  const handleCancelCreatePost = () => {
    navigation.goBack(1);
  };

  //try refactoring this.
  const handlePost = async () => {
    log(' before sending', thisPage, post);

    setIsPostLoading(true);

    try {
      if (post.postImage) {
        //incase it's a post being reposted.
        const postImageUrl = post.postImage.includes('https')
          ? post.postImage
          : await uploadFile(post.postImage);
        if (postImageUrl) {
          addNewPost('AllPosts', post.postID, {
            ...post,
            postImage: postImageUrl,
          });
        }
      } else {
        addNewPost('AllPosts', post.postID, post);
      }
      setPost({...post, postImage: null, postCaption: ''});
      setIsPostLoading(false);

      handleCancelCreatePost();
    } catch (error) {
      commonFunctions.showToast(
        "can't upload a post",
        'check your internet connection and try again.',
        'ERROR',
      );
    }
  };

  const handleSelectImage = async () => {
    //make use of try catch here.
    const image = await handleImagePicker();
    if (image) {
      setPost({...post, postImage: image});
    }
  };

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  // const camera = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 400,
  //     cropping: true,
  //   }).then(image => {
  //     console.log(image);
  //   });
  // };

  // const multipleCamera = () => {
  //   ImagePicker.openPicker({
  //     multiple: true,
  //   }).then(images => {
  //     console.log(images);
  //   });
  // };
  // const video = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'video',
  //   }).then(video => {
  //     console.log(video);
  //   });
  // };
  // const mulitpleVideo = () => {
  //   ImagePicker.openPicker({
  //     mediaType: 'video',
  //     multiple: true,
  //   }).then(video => {
  //     console.log(video);
  //   });
  // };
  // const mixedMedia = async () => {
  //   const response = await ImagePicker.openPicker({
  //     mediaType: 'any',
  //     multiple: true,
  //   });
  //   if(response)console.log('response', response)
  // };

  return (
    <>
      {!isPostLoading && subscribeToNetworkStats ? (
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={mixedMedia} activeOpacity={0.6}>
            <View style={styles.postImageWrapper}>
              {!post.postImage && (
                <View style={styles.postImageView}>
                  <Ionicons name="image" size={150} color={'white'} />
                </View>
              )}
              {post.postImage && (
                <>
                  <Image
                    source={{
                      uri: post.postImage,
                    }}
                    style={styles.image}
                  />
                </>
              )}
            </View>

            <SendPost
              onSend={handlePost}
              shouldDisable={!post.postImage && !post.postCaption}
            />
          </TouchableOpacity>
          <AppTextArea
            value={post.postCaption}
            extraContainerStyles={styles.extraContainerStyles}
            placeHolder={'caption'}
            extraTextAreaStyles={styles.extraTextAreaStyles}
            onChange={text => setPost({...post, postCaption: text})}
          />
          {post.postImage && (
            <AppCancel
              onCancel={() => setPost({...post, postImage: null})}
              extraStyle={styles.trash}
              iconName="trash"
              color={colors.info}
              size={40}
            />
          )}
          <AppCancel onCancel={handleCancelCreatePost} />
        </ScrollView>
      ) : (
        <>
          <AppLoading
            message={
              isPostLoading
                ? 'uploading your post...'
                : 'mobile data is turned off'
            }
          />
        </>
      )}
    </>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    backgroundColor: 'black',
    justifyContent: 'space-evenly',
  },
  postImageWrapper: {
    height: height / 1.8,
    width: '100%',
    position: 'relative',
  },
  postImageView: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  extraContainerStyles: {
    backgroundColor: 'black',
    // flex: 1,
  },
  linkExtraStyles: {
    paddingHorizontal: universalPadding / 3,
    margin: 0,
    alignSelf: 'flex-end',
    color: 'gray',
  },
  trash: {
    right: 0,
  },
});
