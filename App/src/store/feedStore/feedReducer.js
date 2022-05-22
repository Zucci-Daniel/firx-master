import {feedActions} from './feedActions';

export const feedInitialState = {
  failedGettingUserInfo: null,
  //for cross-checkings
  shouldGetUserInformation: true,
  //for posts
  isFetchingFeeds: true,
  failedFetchingFeeds: null,
  isLoading: null,
  errorFetchingFeeds: null,
  errorMessage: '',
  feeds: [],
  postBlackListed: [],
  profilesBlackListed: [],
  finishedFetchingBlackLists: null,
  failedToFetchBlackLists: null,
  postIsFinished: null,
  lastPost: null,
  itemsPerPage: 10,
  //incase of updates
  postedSomething: null,
};

export const feedReducer = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case feedActions.SHOW_USER_INFO_ERROR:
      return {
        ...state,
        failedGettingUserInfo: payload.error,
      };

    case feedActions.FETCHED_BLACKLIST:
      return {
        ...state,
        postBlackListed: payload.postBlackListed,
        profilesBlackListed: payload.profilesBlackListed,
        failedToFetchBlackLists: payload.error,
        finishedFetchingBlackLists: payload.finishedFetchingBlackLists,
      };
    case feedActions.FETCHED_BLACKLIST_ERROR:
      return {
        ...state,
        failedToFetchBlackLists: payload.error,
      };
    case feedActions.STOP_FETCHING_FEEDS:
      return {
        ...state,
        isFetchingFeeds: payload.isFetchingFeeds,
        failedFetchingFeeds: payload.failedFetchingFeeds,
      };
    case feedActions.IS_FETCHING_FEED:
      return {
        ...state,
        failedFetchingFeeds: payload.failedFetchingFeeds,
        isFetchingFeeds: payload.isFetchingFeeds,
      };
    case feedActions.FAILED_FETCHING_FEEDS: {
      return {
        ...state,
        failedFetchingFeeds: payload.failedFetchingFeeds,
        isFetchingFeeds: payload.isFetchingFeeds,
      };
    }
    case feedActions.UPDATE_FEEDS: {
      return {
        ...state,
        feeds: [...state.feeds, ...payload.feeds],
        lastPost: payload.lastVisibleItem,
        postIsFinished: payload.postIsFinished,
      };
    }

    default:
      return {
        ...state,
      };
  }
};
