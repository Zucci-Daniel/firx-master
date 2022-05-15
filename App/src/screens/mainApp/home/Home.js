import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {universalPadding, colors, width, height} from '../../../config/config';
import {useEffect, useContext} from 'react';
import {AppContext} from './../../../appContext';
import {SignUpInfoContext} from './../../forms/signUpInfoContext';

import Feed from './../../../components/Feed';

import {useCheckNetworkStatus} from './../../../hooks/justHooks';
import {
  useGetUserInformation,
  useGetBlackLists,
  fetchPostsFromServer,
} from './../../../hooks/useOperation';
import Finished from '../../../components/Finished';
import MiniLoading from '../../../components/MiniLoading';
import {HomeContext} from './homeContext';
import Link from './../../../components/Link';
import Retry from './../../../components/Retry';
import MediaSkeleton from './../../../components/MediaSkeleton';

const Home = ({navigation}) => {
  const [failed, setFailed] = useState(false);
  const {subscribeToNetworkStatus} = useCheckNetworkStatus();
  const online = subscribeToNetworkStatus();
  const [allPosts, setAllPost] = useState([]);
  const [shouldGetUserInfo, setShouldGetUserInfo] = useState(true);

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [postsBlackListed, setPostsBlackListed] = useState(null);
  const [profilesBlackListed, setProfilesBlackListed] = useState(null);
  const [fetchedBlacklists, setFetchedBlacklists] = useState(null);
  const [fetchedBasicInfo, setFetchedBasicInfo] = useState(null);
  const [postIsFinished, setPostIsFinished] = useState(null);
  const [itemsPerPage] = useState(10);
  const [lastPost, setLastPost] = useState(null);
  const {userUID} = useContext(AppContext);
  const {user, setUser} = useContext(SignUpInfoContext);
  const {posted} = useContext(HomeContext);

  const getInformation = async (userUID, online) => {
    setFetchedBasicInfo(false);
    console.log('getting your basic online or locally');
    const response = await useGetUserInformation(userUID, online);

    if (response) {
      console.log(response, ' info');

      setUser(response);
      setFetchedBasicInfo(true);
    }
  };

  const getBlackLists = async userUID => {
    setFetchedBlacklists(false);
    const response = await useGetBlackLists(userUID);
    if (response) {
      const {postsBlacklisted, profilesBlackListed} = response;
      setPostsBlackListed(postsBlacklisted);
      setProfilesBlackListed(profilesBlackListed);

      setFetchedBlacklists(true);
      return true;
    } else {
      return false;
    }
  };

  const stopFetching = () => {
    setIsFetchingData(false);
    setFailed(false);
  };

  const fetchPosts = async (
    blacklistPost,
    blackListProfiles,
    startAfterDoc,
    limit,
  ) => {
    const response = await fetchPostsFromServer(
      blacklistPost,
      blackListProfiles,
      startAfterDoc,
      limit,
    );
    if (response) {
      const {lastVisibleItem, posts} = response;
      if (posts.length == 0 || posts.length < itemsPerPage) {
        setLastPost(lastVisibleItem);
        setAllPost(posts);
        stopFetching();
        setPostIsFinished(true);
      } else {
        setLastPost(lastVisibleItem);
        setAllPost(posts);
        stopFetching();
      }
    }
  };

  useEffect(() => {
    if (online || shouldGetUserInfo) {
      console.log(' gonan get use info');
      //get the latest basic information
      getInformation(userUID, online);
      setShouldGetUserInfo(false);
    }
  }, [online]);

  const confirmBeforeGettingPosts = async () => {
    setIsFetchingData(true);
    if (fetchedBlacklists) {
      fetchPosts(postsBlackListed, profilesBlackListed, lastPost, itemsPerPage);
    } else {
      const response = await getBlackLists(userUID);
      if (response) {
        await fetchPosts(
          postsBlackListed,
          profilesBlackListed,
          lastPost,
          itemsPerPage,
        );
      } else {
        setFailed(true);
        setIsFetchingData(false);
        console.log(' failed to confirmBeforeGettingPosts');
      }
    }
  };

  useEffect(() => {
    confirmBeforeGettingPosts();
  }, [fetchedBlacklists]);

  const handleLoadMoreData = async () => {
    if (postIsFinished == false) {
      return await fetchPosts(
        postsBlackListed,
        profilesBlackListed,
        lastPost,
        itemsPerPage,
      );
    }
  };

  if (isFetchingData) return <MediaSkeleton />;

  return (
    <>
      <View style={styles.container}>
        {!isFetchingData && failed && (
          <Retry
            notice="failed to get posts due to network.."
            handleRetry={confirmBeforeGettingPosts}
          />
        )}
        {!isFetchingData && !failed && (
          <Feed
            useData={allPosts}
            userUID={userUID}
            loadMoreData={handleLoadMoreData}
            loading={() =>
              postIsFinished == false ? (
                <MiniLoading />
              ) : postIsFinished == true ? (
                <Finished />
              ) : null
            }
          />
        )}
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: colors.neonBg,
    justifyContent: 'center',
  },
  heading: {
    padding: universalPadding / 6,
    textAlign: 'center',
    fontSize: 14,
  },
});
