import {useNetInfo} from '@react-native-community/netinfo';
import {commonFunctions} from '../imports/all_files';

export const checkNetworkStatus = () => {
  const netInfo = useNetInfo();

  let subscribeToNetworkStats = netInfo.isInternetReachable;

  const subscribeToNetworkStatus = ()=>netInfo.isInternetReachable?true:false;

  console.log(subscribeToNetworkStats, ' network directly from the hook');
  const networkStatus = () => {
    return commonFunctions.showToast(
      'hi',
      `you are ${netInfo.isInternetReachable ? `online` : `offline`}`,
      `${netInfo.isInternetReachable ? `success` : `alert`}`,
    );
  };
  return {networkStatus, subscribeToNetworkStats,subscribeToNetworkStatus};
};
