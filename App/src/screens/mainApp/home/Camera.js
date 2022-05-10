import React, {useState, useContext, useEffect, useRef} from 'react';
import {View, StyleSheet, Alert, BackHandler, Linking} from 'react-native';
import {
  height,
  width,
  colors,
  postHeight,
  universalPadding,
} from '../../../config/config';
import AppCancel from '../../../components/AppCancel';
import {useNavigation} from '@react-navigation/native';
import {confirmAction} from '../../../hooks/postOperations';
import uuid from 'react-native-uuid';
import AppTextArea from './../../../components/AppTextArea';
import {AppContext} from './../../../appContext';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';
import firestore from '@react-native-firebase/firestore';
import {commonFunctions} from '../../../imports/all_files';
import {addNewPost} from '../../../hooks/useOperation';
import {HomeContext} from './homeContext';
import {handleOpenCamera, handleOpenGallery} from '../../../hooks/justHooks';
import {handleOpenVideo, handlePrepareMedias} from './../../../hooks/justHooks';
import AppMediaDisplay from './../../../components/AppMediaDisplay';
import MediaDisplayActions from '../../../components/MediaDisplayActions';
import AppScrollView from './../../../components/AppScrollView';
import SweetButton from './../../../components/SweetButton';
import {multiPost} from './../../../hooks/multiPosts';
import {getUserLocation} from './../../../functions/commonFunctions';
import AppBottomSheet from './../../../components/AppBottomSheet';
import Sheet from './../../../components/Sheet';
import PlaceHolderParagraph from '../../../components/PlaceHolderParagraph';
import AppList from '../../../components/AppList';
import Link from './../../../components/Link';

const Camera = () => {
  const sheetRef = useRef(null);
  const {userUID} = useContext(AppContext);
  const {user} = useContext(SignUpInfoContext);
  const {posted, setPosted} = useContext(HomeContext);
  const navigation = useNavigation();

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

  const handleGetLocation = async () => {
    const response = await getUserLocation();
    console.log(response, ' user location reponse');
    if (response) {
      return setPost({...post, postLocation: {...response}});
    } else {
      Alert.alert(
        'sorry',
        "you can't post without giving us access to your location.",
        [
          {
            text: "i won't",
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
          {
            text: 'okay i accept',
            onPress: () => {
              sheetRef.current.open();
            },
          },
        ],
      );
    }
    // else {
    //   Alert.alert(
    //     'sorry',
    //     "you can't post without giving us access to your location.",
    //     [
    //       {
    //         text: "i won't",
    //         onPress: () => navigation.goBack(),
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'okay i accept',
    //         onPress: () => {
    //           sheetRef.current.open();
    //         },
    //       },
    //     ],
    //   );
    // }
  };

  console.log(post);

  // BackHandler.addEventListener('hardwareBackPress', () => navigation.goBack());

  useEffect(() => {
    handleGetLocation();
  }, []);

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
    const stateMedia = post.postMedias;

    let newMedias = [];
    const awaitingMedias = handlePrepareMedias(data);
    //filter from the awaiting medias and chekc if any file exist already instate.
    awaitingMedias.forEach(newItem => {
      const exist = stateMedia.find(media => media.path == newItem.path)
        ? true
        : false;
      exist == false ? newMedias.push(newItem) : null;
    });

    setPost({...post, postMedias: [...post.postMedias, ...newMedias]});
  };
  const removeMedia = id => {
    let stateMedia = post.postMedias;
    stateMedia = stateMedia.filter(media => media.id !== id);
    setPost({...post, postMedias: stateMedia});
  };
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

    try {
      const response = await multiPost(post.postMedias);

      if (response) {
        console.log('about to post');
        addNewPost('AllPosts', post.postID, {
          ...post,
          postMedias: response,
        });
        setFinishedUploadingMedia(true);
        commonFunctions.showToast('SUCCESSFUL', 'post is live!', 'SUCCESS');
      } else {
        console.log(
          ' ZUCCI CHECK THE CAMERA FUNCTION IN THE MULITPOST FUNCTION. RIGHT IN CAMERA SCREEN',
        );
      }
    } catch (error) {
      console.log(error.message, 'failed to post files');
      commonFunctions.showToast(
        "can't upload a post",
        'check your internet connection and try again.',
        'ERROR',
      );
    }

    setFinishedUploadingMedia(true);
    setPosted(posted + 1);
    setPost({...post, postMedias: [], postCaption: ''});

    //prepare the post informations and send to AllPosts collection.
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <AppCancel
          useStyles={false}
          color={colors.fadeWhite}
          onCancel={handleBack}
          size={40}
        />
        {(post.postCaption !== '' || post.postMedias.length !== 0) && (
          <>
            <SweetButton text="post" onPress={handleSubmitPost} />
          </>
        )}
      </View>
      <AppScrollView extraStyle={styles.scrollView}>
        <AppMediaDisplay
          data={post.postMedias}
          onRemoveItem={id => removeMedia(id)}
        />

        <AppTextArea
          useBigFont={post.postMedias.length == 0 ? true : false}
          value={post.postCaption}
          onChange={text => setPost({...post, postCaption: text})}
          extraContainerStyles={styles.extraTextAreaStyles}
          placeHolder={
            post.postMedias.length > 0
              ? 'write a caption'
              : `Hi ${user.firstName}! What's on your mind?`
          }
        />
      </AppScrollView>
      <MediaDisplayActions
        openCamera={camera}
        openGallery={gallery}
        openVideo={video}
        extraStyles={{width: '60%'}}
      />
      <Sheet
        sheetRef={sheetRef}
        disableBackDrop={false}
        enableSlideToClose={false}>
        <View
          style={{
            backgroundColor: colors.fadeWhite,
            height: undefined,
            width: '100%',
            padding: universalPadding / 2,
            paddingBottom: universalPadding,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Link
            text={'INSTRUCTIONS!'}
            extraStyle={{fontSize: 20}}
            color={colors.info}
          />
          <AppList
            text={
              '1) Click on the button below, it takes you to your settings, then;'
            }
            useDefault={false}
            textColor={colors.neonBg}
          />
          <AppList
            text={'2) Click on "Permissions";'}
            useDefault={false}
            textColor={colors.neonBg}
          />
          <AppList
            text={'3) Click on "Location" option;'}
            useDefault={false}
            textColor={colors.neonBg}
          />
          <AppList
            text={'3) Click on "Allow only while using the app"'}
            useDefault={false}
            textColor={colors.neonBg}
          />
          <SweetButton
            text={'ok no problem'}
            onPress={async () => {
              await Linking.openSettings();
              navigation.goBack();
            }}
          />
        </View>
      </Sheet>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  scrollView: {
    height: '80%',
    width: '100%',
  },
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
    paddingHorizontal: 5,
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
    bottom: 0,
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
