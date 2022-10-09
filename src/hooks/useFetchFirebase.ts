import {
  collection,
  endAt,
  endBefore,
  getDocs,
  limit,
  limitToLast,
  orderBy,
  query,
  startAfter,
  startAt,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { IAmbassadorsToUniversity } from '../redux/slices/ambassadors/ambassadorsSlice';
import { IStudentToUniversity } from '../redux/slices/filter/filterSlice';
import { IVideo } from '../redux/slices/universityVideo/universityVideoSlice';

interface FetchApprovedStudentsDataFirebaseParams {
  universityID: string;
  pageLimit: number;
  start?: IStudentToUniversity;
  end?: IStudentToUniversity;
  startAft?: IStudentToUniversity;
  userStatus?: 'reject';
  order: 'name' | 'email';
}
export interface FetchDataFirebaseParams {
  universityID: string;
  nameCollection: string;
  queryStatus: 'approved' | 'reject' | 'pending';
  pageLimit: number;
  start?: IVideo | IAmbassadorsToUniversity;
  end?: IVideo | IAmbassadorsToUniversity;
  startAft?: IVideo | IAmbassadorsToUniversity;
}

export const useFetchFirebase = () => {
  const fetchDataFirebase = async ({
    universityID,
    nameCollection,
    queryStatus,
    pageLimit,
    start,
    end,
    startAft,
  }: FetchDataFirebaseParams) => {
    const List: any[] = [];

    let customerOrdersQueryFirst;

    if (start) {
      customerOrdersQueryFirst = query(
        collection(db, nameCollection),
        where('universityID', '==', universityID),
        where('status', '==', queryStatus),
        orderBy('createdAt'),
        startAt(start),
        limit(pageLimit),
      );
    } else if (end) {
      customerOrdersQueryFirst = query(
        collection(db, nameCollection),
        where('universityID', '==', universityID),
        where('status', '==', queryStatus),
        orderBy('createdAt'),
        endBefore(end),
        limitToLast(pageLimit),
      );
    } else if (startAft) {
      customerOrdersQueryFirst = query(
        collection(db, nameCollection),
        where('universityID', '==', universityID),
        where('status', '==', queryStatus),
        orderBy('createdAt'),
        startAfter(startAft),
        limit(pageLimit),
      );
    } else {
      customerOrdersQueryFirst = query(
        collection(db, nameCollection),
        where('universityID', '==', universityID),
        where('status', '==', queryStatus),
        orderBy('createdAt'),
        limit(pageLimit),
      );
    }

    const documentSnapshot = await getDocs(customerOrdersQueryFirst);
    documentSnapshot.forEach((doc) => {
      List.push(doc.data());
    });

    const lastVisible = documentSnapshot.docs[documentSnapshot.docs.length - 1];
    const firstVisible = documentSnapshot.docs[0];
    const secondVisible = documentSnapshot.docs[1];

    return { List, firstVisible, lastVisible, secondVisible };
  };

  const fetchApprovedStudentsDataFirebase = async ({
    universityID,
    pageLimit,
    start,
    end,
    startAft,
    order,
    userStatus,
  }: FetchApprovedStudentsDataFirebaseParams) => {
    const List: any[] = [];

    let customerOrdersQueryFirst;
    let paramsWhere;
    if (userStatus) {
      paramsWhere = [
        {
          universityId: universityID,
          userStatus: 'reject',
        },
      ];
    } else {
      paramsWhere = [
        {
          universityId: universityID,
          userStatus: 'commit',
        },
        {
          universityId: universityID,
          userStatus: 'apply',
        },
      ];
    }

    if (start) {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', paramsWhere),
        orderBy(order),
        startAt(start),
        limit(pageLimit),
      );
    } else if (end) {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', paramsWhere),
        orderBy(order),
        endBefore(end),
        limitToLast(pageLimit),
      );
    } else if (startAft) {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', paramsWhere),
        orderBy(order),
        startAfter(startAft),
        limit(pageLimit),
      );
    } else {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', paramsWhere),
        orderBy(order),
        limit(pageLimit),
      );
    }

    const documentSnapshot = await getDocs(customerOrdersQueryFirst);
    documentSnapshot.forEach((doc) => {
      List.push(doc.data());
    });

    const lastVisible = documentSnapshot.docs[documentSnapshot.docs.length - 1];
    const firstVisible = documentSnapshot.docs[0];
    const secondVisible = documentSnapshot.docs[1];

    return { List, firstVisible, lastVisible, secondVisible };
  };

  const fetchPendingStudentsDataFirebase = async ({
    universityID,
    pageLimit,
    start,
    end,
    startAft,
    order,
  }: FetchApprovedStudentsDataFirebaseParams) => {
    const List: any[] = [];

    let customerOrdersQueryFirst;

    if (start) {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', [
          {
            universityId: universityID,
            userStatus: 'expected commit',
          },
          {
            universityId: universityID,
            userStatus: 'expected apply',
          },
        ]),
        orderBy(order),
        startAt(start),
        limit(pageLimit),
      );
    } else if (end) {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', [
          {
            universityId: universityID,
            userStatus: 'expected commit',
          },
          {
            universityId: universityID,
            userStatus: 'expected apply',
          },
        ]),
        orderBy(order),
        endBefore(end),
        limitToLast(pageLimit),
      );
    } else if (startAft) {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', [
          {
            universityId: universityID,
            userStatus: 'expected commit',
          },
          {
            universityId: universityID,
            userStatus: 'expected apply',
          },
        ]),
        orderBy(order),
        startAfter(startAft),
        limit(pageLimit),
      );
    } else {
      customerOrdersQueryFirst = query(
        collection(db, 'Students'),
        where('universities', 'array-contains-any', [
          {
            universityId: universityID,
            userStatus: 'expected commit',
          },
          {
            universityId: universityID,
            userStatus: 'expected apply',
          },
        ]),
        orderBy(order),
        limit(pageLimit),
      );
    }

    const documentSnapshot = await getDocs(customerOrdersQueryFirst);
    documentSnapshot.forEach((doc) => {
      List.push(doc.data());
    });

    const lastVisible = documentSnapshot.docs[documentSnapshot.docs.length - 1];
    const firstVisible = documentSnapshot.docs[0];
    const secondVisible = documentSnapshot.docs[1];

    return { List, firstVisible, lastVisible, secondVisible };
  };

  // TODO any убрать когда будут RTK slice для чатов
  interface FetchChatGroupsDataFirebaseProps {
    universityId: string;
    pageLimit: number;
    order: string;
    start?: any;
    end?: any;
    startAft?: any;
  }
  const fetchChatGroupsDataFirebase = async ({
    universityId,
    pageLimit,
    order,
    start,
    end,
    startAft,
  }: FetchChatGroupsDataFirebaseProps) => {
    const List: any[] = [];
    let customerOrdersQueryFirst;

    if (start) {
      customerOrdersQueryFirst = query(
        collection(db, 'Groups'),
        where('universityId', '==', universityId),
        orderBy(order),
        startAt(start),
        limit(pageLimit),
      );
    } else if (end) {
      customerOrdersQueryFirst = query(
        collection(db, 'Groups'),
        where('universityId', '==', universityId),
        orderBy(order),
        endBefore(end),
        limitToLast(pageLimit),
      );
    } else if (startAft) {
      customerOrdersQueryFirst = query(
        collection(db, 'Groups'),
        where('universityId', '==', universityId),
        orderBy(order),
        startAfter(startAft),
        limit(pageLimit),
      );
    } else {
      customerOrdersQueryFirst = query(
        collection(db, 'Groups'),
        where('universityId', '==', universityId),
        orderBy(order),
        limit(pageLimit),
      );
    }

    const documentSnapshot = await getDocs(customerOrdersQueryFirst);
    documentSnapshot.forEach((doc) => {
      List.push(doc.data());
    });

    const lastVisible = documentSnapshot.docs[documentSnapshot.docs.length - 1];
    const firstVisible = documentSnapshot.docs[0];
    const secondVisible = documentSnapshot.docs[1];

    return { List, firstVisible, lastVisible, secondVisible };
  };

  return {
    fetchDataFirebase,
    fetchApprovedStudentsDataFirebase,
    fetchPendingStudentsDataFirebase,
    fetchChatGroupsDataFirebase,
  };
};
