import { collection, DocumentData, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { IAmbassadorsToUniversity } from '../redux/slices/ambassadors/ambassadorsSlice';
import { IStudentToUniversity } from '../redux/slices/filter/filterSlice';

interface SearchRecordProps {
  nameCollection: 'Students' | 'Ambassadors';
  email: string;
  universityId: string;
}

export interface ResponseProps {
  user: IStudentToUniversity | IAmbassadorsToUniversity | undefined;
  status: string;
  message: string;
}

export const useSearchUserFirebase = () => {
  const searchUserRecord = async ({ nameCollection, email, universityId }: SearchRecordProps) => {
    const customerOrdersQueryFirst = query(
      collection(db, nameCollection),
      where('email', '==', email),
    );

    const response: ResponseProps = {
      user: undefined,
      status: '',
      message: '',
    };
    const documentSnapshot = await getDocs(customerOrdersQueryFirst);
    documentSnapshot.forEach((doc) => {
      response.user = doc.data() as IStudentToUniversity | undefined;
    });

    // проверка привязан ли пользователь к университету и какой у него этап
    if (response.user) {
      let status;
      if ('name' in response.user) {
        status = response.user?.universities.find(
          (el) => el.universityId === universityId,
        )?.userStatus;
      }

      if ('firstName' in response.user) {
        if (response.user.universityID === universityId) {
          status = response.user.status;
        }
      }

      if (status) {
        response.status = status;
        response.message = `user ${email} has already applied, STATUS: ${status}`;
      } else {
        response.message = `user ${email} found`;
      }
    } else response.message = `user ${email} not found`;

    return response;
  };

  const searchUserUniversityRecord = async ({
    nameCollection,
    email,
    universityId,
  }: SearchRecordProps) => {
    const response: ResponseProps = {
      user: undefined,
      status: '',
      message: '',
    };

    let customerOrdersQueryFirst;

    if (nameCollection === 'Students') {
      customerOrdersQueryFirst = query(
        collection(db, nameCollection),
        where('email', '==', email),
        where('universities', 'array-contains-any', [
          {
            universityId,
            userStatus: 'commit',
          },
          {
            universityId,
            userStatus: 'apply',
          },
          {
            universityId,
            userStatus: 'reject',
          },
        ]),
      );
    } else {
      customerOrdersQueryFirst = query(
        collection(db, nameCollection),
        where('email', '==', email),
        where('universityID', '==', universityId),
      );
    }

    const documentSnapshot = await getDocs(customerOrdersQueryFirst);
    documentSnapshot.forEach((doc) => {
      response.user = doc.data() as IStudentToUniversity | IAmbassadorsToUniversity | undefined;
    });

    if (response.user) {
      // проверка привязан ли пользователь к университету и какой у него этап
      if ('name' in response.user) {
        const status = response.user?.universities.find(
          (el) => el.universityId === universityId,
        )?.userStatus;

        if (status) {
          response.status = status;
          response.message = `user ${email} has already applied, STATUS: ${status}`;
        }
      }

      if ('firstName' in response.user) {
        if (response.user.status !== 'pending') {
          response.status = response.user.status;
          response.message = `user ${email} has already applied, STATUS: ${response.user.status}`;
        } else {
          response.user = undefined;
          response.message = `user ${email} not found`;
        }
      }
    } else response.message = `user ${email} not found`;

    return response;
  };

  return { searchUserRecord, searchUserUniversityRecord };
};
