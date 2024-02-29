import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export const fetchData = async (collectionName, condition) => {
  const result = [];
  try {
    const collectionRef = collection(db, collectionName);
    const queryRef = query(collectionRef, condition);
    const querySnapshot = await getDocs(queryRef);
    querySnapshot.docs.map((doc) => {
      const id = doc.id;
      const data = doc.data();
      result.push({ ...data, id });
    });

    return result;
  } catch (error) {
    console.log('Fail to fetch data: ', error);
  }
};

export const fetchDoc = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnapshot = await getDoc(docRef);
    const docData = docSnapshot.data();

    return { docRef, docSnapshot, docData };
  } catch (error) {
    console.log('Fail to get doc: ', error);
  }
};
