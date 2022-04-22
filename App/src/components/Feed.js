import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  universalPadding,
  height,
  colors,
  postHeight,
  width,
  postSize,
} from '../config/config';
import Post from './Post/Post';
import AppCarousel from './AppCarousel';
import ListSeparator from './ListSeparator';
import PostActions from './PostActions';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const Feed = ({
  useData = [],
  userUID,
  loading,
  loadMoreData = () => {
    console.log('nothing is lodeing');
  },
}) => {
  const [data, setData] = useState({
    dataProvider: new DataProvider((r1, r2) => r1 !== r2),
    mainData: [],
  });

  const [handleLayoutProvider] = useState(
    new LayoutProvider(
      index => {
        return index;
      },
      (type, dim) => {
        dim.width = 0;
        dim.height = 0;
      },
    ),
  );

  const handleRowRender = (type, data, index, extendedState) => {
    const {item, type: innerType} = data;

    return (
      <>
        <Post
          key={item.id}
          onPressPostMenu={null}
          onTapPost={() => null}
          onPush={() => null} //use transaction for this.
          profileImage={item.posterAvatar}
          name={item.posterName}
          caption={item.postCaption}
          date={'today :23:00pm wat'}>
          <AppCarousel
            useData={item.postMedias}
            shouldPlaySecondCondition={null}
          />
        </Post>
        <PostActions sheetRef={null} iAuthoredThis={null} />
      </>
    );
  };

  useEffect(() => {
    // handleLayoutProvider.shouldRefreshWithAnchoring = false;

    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([
        ...data.mainData,
        ...useData,
      ]),
      mainData: [...data.mainData, ...useData],
    });
  }, [useData]);
  return (
    <>
      <View style={styles.container}>
        {data.dataProvider._data.length !== 0 ? (
          <RecyclerListView
            forceNonDeterministicRendering={true} //to make sure it fits the height of it's content
            dataProvider={data.dataProvider}
            layoutProvider={handleLayoutProvider}
            rowRenderer={handleRowRender}
            onEndReached={() => loadMoreData()}
            onEndReachedThreshold={0.5}
            renderFooter={loading}
            renderAheadOffset={1000000}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              initialNumToRender: 4,
              removeClippedSubviews: true,
            }}
          />
        ) : null}
      </View>
    </>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    paddingBottom: universalPadding,
  },
});
