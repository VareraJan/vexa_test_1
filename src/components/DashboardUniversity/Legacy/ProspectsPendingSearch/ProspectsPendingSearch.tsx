import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';
import deleteIcon from '../../../assets/img/dashboard/apprVideoReject.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import searchIcon from '../../../assets/img/dashboard/search-2.svg';
import reset from '../../../assets/img/dashboard/reset.svg';

import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';

import {
  ActionWrapper,
  AllProspects,
  Btn,
  BtnGroup,
  Container,
  ContentBlocks,
  HeadLists,
  IconWrapper,
  Line,
  Line2,
  Logo,
  SearchBlocks,
  SearchResult,
  Title,
} from './ProspectsPendingSearch.styled';
import { useFetchFirebase } from '../../../../hooks/useFetchFirebase';
import {
  IStudentToUniversity,
  StudentsColUniversities,
} from '../../../../redux/slices/filter/filterSlice';
import { setStudentsPendingToUniversity } from '../../../../redux/slices/students/studentsSlice';
import { ResponseProps, useSearchUserFirebase } from '../../../../hooks/useSearchFirebase';
// import { AllStudents } from '../../ProspectsSearch/ProspectsSearch.styled';
import SubMenuAdd from '../../SubMenuAdd';
import CreateAccount from '../../CreateAccount';
import Pagination from '../../Pagination';
import { ImageWrapper } from '../../../../styled/dashboard';
import { AllStudents } from '../ProspectsSearch/ProspectsSearch.styled';

interface ProspectsPendingSearchProps {
  id: string;
  hiddenChildren: boolean;
}

const ProspectsPendingSearch: React.FC<ProspectsPendingSearchProps> = ({ id, hiddenChildren }) => {
  const [searchStudent, setSearchStudent] = useState('');
  const [searchStudentResult, setSearchStudentResult] = useState<ResponseProps>();
  const [addStudentBtnActive, setAddStudentBtnActive] = useState(false);
  const { fetchPendingStudentsDataFirebase } = useFetchFirebase();
  const { searchUserRecord } = useSearchUserFirebase();

  const {
    students,
    currentPage,
    pageLimit,
    firstCurrentDoc,
    secondCurrentDoc,
    lastCurrentDoc,
    status,
  } = useAppSelector((state) => state.students.pendingStudents);

  const dispatch = useAppDispatch();

  // TODO: newRequests заменить на запрос
  const newRequests = 1;

  const getProspectsPendingHandler = async (universityID: string) => {
    const { List, firstVisible, secondVisible, lastVisible } =
      await fetchPendingStudentsDataFirebase({
        universityID,
        pageLimit,
        order: 'email',
      });

    dispatch(
      setStudentsPendingToUniversity({
        students: List,
        currentPage: 1,
        firstCurrentDoc: firstVisible,
        lastCurrentDoc: lastVisible,
        secondCurrentDoc: secondVisible,
      }),
    );
  };

  /** перезапросить данные текущей страницы */
  const getUpdateProspectsPendingHandler = async (start: IStudentToUniversity) => {
    const { List, firstVisible, secondVisible, lastVisible } =
      await fetchPendingStudentsDataFirebase({
        universityID: id,
        pageLimit,
        start,
        order: 'email',
      });

    dispatch(
      setStudentsPendingToUniversity({
        students: List,
        currentPage,
        firstCurrentDoc: firstVisible,
        lastCurrentDoc: lastVisible,
        secondCurrentDoc: secondVisible,
      }),
    );
  };

  const paginationHandler = async (action: 'up' | 'down', forcibly?: boolean) => {
    if (action === 'down') {
      if (!forcibly) {
        if (currentPage === 1) return;
        if (currentPage - 1 === 1) return getProspectsPendingHandler(id);
      }
      const { List, firstVisible, secondVisible, lastVisible } =
        await fetchPendingStudentsDataFirebase({
          universityID: id,
          pageLimit,
          end: firstCurrentDoc,
          order: 'email',
        });

      dispatch(
        setStudentsPendingToUniversity({
          students: List,
          currentPage: currentPage - 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }

    if (action === 'up' && students.length === pageLimit) {
      const { List, firstVisible, secondVisible, lastVisible } =
        await fetchPendingStudentsDataFirebase({
          universityID: id,
          pageLimit,
          startAft: lastCurrentDoc,
          order: 'email',
        });

      if (!List.length) return;

      dispatch(
        setStudentsPendingToUniversity({
          students: List,
          currentPage: currentPage + 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }
  };

  const RejectAmbassadorHandler = async (studentId: string, search?: boolean) => {
    const student = doc(db, `Students/${studentId}`);
    const querySnapshot = await getDoc(student);
    if (querySnapshot.exists()) {
      const data = querySnapshot.data();

      data.universities = data.universities.map((el: StudentsColUniversities) => {
        if (el.universityId === id) {
          el.userStatus = 'reject';
          return el;
        }
        return el;
      });

      try {
        await setDoc(student, { universities: data.universities }, { merge: true });
        // перезапросить страницу
        if (students.length === 1) paginationHandler('down', true);
        else if (students[0].id === studentId) getUpdateProspectsPendingHandler(secondCurrentDoc);
        else getUpdateProspectsPendingHandler(firstCurrentDoc);
        // обновить поиск
        if (search) searchStudentHandler();
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    }
  };

  // TODO продублировать в ProspectsSerch, будет время => вынести все в хуки или родительский компонент и переписать код =======>
  const ApprovedAmbassadorHandler = async (
    studentId: string,
    search?: boolean,
    downPage: boolean = true,
    newStatus?: 'apply' | 'commit',
  ) => {
    const student = doc(db, `Students/${studentId}`);
    const querySnapshot = await getDoc(student);
    if (querySnapshot.exists()) {
      const data = querySnapshot.data();

      let repeat = false;
      data.universities = data.universities.map((el: StudentsColUniversities) => {
        if (el.universityId === id) {
          repeat = true;
          if (!newStatus) {
            if (el.userStatus === 'expected apply') el.userStatus = 'apply';
            if (el.userStatus === 'expected commit') el.userStatus = 'commit';
          } else el.userStatus = newStatus;

          return el;
        }
        return el;
      });

      if (!repeat) {
        data.universities.push({ universityId: id, userStatus: newStatus });
      }

      try {
        await setDoc(student, { universities: data.universities }, { merge: true });
        // перезапросить страницу
        if (downPage) {
          if (students.length === 1) paginationHandler('down', true);
          else if (students[0].id === studentId) getUpdateProspectsPendingHandler(secondCurrentDoc);
          else getUpdateProspectsPendingHandler(firstCurrentDoc);
        }
        // обновить поиск
        if (search) searchStudentHandler();
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    }
  };

  // TODO deleteStudentFromUniversity взято из ProspectSearch, будет время => вынести все в хуки или родительский компонент и переписать код =======>
  const deleteStudentFromUniversity = async (studentId: string, search?: boolean) => {
    const student = doc(db, `Students/${studentId}`);
    const querySnapshot = await getDoc(student);
    if (querySnapshot.exists()) {
      const data = querySnapshot.data();

      data.universities = data.universities.map((el: StudentsColUniversities) => {
        if (el.universityId === id) {
          el.userStatus = 'reject';
          return el;
        }
        return el;
      });

      try {
        await setDoc(student, { universities: data.universities }, { merge: true });
        // перезапросить страницу
        // if (students.length === 1) paginationHandler('down', true);
        // else if (students[0].id === studentId) getUpdateProspectsHandler(secondCurrentDoc);
        // else getUpdateProspectsHandler(firstCurrentDoc);

        // обновить поиск
        if (search) searchStudentHandler();
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    }
  };

  const searchStudentHandler = async () => {
    const response = await searchUserRecord({
      nameCollection: 'Students',
      email: searchStudent,
      universityId: id,
    });
    setSearchStudentResult(response);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStudent(event.target.value.trim());
  };

  const getExpectedStatus = (student: IStudentToUniversity) => {
    return student.universities.find((el) => el.universityId === id)?.userStatus;
  };

  const getStudentInfo = (student: IStudentToUniversity, param: 'status' | 'invite') => {
    // TODO

    if (param === 'status') {
      return student.universities.find((el) => el.universityId === id)?.userStatus;
    }
    if (param === 'invite') return '07/11/2021 MOCK';
  };

  useEffect(() => {
    getProspectsPendingHandler(id);
  }, []);

  return (
    <Container hidden={hiddenChildren}>
      <Line />
      <SubMenuAdd
        title='Add Student'
        isActive={addStudentBtnActive}
        setIsActive={setAddStudentBtnActive}
      />
      {addStudentBtnActive && (
        <CreateAccount role='student' universityId={id} setIsActive={setAddStudentBtnActive} />
      )}

      <ContentBlocks>
        <Title>
          New Requests: {newRequests}
          <ImageWrapper url={reset} onClick={() => getProspectsPendingHandler(id)} />
        </Title>

        {searchStudentResult?.message && (
          <SearchResult color={searchStudentResult.user ? '#02B0BB' : 'tomato'}>
            {searchStudentResult.message}
          </SearchResult>
        )}

        <SearchBlocks>
          <input onChange={inputHandler} value={searchStudent} placeholder='Enter Email Here' />
          <Logo src={searchIcon} width='24px' onClick={searchStudentHandler} pointer />
        </SearchBlocks>
      </ContentBlocks>

      <BtnGroup>
        {searchStudentResult?.user && searchStudentResult.status === '' && (
          <>
            <Btn
              onClick={() => {
                if (searchStudentResult.user && 'uuid' in searchStudentResult.user)
                  ApprovedAmbassadorHandler(searchStudentResult.user.uuid, true, false, 'apply');
              }}>
              Application
            </Btn>
            <Btn
              marginLeft='10px'
              onClick={() => {
                if (searchStudentResult.user && 'uuid' in searchStudentResult.user)
                  ApprovedAmbassadorHandler(searchStudentResult.user.uuid, true, false, 'commit');
              }}>
              Committed
            </Btn>
          </>
        )}
      </BtnGroup>

      {searchStudentResult?.user &&
        'photo' in searchStudentResult.user &&
        (searchStudentResult.status === 'expected apply' ||
          searchStudentResult.status === 'expected commit') && (
          // TODO: заменить на подготовленный шаблон из approvedProspects(удалить корзину в шаблоне)
          <AllProspects height='0' marginBottom='20px'>
            <li key={searchStudentResult.user.uuid}>
              <div className='name'>
                <IconWrapper
                  width='50px'
                  borderRadius='25px'
                  url={searchStudentResult.user.photo}></IconWrapper>
                {/* // todo tooltip for Title */}
                <Title
                  mrl='23px'
                  list
                  width='117px'>{`${searchStudentResult.user.name} ${searchStudentResult.user.soname}`}</Title>
              </div>
              <div className='email'>{searchStudentResult.user.email}</div>
              <div className='status'>{getExpectedStatus(searchStudentResult.user)}</div>
              <div className='icon-block'>
                <ActionWrapper
                  acceptr
                  width='31px'
                  onClick={() => {
                    if (searchStudentResult?.user && 'uuid' in searchStudentResult.user)
                      ApprovedAmbassadorHandler(searchStudentResult.user.uuid, true);
                  }}>
                  <Logo src={acceptIcon} width='18px' />
                </ActionWrapper>
                <ActionWrapper
                  delete
                  width='31px'
                  onClick={() => {
                    if (searchStudentResult?.user && 'uuid' in searchStudentResult.user)
                      RejectAmbassadorHandler(searchStudentResult.user.uuid, true);
                  }}>
                  <Logo src={deleteIcon} width='16px' />
                </ActionWrapper>
              </div>
            </li>
          </AllProspects>
        )}

      {searchStudentResult?.user &&
        'photo' in searchStudentResult.user &&
        (searchStudentResult.status === 'apply' ||
          searchStudentResult.status === 'commit' ||
          searchStudentResult.status === 'reject') && (
          <AllStudents marginBottom='20px'>
            <li key={searchStudentResult.user.id}>
              <div className='name'>
                <IconWrapper
                  width='50px'
                  borderRadius='25px'
                  url={searchStudentResult.user.photo}></IconWrapper>
                <Title width='130px'>{`${searchStudentResult.user.name} ${searchStudentResult.user.soname}`}</Title>
              </div>
              {/* // TODO inviteDate заглушка, если не удастся решить откуда брать данные, заменить на что-то другое */}
              <div className='invitedDate'>
                {getStudentInfo(searchStudentResult.user, 'invite')}
              </div>
              <div className='email'>{searchStudentResult.user.email}</div>
              <div className='country'>{searchStudentResult.user.country}</div>
              <div className='status'>{getStudentInfo(searchStudentResult.user, 'status')}</div>
              {searchStudentResult.status !== 'reject' && (
                <div
                  className='delete'
                  onClick={() => {
                    if (searchStudentResult?.user && 'uuid' in searchStudentResult.user)
                      deleteStudentFromUniversity(searchStudentResult.user.uuid, true);
                  }}></div>
              )}
            </li>
          </AllStudents>
        )}

      <HeadLists>
        <div className='name'>
          Name <Logo src={vectorDown} width='16px' />
        </div>
        <div className='email'>Email</div>
        <div className='status'>Status</div>
        <div className='icon-block'></div>
      </HeadLists>
      <Line2 />
      <AllProspects>
        {students.map((student) => (
          <li key={student.uuid}>
            <div className='name'>
              <IconWrapper width='50px' borderRadius='25px' url={student.photo}></IconWrapper>
              {/* // todo tooltip for Title */}
              <Title mrl='23px' list width='117px'>{`${student.name} ${student.soname}`}</Title>
            </div>
            <div className='email'>{student.email}</div>
            <div className='status'>{getExpectedStatus(student)}</div>
            <div className='icon-block'>
              <ActionWrapper
                acceptr
                width='31px'
                onClick={() => ApprovedAmbassadorHandler(student.uuid)}>
                <Logo src={acceptIcon} width='18px' />
              </ActionWrapper>
              <ActionWrapper
                delete
                width='31px'
                onClick={() => RejectAmbassadorHandler(student.uuid)}>
                <Logo src={deleteIcon} width='16px' />
              </ActionWrapper>
            </div>
          </li>
        ))}
      </AllProspects>

      {!!students.length && (
        <Pagination
          currentPage={currentPage}
          pageDown={() => paginationHandler('down')}
          pageUp={() => paginationHandler('up')}
        />
      )}
    </Container>
  );
};

export default ProspectsPendingSearch;
