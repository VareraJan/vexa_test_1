import { AddPrefixToKeys, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

// /** создаст документ если не существует или перезапишет существующий (заменит только указанные поля) */
// export const useUpdateCollectionFirebase = async () => {
//   // создать ссылку на документ
//   const university = doc(db, `Universities/${id}`);

//   try {
//     await setDoc(university, { name: 'BGU' }, { merge: true });
//   } catch (error) {
//     console.log('setDoc ERROR ', error);
//   }
// };
export interface UpdateCollectionProps {
  id: string;
  collectionName: 'Groups';
  updateData: {
    [x: string]: any;
  } & AddPrefixToKeys<string, any>;
}

export const useUpdateCollectionFirebase = () => {
  const updateCollection = async ({ collectionName, id, updateData }: UpdateCollectionProps) => {
    const collection = doc(db, `${collectionName}/${id}`);
    try {
      updateDoc(collection, updateData);
    } catch (error) {
      return false;
    }
    return true;
  };

  return { updateCollection };
};
