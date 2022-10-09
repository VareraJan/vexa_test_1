import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { IAmbassadorsToUniversity } from '../redux/slices/ambassadors/ambassadorsSlice';
import { IStudentToUniversity } from '../redux/slices/filter/filterSlice';

export interface CreateAccountProps {
  email: string;
  role: 'Students' | 'Ambassadors';
  birth: string;
  name: string;
  lastName: string;
  studentStatus?: 'apply' | 'commit';
  universityId: string;
  universityName?: string;
}

interface CreateChatGroupProps {
  name: string;
  universityId: string;
  universityName: string;
  access: 'all' | 'commit' | 'apply';
  description: string;
}

interface SerchRecordFirebaseProps {
  collectionName: 'Groups' | 'Students' | 'Ambassadors';
  universityId: string;
  whereSearch: string;
}

export const useCreateFirebase = () => {
  /** поисковый запрос в firebase по конкретной коллекции */
  const serchRecordFirebase = async ({
    collectionName,
    universityId,
    whereSearch,
  }: SerchRecordFirebaseProps) => {
    let searchRecord = false;
    let customerOrdersQuery;
    if (collectionName === 'Groups')
      customerOrdersQuery = query(
        collection(db, collectionName),
        where('name', '==', whereSearch),
        where('universityId', '==', universityId),
        limit(1),
      );
    else
      customerOrdersQuery = query(
        collection(db, collectionName),
        where('email', '==', whereSearch),
        limit(1),
      );

    const querySnapshot = await getDocs(customerOrdersQuery);
    querySnapshot.forEach((doc) => {
      if (doc.id) searchRecord = true;
    });

    return searchRecord;
  };

  const createAccount = async ({
    email,
    role,
    birth,
    name,
    lastName,
    universityId,
    universityName,
    studentStatus,
  }: CreateAccountProps) => {
    let createStatus: boolean | string = false;
    //  ПРОВЕРКА СУЩЕСТВУЕТ АККАУНТ С ТАКОЙ ПОЧТОЙ??
    const emailAlreadyInUse = await serchRecordFirebase({
      collectionName: role,
      universityId,
      whereSearch: email,
    });

    if (emailAlreadyInUse) {
      return 'email already in use';
    }

    let collectionData: IStudentToUniversity | IAmbassadorsToUniversity;
    if (role === 'Students' && studentStatus) {
      collectionData = {
        birth,
        country: '',
        email,
        enrollment: '',
        id: '',
        information: '',
        language: '',
        liked: [],
        name,
        parentInfo: '',
        photo: '',
        recordFrom: universityId,
        selectUniversity: '',
        soname: lastName,
        status: '',
        universities: [{ universityId, userStatus: studentStatus }],
        // uuid: collectionId,
        uuid: '',
      };
    } else {
      collectionData = {
        birth,
        city: '',
        email,
        firstName: name,
        // id: collectionId,
        id: '',
        image: '',
        language: '',
        lastName,
        status: 'approved',
        universityID: universityId,
        universityName: universityName || '',
        videos: [],
        createdAt: new Date() as unknown as { seconds: number; nanoseconds: number },
      };
    }

    try {
      const docRef = await addDoc(collection(db, role), collectionData);

      const collectionLink = doc(db, `${role}/${docRef.id}`);
      try {
        const updateData = role === 'Students' ? { uuid: docRef.id } : { id: docRef.id };

        await setDoc(collectionLink, updateData, { merge: true });
        createStatus = true;
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    } catch (error) {
      console.log('Error adding document: ', error);
    }

    return createStatus;
  };

  const createChatGroup = async ({
    name,
    universityName,
    universityId,
    access,
    description,
  }: CreateChatGroupProps) => {
    let createStatus: boolean | string = false;

    const emailAlreadyInUse = await serchRecordFirebase({
      collectionName: 'Groups',
      universityId,
      whereSearch: name,
    });

    if (emailAlreadyInUse) {
      return 'group name already in use';
    }

    /* new document to collection */
    try {
      const docRef = await addDoc(collection(db, `Groups`), {
        name,
        universityId,
        universityName,
        access,
        description,
        photo: '',
        ambassadorsId: [],
        usersId: [],
        blackList: [],
      });

      const collectionLink = doc(db, `Groups/${docRef.id}`);
      try {
        await setDoc(collectionLink, { id: docRef.id }, { merge: true });
        createStatus = true;
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    } catch (error) {
      console.log('Error adding document: ', error);
    }

    return createStatus;
  };

  return { createAccount, createChatGroup };
};
