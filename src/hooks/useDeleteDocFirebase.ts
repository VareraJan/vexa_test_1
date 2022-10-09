import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const useDeleteFirebase = () => {
  const deleteDocFirebase = async (collectionName: string, collectionId: string) => {
    await deleteDoc(doc(db, collectionName, collectionId));
  };

  return { deleteDocFirebase };
};
