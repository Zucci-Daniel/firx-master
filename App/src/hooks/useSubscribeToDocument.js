import {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

export const useSubscribeToDocument = (id, collection = 'STUDENTS') => {
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const subscribe = firestore()
      .collection(collection)
      .doc(id)
      .onSnapshot(documentSnapShot => {
        setDoc(documentSnapShot.data().personalities);
      });
    return subscribe();
  }, []);

  return {doc};
};


// I NEED TO MAKE USE OF THIS