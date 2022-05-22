import React from 'react';
import {createContext, useContext, useReducer} from 'react';

import {feedActions} from './feedActions';
import {SignUpInfoContext} from './../../screens/forms/signUpInfoContext';

import {
  useGetUserInformation,
  useGetBlackLists,
  fetchPostsFromServer,
} from './../../hooks/useOperation';

import {feedReducer, feedInitialState} from './feedReducer';
import {AppContext} from './../../appContext';

const FeedContext = createContext(feedInitialState);

const FeedContextProvider = ({children}) => {
  const {userUID} = useContext(AppContext);

  const {user, setUser} = useContext(SignUpInfoContext);

  const [state, dispatch] = useReducer(feedReducer, feedInitialState);

  const getInformation = async (userUID, online) => {
    const userInfo = await useGetUserInformation(userUID, online);
    if (userInfo) {
      //set userInfo to the user context
      setUser(userInfo);
      dispatch({
        type: feedActions.SHOW_USER_INFO_ERROR,
        payload: {error: false},
      });
    } else {
      //dispatch to show userInfo error
      dispatch({
        type: feedActions.SHOW_USER_INFO_ERROR,
        payload: {error: true},
      });
    }
  };

  const getBlackLists = async userUID => {
    const response = await useGetBlackLists(userUID);
    if (response) {
      const {postsBlackListed, profilesBlackListed} = response;
      dispatch({
        type: feedActions.FETCHED_BLACKLIST,
        payload: {
          postBlackListed: postsBlackListed,
          profilesBlackListed: profilesBlackListed,
          error: false,
          finishedFetchingBlackLists: true,
        },
      });
      return true;
    } else {
      //dispatch to set failedFetchingBlacklists to false
      dispatch({
        type: feedActions.FETCHED_BLACKLIST_ERROR,
        payload: {error: true},
      });
      return false;
    }
  };

  const stopFetching = () => {
    dispatch({
      type: feedActions.STOP_FETCHING_FEEDS,
      payload: {
        isFetchingFeeds: false,
        failedFetchingFeeds: false,
      },
    });
  };

  const fetchPosts = async (
    blackListPost,
    blackListProfiles,
    startAfterDoc,
    limit,
  ) => {
    dispatch({
      type: feedActions.IS_FETCHING_FEED,
      payload: {isFetchingFeeds: true, failedFetchingFeeds: false},
    });

    const response = await fetchPostsFromServer(
      blackListPost,
      blackListProfiles,
      startAfterDoc,
      limit,
    );

    if (response) {
      const {lastVisibleItem, posts} = response;

      if (posts.length == 0 || posts.length < limit) {
        dispatch({
          type: feedActions.UPDATE_FEEDS,
          payload: {
            feeds: posts,
            lastVisibleItem: lastVisibleItem,
            postIsFinished: true,
          },
        });

        stopFetching();
      } else {
        dispatch({
          type: feedActions.UPDATE_FEEDS,
          payload: {
            feeds: posts,
            lastVisibleItem: lastVisibleItem,
            postIsFinished: false,
          },
        });
        stopFetching();
      }
    } else {
      dispatch({
        type: feedActions.FAILED_FETCHING_FEEDS,
        payload: {isFetchingFeeds: false, failedFetchingFeeds: true},
      });
      console.log('there is no response!!');
      return false;
    }
  };

  const confirmBeforeGettingPosts = async (
    blackListedPosts = state.postBlackListed,
    blackListedProfiles = state.profilesBlackListed,
    lastPost = state.lastPost,
    limit = state.itemsPerPage,
  ) => {
    console.log(state, 'from confirm');
    console.log(
      blackListedPosts,
      blackListedProfiles,
      lastPost,
      limit,
      'confirm payload',
    );
    dispatch({
      type: feedActions.IS_FETCHING_FEED,
      payload: {isFetchingFeeds: true, failedFetchingFeeds: false},
    });

    if (state.finishedFetchingBlackLists) {
      await fetchPosts(blackListedPosts, blackListedProfiles, lastPost, limit);
    } else {
      const response = await getBlackLists(userUID);

      if (response) {
        await fetchPosts(
          blackListedPosts,
          blackListedProfiles,
          lastPost,
          limit,
        );
      } else {
        dispatch({
          type: feedActions.FAILED_FETCHING_FEEDS,
          payload: {failedFetchingFeeds: true},
        });
      }
    }
  };

  const handleLoadMoreFeed = async () => {
    if (state.postIsFinished == false) {
      console.log(
        'loading more',
        state.postBlackListed,
        state.profilesBlackListed,
        state.lastPost,
        state.itemsPerPage,
      );
      return await fetchPosts(
        state.postBlackListed,
        state.profilesBlackListed,
        state.lastPost,
        state.itemsPerPage,
      );
    }
  };

  const value = {
    state,
    getInformation,
    getBlackLists,
    stopFetching,
    fetchPosts,
    confirmBeforeGettingPosts,
    handleLoadMoreFeed,
  };

  return <FeedContext.Provider value={value}>{children}</FeedContext.Provider>;
};

const useFeedContext = () => {
  const context = useContext(FeedContext);

  if (context === undefined) {
    throw new Error("you are using FEED CONTEXT where it should'nt be used..");
  }
  return context;
};

export {FeedContextProvider, useFeedContext};
