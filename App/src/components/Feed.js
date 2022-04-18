import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
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
import AppLoading from './AppLoading';
import Post from './Post/Post';
import AppCarousel from './AppCarousel';
import ListSeparator from './ListSeparator';

import PostActions from './PostActions';

import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

const Feed = ({useData = [], userUID}) => {
  const [data, setData] = useState({
    dataProvider: new DataProvider((r1, r2) => r1 !== r2),
    mainData: [],
  });

  const handleLayoutProvider = new LayoutProvider(
    index => {
      // console.log(data.dataProvider.getDataForIndex(index), ' yes sir');
      return index;
    },
    (type, dim) => {
      dim.width = width;
      dim.height = postHeight;
    },
  );

  const handleRowRender = (type, data) => {
    const {item} = data;
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
    f;
  };

  const loadMoreData = () => {
    setTimeout(() => {
      console.log('endineding');
    }, 4000);
  };

  const animation = () => (
    <Text style={{marginVertical: 10, backgroundColor: 'red'}}>loaidng</Text>
  );

  useEffect(() => {
    setData({
      ...data,
      dataProvider: data.dataProvider.cloneWithRows([
        ...data.mainData,
        ...useData,
      ]),
      mainData: [...data.mainData, ...useData],
    });
  }, []);

  return (
    <>
      <View style={{width: width, height: undefined}}>
        {data.dataProvider._data.length !== 0 ? (
          <RecyclerListView
            forceNonDeterministicRendering={true} //to make sure it fits the height of it's content
            dataProvider={data.dataProvider}
            layoutProvider={handleLayoutProvider}
            rowRenderer={handleRowRender}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            renderFooter={animation}
            scrollViewProps={{
              showsVerticalScrollIndicator: false,
              ItemSeparatorComponent: () => <ListSeparator />,
            }}
          />
        ) : null}
      </View>
    </>
  );
};

export default Feed;


const styles = StyleSheet.create({});
