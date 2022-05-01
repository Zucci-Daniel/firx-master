import {useNetInfo} from '@react-native-community/netinfo';
import {commonFunctions} from '../imports/all_files';

export const useCheckNetworkStatus = () => {
  const netInfo = useNetInfo();

  let subscribeToNetworkStats = netInfo.isInternetReachable;

  const subscribeToNetworkStatus = () =>
    netInfo.isInternetReachable ? true : false;

  console.log(subscribeToNetworkStats, ' network directly from the hook');
  const networkStatus = () => {
    // return commonFunctions.showToast(
    //   '',
    //   `you are ${netInfo.isInternetReachable ? `online` : `offline`}`,
    //   `${netInfo.isInternetReachable ? `success` : `alert`}`,
    // );
    null;
  };
  return {networkStatus, subscribeToNetworkStats, subscribeToNetworkStatus};
};
