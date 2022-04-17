import React, {useEffect, useState, useContext} from 'react';
import {View, ScrollView, StyleSheet, Image, FlatList} from 'react-native';
import {height, width, colors, universalPadding} from '../../../config/config';
import ImagePicker from 'react-native-image-crop-picker';
import Link from '../../../components/Link';
import AppPostImage from '../../../components/AppPostImage';
import AppCancel from '../../../components/AppCancel';
import {useNavigation, useRoute} from '@react-navigation/native';
import {confirmAction} from '../../../hooks/postOperations';
import uuid from 'react-native-uuid';
import AppPostVideo from './../../../components/AppPostVideo';
import AppIconButton from '../../../components/AppIconButton';
import AppTextArea from './../../../components/AppTextArea';
import SendPost from './../../../components/SendPost';
import {AppContext} from './../../../appContext';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import firestore from '@react-native-firebase/firestore';
import ButtonText from './../../../components/ButtonText';
import {commonFunctions} from '../../../imports/all_files';
import {useUploadFile} from './../../../hooks/useUploadFile';
import {addNewPost} from '../../../hooks/useOperation';
import {createThumbnail} from 'react-native-create-thumbnail';

const Camera = () => {
  const uploadFile = useUploadFile();

  const {userUID} = useContext(AppContext);
  const {user} = useContext(SignUpInfoContext);
  const navigation = useNavigation();
  const route = useRoute();

  const flatListRef = React.useRef();

  const [media, setMedia] = useState([]);

  const [finishedUploadingMedia, setFinishedUploadingMedia] = useState(null);
  //this post state should be global laters!
  const [post, setPost] = useState({
    postID: uuid.v4(),
    postedOn: firestore.FieldValue.serverTimestamp(),
    posterAvatar: user.profileImage,
    posterName: `${user.firstName} ${user.lastName}`,
    posterUserUID: userUID,
    postMedias: [],
    postCaption: '',
    postLocation: null,
    postLikes: [],
    postComments: [],
    postShares: [],
    postPushes: [],
    postTopFiguresLikes: [],
    postDislikes: [],
  });

  const camera = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'any',
      includeBase64: true,
      compressVideoPreset: 'HighestQuality',
    })
      .then(dataArray => selectedMedia(dataArray))
      .catch(error => console.log(error.message, ' fail'));
  };

  const selectedMedia = data => {
    const stateMedia = post.postMedias;

    let awaitingMedias = [];

    data.map((item, index) => {
      const newItem = {
        id: uuid.v4(),
        height: item.height,
        mime:
          item.mime == 'image/jpeg' || item.mime == 'image/png'
            ? 'picture'
            : item.mime == 'video/mp4'
            ? 'video'
            : alert('zucci check the type of file you got'),
        modificationDate: item.modificationDate,
        path: item.path,
        size: item.size,
        width: item.width,
      };
      //check if this item is already in the state.
      const exist = stateMedia.find(media => media.path == newItem.path)
        ? true
        : false;
      exist == false ? awaitingMedias.push(newItem) : null;
    });

    setPost({...post, postMedias: [...post.postMedias, ...awaitingMedias]});
  };

  // console.log(post.postMedias, ' the post medias');

  const removeMedia = id => {
    let stateMedia = post.postMedias;
    stateMedia = stateMedia.filter(media => media.id !== id);
    setPost({...post, postMedias: stateMedia});
  };
  // console.log(post.postMedias, ' media outside');

  const handleBack = () => {
    const handleGoBack = navigation.goBack;

    if (post.postMedias.length > 0) {
      return confirmAction(
        null,
        handleGoBack,
        null,
        'discard all posts?',
        'all edited post will be removed',
        'discard',
      );
    }
    return handleGoBack();
  };

  const handleSubmitPost = async () => {
    setFinishedUploadingMedia(false);
    //take them home.
    navigation.goBack();

    //map through the post Medias and send each of them to storage, and get thier link and create a new object.
    let mediaFiles = [];

    try {
      for (const media of post.postMedias) {
        const uri = await uploadFile(media.path);
        let thumbnail = null;
        if (uri && media.mime == 'video') {
          let response = await createThumbnail({
            url: uri,
            timeStamp: 10000,
          });

          const thumbnailUri = await uploadFile(response.path);
          if (thumbnailUri) {
            thumbnail = thumbnailUri;
          }
        }

        const newMedia = {
          url: uri,
          thumbnail: thumbnail,
          type: media.mime,
          id: media.id,
          height: media.height,
          width: media.width,
          size: media.size,
        };
        console.log(newMedia, ' before firestore');
        mediaFiles.push(newMedia);
      }

      addNewPost('AllPosts', post.postID, {
        ...post,
        postMedias: mediaFiles,
      });
      setFinishedUploadingMedia(true);
      commonFunctions.showToast('SUCCESSFUL', 'post is live!', 'SUCCESS');
    } catch (error) {
      console.log(error.message, 'failed to post files');
      commonFunctions.showToast(
        "can't upload a post",
        'check your internet connection and try again.',
        'ERROR',
      );
    }

    setFinishedUploadingMedia(true);
    setPost({...post, postMedias: [], postCaption: ''});

    //prepare the post informations and send to AllPosts collection.
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <AppCancel useStyles={false} onCancel={handleBack} size={40} />
        {(post.postCaption !== '' || post.postMedias.length !== 0) && (
          <ButtonText
            bg={colors.neonBg}
            title="post"
            onPress={handleSubmitPost}
          />
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <FlatList
          style={styles.FlatList}
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current.scrollToEnd({animated: true})
          }
          data={post.postMedias}
          horizontal={true}
          keyExtractor={item => item.id}
          snapToAlignment="start"
          decelerationRate={0.8}
          snapToInterval={width}
          pagingEnabled={true}
          renderItem={({item}) => (
            <>
              <AppCancel
                size={30}
                iconName="ios-remove-circle-sharp"
                extraStyle={styles.trash}
                onCancel={() => removeMedia(item.id)}
              />
              {item.mime == 'picture' && (
                <AppPostImage key={item} imageUri={item.path} />
              )}
              {item.mime == 'video' && (
                <AppPostVideo key={item} videoUri={item.path} />
              )}
            </>
          )}
        />
        <AppTextArea
          value={post.postCaption}
          onChange={text => setPost({...post, postCaption: text})}
          extraContainerStyles={styles.extraTextAreaStyles}
          placeHolder={'write a caption'}
        />

        <AppIconButton
          onPress={camera}
          extraStyle={styles.AppIconButtonStyles}
        />
      </ScrollView>
      {post.postMedias.length <= 0 ? (
        <AppIconButton
          extraStyle={{marginBottom: universalPadding}}
          onPress={camera}
        />
      ) : null}
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
    width: width,
    height: height,
  },
  wrapper: {
    height: 50,
    width: width,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  FlatList: {
    marginTop: universalPadding/2,
  },
  imagesContainer: {
    width: width / 3,
    height: width / 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  trash: {
    right: 10,
  },
  AppIconButtonStyles: {
    top: height / 1.8,
    right: 10,
    zIndex: 20,
    position: 'absolute',
  },
  extraTextAreaStyles: {
    width: '100%',
    backgroundColor: 'transparent',
    height: height / 3,
  },
});
