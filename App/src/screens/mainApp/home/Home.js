import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { universalPadding, colors, width, height } from '../../../config/config';
import { AppContext } from './../../../appContext';
import Feed from './../../../components/Feed';
import { useCheckNetworkStatus } from './../../../hooks/justHooks';

import Finished from '../../../components/Finished';
import MiniLoading from '../../../components/MiniLoading';
import Retry from './../../../components/Retry';
import MediaSkeleton from './../../../components/MediaSkeleton';
import { useFeedContext } from '../../../store/feedStore/feedContext';
import AppIndicator from '../../../components/AppIndicator';

const Home = () => {
  const { subscribeToNetworkStatus } = useCheckNetworkStatus();
  const online = subscribeToNetworkStatus();
  const { userUID } = useContext(AppContext);
  const [refreshing, setRefreshing] = React.useState(false);

  const { state, getInformation, handleLoadMoreFeed, confirmBeforeGettingPosts } =
    useFeedContext();

  const {
    shouldGetUserInformation,
    isFetchingFeeds,
    failedFetchingFeeds,
    postIsFinished,
    feeds,
  } = state;

  useEffect(() => {
    if (online || shouldGetUserInformation) {
      getInformation(userUID, online);
    }
  }, [online]);

  useEffect(() => {
    confirmBeforeGettingPosts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // await confirmBeforeGettingPosts();
    setTimeout(() => {
      //once you've fixed the issue with  FATAL ERROR  [firestore/invalid-argument] Client specified an invalid argument. Note that this differs from failed-precondition. invalid-argument indicates arguments that are problematic regardless of the state of the system (e.g., an invalid field name). THEN, REMOVE THIS SETTIMEOUT FUNCTION and call confirmBeforeGettingPosts();
      setRefreshing(false);
    }, 3000);
  };

  if (isFetchingFeeds) return <MediaSkeleton />;

  return (
    <>
      <View style={styles.container}>
        {!isFetchingFeeds && failedFetchingFeeds && (
          <Retry
            notice="failed to get posts due to network.."
            handleRetry={() => confirmBeforeGettingPosts()}
          />
        )}
        {!isFetchingFeeds && !failedFetchingFeeds && (
          <Feed
            useData={feeds}
            userUID={userUID}
            refreshing={refreshing}
            onRefresh={() => handleRefresh()}
            // loadMoreData={() => null}
            // loadMoreData={handleLoadMoreFeed}
            loading={() =>
              postIsFinished == false ? (
                <AppIndicator color={colors.inputUnderLineColor} />
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
