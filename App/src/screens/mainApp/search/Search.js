import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../../config/config';

import Link from '../../../components/Link';
import SearchBar from '../../../components/search-bar/SearchBar';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import ProfilePane from '../../../components/ProfilePane';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../../../appContext';

const Search = () => {
  const globalNavigation = useNavigation();
  const { userUID } = useContext(AppContext);

  const [text, setText] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {

    const results = [];

    firestore()
      .collection('STUDENTS')
      .orderBy('firstName')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then((querySnapShot) => {
        querySnapShot?.docs.forEach(doc => userUID !== doc.data().id && results.push({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          profileImage: doc.data().profileImage,
          id: doc.data().id,
        }))
        setResults(results)
      })
  };

  const handleProfileSelection = (id) => {
    console.log(' see the id ', id)
    globalNavigation.navigate('userProfileStack', {
      screen: 'userProfile',
      params: { posterUserUID: id },
    });
  };
  const handleClear = () => {
    setResults([])
    setText('')
  }
  return (
    <View style={styles.container}>
      <SearchBar
        value={text}
        onSearch={text.trim() !== '' ? handleSearch : null} getText={(text) => setText(text)} onClear={handleClear} />

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProfilePane
          showFollowers={false}
          profileImageSize={79}
          externalProfileImage={item.profileImage}
          username={`${item.firstName} ${item.lastName}`}
          onPress={() => handleProfileSelection(item.id)}
        />}
      />

    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neonBg,
    alignContent: 'center',
    padding: 20
  },
});
