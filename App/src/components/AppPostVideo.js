import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, View, Button} from 'react-native';
import {width, height, postHeight, colors} from '../config/config';
// import VideoPlayer from 'react-native-video-controls';
import {useNavigation} from '@react-navigation/native';
import {Video, AVPlaybackStatus} from 'expo-av';
import ControlIcon from './ControlIcon';
import MediaSkeleton from './MediaSkeleton';
import ControlsWrapper from './ControlsWrapper';

const AppPostVideo = ({
  videoUri = 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  shouldPlay = false,
  loop = false,
  useHeight = 400,
  thumbnail = 'https://baconmockup.com/300/200/',
}) => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sound, setSound] = useState(false);
  const [error, setError] = useState(false);

  console.log(status, ' the vidoe satu');

  const handleStatus = () => {
    return status.isPlaying
      ? videoRef.current.pauseAsync()
      : videoRef.current.playAsync();
  };

  const handleReload = () => videoRef.current.replayAsync();
  // const handleSound = () => setStatus({...status,isMuted:!status.isMuted});
  const handleSound = () => setSound(!sound);

  const size = isLoading ? 0 : '100%';

  return (
    <Pressable>
      <View style={[styles.container, {height: useHeight}]}>
        <Video
          style={{width: size, height: size}}
          ref={videoRef}
          shouldPlay={shouldPlay}
          source={{
            uri: videoUri,
          }}
          posterSource={thumbnail}
          posterStyle={{width: '100%', height: '100%'}}
          useNativeControls
          resizeMode="cover"
          isLooping={loop}
          onError={() => setError(true)}
          isMuted={sound}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
          onReadyForDisplay={() => setIsLoading(false)}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => setIsLoading(false)}
        />
        <ControlsWrapper extraStyles={styles.middleControls}>
          {error && (
            <ControlIcon
              color={colors.calmRed}
              onPress={null}
              iconName={'md-alert-circle'}
              extraPlayStyles={styles.reload}
              size={50}
            />
          )}
          {status.didJustFinish && (
            <ControlIcon
              onPress={handleReload}
              iconName={'md-reload-outline'}
              extraPlayStyles={styles.reload}
            />
          )}
        </ControlsWrapper>
        {isLoading && <MediaSkeleton />}
      </View>
      <ControlsWrapper extraStyles={styles.bottomControls}>
        {status.didJustFinish ||
          (!isLoading && (
            <ControlIcon
              onPress={!isLoading ? handleStatus : null}
              iconName={status.isPlaying ? 'pause' : 'play'}
              extraPlayStyles={styles.extraPlayStyles}
            />
          ))}
        <ControlIcon
          onPress={handleSound}
          iconName={!sound ? 'volume-high' : 'volume-mute'}
          extraPlayStyles={styles.extraPlayStyles}
        />
      </ControlsWrapper>
      <ControlIcon
        onPress={null}
        iconName={'videocam'}
        extraPlayStyles={styles.videoIndicator}
        size={20}
      />
    </Pressable>
  );
};

export default AppPostVideo;

const styles = StyleSheet.create({
  container: {
    width: width,
    margin: 0,
    position: 'relative',
  },

  bottomControls: {
    position: 'absolute',
    bottom: 0,
  },
  middleControls: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignContent: 'space-between',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  videoIndicator: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
