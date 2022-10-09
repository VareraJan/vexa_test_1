import React, { memo, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';
import {
  AllStudents,
  Container,
  ContentBlocks,
  HeadLists,
  IconWrapper,
  Line,
  Line2,
  Logo,
  SearchBlocks,
  SearchResult,
  SelectStatus,
  Title,
} from './ProspectsSearch.styled';
import { useFetchFirebase } from '../../../../hooks/useFetchFirebase';
import { setStudentsApprovedToUniversity } from '../../../../redux/slices/students/studentsSlice';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import {
  IStudentToUniversity,
  StudentsColUniversities,
} from '../../../../redux/slices/filter/filterSlice';
import { ResponseProps, useSearchUserFirebase } from '../../../../hooks/useSearchFirebase';
import Profile from '../../../../pages/Profile/Profile';
import Pagination from '../../Pagination';

import searchIcon from '../../../assets/img/dashboard/search-2.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import reset from '../../../assets/img/dashboard/reset.svg';
import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';
import { ImageWrapper } from '../../../../styled/dashboard';

type PopupClick = EventTarget & { className: string };

interface ProspectsSearchProps {
  totalProspects: number;
  id: string;
  setHidden: (hidden: boolean) => void;
  hiddenChildren: boolean;
}

const ProspectsSearch: React.FC<ProspectsSearchProps> = memo(
  ({ totalProspects, id, setHidden, hiddenChildren }) => {
    const [prospectsCount, setProspectsCount] = useState(totalProspects);
    const [searchStudent, setSearchStudent] = useState('');
    const [searchStudentResult, setSearchStudentResult] = useState<ResponseProps>();
    const [statusDataReject, setStatusDataReject] = useState(false);
    const { searchUserUniversityRecord } = useSearchUserFirebase();
    const [isOpenSelectStatus, setIsOpenSelectStatus] = useState({ uuid: '', isOpen: false });
    console.log('isOpenSelectStatus: ', isOpenSelectStatus);

    const [userProfileData, setUserProfileData] = useState<IStudentToUniversity | null>(null);

    const {
      students,
      currentPage,
      firstCurrentDoc,
      secondCurrentDoc,
      lastCurrentDoc,
      pageLimit,
      status,
    } = useAppSelector((state) => state.students.approvedStudents);
    const { fetchApprovedStudentsDataFirebase } = useFetchFirebase();

    const dispatch = useAppDispatch();

    const firstRender = useRef(true);
    const userStatus = statusDataReject ? 'reject' : undefined;

    const getProspectsHandler = async (universityID: string) => {
      const { List, firstVisible, secondVisible, lastVisible } =
        await fetchApprovedStudentsDataFirebase({
          universityID,
          pageLimit,
          order: 'email',
          userStatus,
        });

      dispatch(
        setStudentsApprovedToUniversity({
          students: List,
          currentPage: 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    };

    /** перезапросить данные текущей страницы */
    const getUpdateProspectsHandler = async (start: IStudentToUniversity) => {
      const { List, firstVisible, secondVisible, lastVisible } =
        await fetchApprovedStudentsDataFirebase({
          universityID: id,
          pageLimit,
          start,
          order: 'email',
          userStatus,
        });

      dispatch(
        setStudentsApprovedToUniversity({
          students: List,
          currentPage,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    };

    const searchStudentHandler = async () => {
      const response = await searchUserUniversityRecord({
        nameCollection: 'Students',
        email: searchStudent,
        universityId: id,
      });
      setSearchStudentResult(response);
    };

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStudent(event.target.value.trim());
    };

    const paginationHandler = async (action: 'up' | 'down', forcibly?: boolean) => {
      if (action === 'down') {
        if (!forcibly) {
          if (currentPage === 1) return;
          if (currentPage - 1 === 1) return getProspectsHandler(id);
        }

        const { List, firstVisible, secondVisible, lastVisible } =
          await fetchApprovedStudentsDataFirebase({
            universityID: id,
            pageLimit,
            order: 'email',
            end: firstCurrentDoc,
            userStatus,
          });

        dispatch(
          setStudentsApprovedToUniversity({
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
          await fetchApprovedStudentsDataFirebase({
            universityID: id,
            pageLimit,
            order: 'email',
            startAft: lastCurrentDoc,
            userStatus,
          });

        if (!List.length) return;

        dispatch(
          setStudentsApprovedToUniversity({
            students: List,
            currentPage: currentPage + 1,
            firstCurrentDoc: firstVisible,
            lastCurrentDoc: lastVisible,
            secondCurrentDoc: secondVisible,
          }),
        );
      }
    };

    // TODO переиспользуется в ProspectsPendingSearch, => вынести в кастомный хук
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
          if (!search) {
            if (students.length === 1) paginationHandler('down', true);
            else if (students[0].id === studentId) getUpdateProspectsHandler(secondCurrentDoc);
            else getUpdateProspectsHandler(firstCurrentDoc);
          }

          // обновить поиск
          if (search) {
            searchStudentHandler();
            getProspectsHandler(id);
          }
        } catch (error) {
          console.log('setDoc ERROR ', error);
        }
      }
    };

    // TODO взято из ProspectsPendingSerch, будет время => вынести все в хуки или родительский компонент и переписать код =======>
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
            else if (students[0].id === studentId) getUpdateProspectsHandler(secondCurrentDoc);
            else getUpdateProspectsHandler(firstCurrentDoc);
          }
          // обновить поиск
          if (search) searchStudentHandler();
        } catch (error) {
          console.log('setDoc ERROR ', error);
        }
      }
    };

    const getStudentInfo = (student: IStudentToUniversity, param: 'status' | 'invite') => {
      // TODO

      if (param === 'status') {
        return student.universities.find((el) => el.universityId === id)?.userStatus;
      }
      if (param === 'invite') return '07/11/2021 MOCK';
    };

    const statusDataRejectHandler = () => {
      setStatusDataReject((prev) => {
        firstRender.current = true;
        return !prev;
      });
    };

    /**смена статуса студента через popup */
    const setSelectHandler = (select: 'apply' | 'commit', studentId: string, search?: boolean) => {
      // if (searchStudentResult?.user?.id === studentId) search = true;
      ApprovedAmbassadorHandler(studentId, search, true, select);
      setIsOpenSelectStatus({ uuid: '', isOpen: false });
    };

    const selectHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      const _event = event.target as PopupClick;
      if (
        _event.className !== 'status' &&
        _event.className !== 'select' &&
        isOpenSelectStatus.isOpen
      ) {
        setIsOpenSelectStatus({ uuid: '', isOpen: false });
      }
    };

    useEffect(() => {
      if (userProfileData) setHidden(true);
      else setHidden(false);
    }, [userProfileData]);

    useEffect(() => {
      if (firstRender.current) {
        getProspectsHandler(id);
        firstRender.current = false;
      }
    }, [statusDataReject]);

    return (
      <Container onClick={selectHandler}>
        <div hidden={hiddenChildren}>
          <Line />
          <ContentBlocks marginBottom='20px'>
            <Title width='200px'>
              Total Prospects: {prospectsCount}
              <ImageWrapper url={reset} onClick={() => getProspectsHandler(id)} />
              <ImageWrapper
                url={statusDataReject ? delOrange : delGrey}
                onClick={statusDataRejectHandler}
              />
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

          {searchStudentResult?.user && 'photo' in searchStudentResult.user && (
            <AllStudents>
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
                {/* <div className='status'>{getStudentInfo(searchStudentResult.user, 'status')}</div> */}

                <div
                  className='status'
                  onClick={() => {
                    if (
                      !isOpenSelectStatus.isOpen &&
                      searchStudentResult.user &&
                      'uuid' in searchStudentResult.user
                    )
                      setIsOpenSelectStatus({ uuid: searchStudentResult.user.uuid, isOpen: true });
                  }}>
                  {isOpenSelectStatus.uuid === searchStudentResult.user.uuid ? (
                    <SelectStatus>
                      {getStudentInfo(searchStudentResult.user, 'status') === 'reject' ? (
                        <>
                          <div
                            className='select'
                            onClick={() => {
                              if (searchStudentResult.user && 'uuid' in searchStudentResult.user)
                                setSelectHandler('apply', searchStudentResult.user.uuid, true);
                            }}>
                            apply
                          </div>
                          <div
                            className='select'
                            onClick={() => {
                              if (searchStudentResult.user && 'uuid' in searchStudentResult.user)
                                setSelectHandler('commit', searchStudentResult.user.uuid, true);
                            }}>
                            commit
                          </div>
                        </>
                      ) : getStudentInfo(searchStudentResult.user, 'status') === 'apply' ? (
                        <div
                          className='select'
                          onClick={() => {
                            if (searchStudentResult.user && 'uuid' in searchStudentResult.user)
                              setSelectHandler('commit', searchStudentResult.user.uuid, true);
                          }}>
                          commit
                        </div>
                      ) : (
                        <div
                          className='select'
                          onClick={() => {
                            if (searchStudentResult.user && 'uuid' in searchStudentResult.user)
                              setSelectHandler('apply', searchStudentResult.user.uuid, true);
                          }}>
                          apply
                        </div>
                      )}
                    </SelectStatus>
                  ) : (
                    getStudentInfo(searchStudentResult.user, 'status')
                  )}
                </div>
                <div
                  className='delete'
                  onClick={() => {
                    if (searchStudentResult?.user && 'uuid' in searchStudentResult.user)
                      deleteStudentFromUniversity(searchStudentResult.user.uuid, true);
                  }}></div>
              </li>
            </AllStudents>
          )}

          <HeadLists>
            <div className='name'>
              Name <Logo src={vectorDown} width='16px' />
            </div>
            <div className='invitedDate'>Invited Date</div>
            <div className='email'>Email</div>
            <div className='country'>Country</div>
            <div className='status'>Status</div>
            <div className='delete'></div>
          </HeadLists>
          <Line2 />
          <AllStudents>
            {students.map((student, ind) => (
              <li key={student.id}>
                <div className='name'>
                  <IconWrapper width='50px' borderRadius='25px' url={student.photo}></IconWrapper>
                  <Title
                    pointer
                    width='130px'
                    onClick={() =>
                      setUserProfileData(students[ind])
                    }>{`${student.name} ${student.soname}`}</Title>
                </div>
                {/* // TODO inviteDate заглушка, если не удастся решить откуда брать данные, заменить на что-то другое */}
                <div className='invitedDate'>{getStudentInfo(student, 'invite')}</div>
                <div className='email'>{student.email}</div>
                <div className='country'>{student.country}</div>
                <div
                  className='status'
                  onClick={() => {
                    if (!isOpenSelectStatus.isOpen)
                      setIsOpenSelectStatus({ uuid: student.uuid, isOpen: true });
                  }}>
                  {isOpenSelectStatus.uuid === student.uuid ? (
                    <SelectStatus>
                      {getStudentInfo(student, 'status') === 'reject' ? (
                        <>
                          <div
                            className='select'
                            onClick={() => setSelectHandler('apply', student.uuid)}>
                            apply
                          </div>
                          <div
                            className='select'
                            onClick={() => setSelectHandler('commit', student.uuid)}>
                            commit
                          </div>
                        </>
                      ) : getStudentInfo(student, 'status') === 'apply' ? (
                        <div
                          className='select'
                          onClick={() => setSelectHandler('commit', student.uuid)}>
                          commit
                        </div>
                      ) : (
                        <div
                          className='select'
                          onClick={() => setSelectHandler('apply', student.uuid)}>
                          apply
                        </div>
                      )}
                    </SelectStatus>
                  ) : (
                    getStudentInfo(student, 'status')
                  )}
                </div>
                {getStudentInfo(student, 'status') !== 'reject' && (
                  <div
                    className='delete'
                    onClick={() => deleteStudentFromUniversity(student.uuid)}></div>
                )}
              </li>
            ))}
          </AllStudents>

          {!!students.length && (
            <Pagination
              currentPage={currentPage}
              pageDown={() => paginationHandler('down')}
              pageUp={() => paginationHandler('up')}
            />
          )}
        </div>

        {userProfileData && (
          <Profile user='student' closedFunc={setUserProfileData} userData={userProfileData} />
        )}
      </Container>
    );
  },
);

export default ProspectsSearch;
