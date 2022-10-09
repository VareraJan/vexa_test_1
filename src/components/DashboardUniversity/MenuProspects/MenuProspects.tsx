import React, { memo, Suspense, useEffect, useRef, useState } from 'react';
import Profile from '../../../pages/Profile/Profile';
import { Container, ContentBlocks, ImageWrapper, Line } from '../../../styled/dashboard';
import Pagination from '../Pagination';
import {
  ActionWrapper,
  AllProspects,
  AllStudents,
  Btn,
  BtnGroup,
  HeadLists,
  HeadListsProspectsPending,
  IconWrapper,
  Line2,
  Line2a,
  Line3,
  Logo,
  SearchBlocks,
  SearchResult,
  SelectStatus,
  Title,
  Title1,
} from './MenuProspects.styled';

import { ResponseProps, useSearchUserFirebase } from '../../../hooks/useSearchFirebase';
import {
  IStudentToUniversity,
  StudentsColUniversities,
} from '../../../redux/slices/filter/filterSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useFetchFirebase } from '../../../hooks/useFetchFirebase';
import {
  setStudentsApprovedToUniversity,
  setStudentsPendingToUniversity,
} from '../../../redux/slices/students/studentsSlice';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import SubMenuAdd from '../SubMenuAdd';
import CreateAccount from '../CreateAccount';

import searchIcon from '../../../assets/img/dashboard/search-2.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import reset from '../../../assets/img/dashboard/reset.svg';
import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';
import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';
import deleteIcon from '../../../assets/img/dashboard/apprVideoReject.svg';
import { ProfileAsync } from '../../../pages/Profile/Profile.async';

type PopupClick = EventTarget & { className: string };

interface MenuProspectsProps {
  totalProspects: number;
  id: string;
  setHidden: (hidden: boolean) => void;
  hiddenChildren: boolean;
}

interface PaginationHandlerProps {
  action: 'up' | 'down';
  where: 'approved' | 'pending';
  forcibly?: boolean;
}

// TODO: будет время  - вынести логику в хуки; списки и элемент li  в отдельные компоненты для отрисовки
const MenuProspects: React.FC<MenuProspectsProps> = memo(
  ({ id, totalProspects, hiddenChildren, setHidden }) => {
    const [searchStudentPending, setSearchStudentPending] = useState('');
    const [searchStudentPendingResult, setSearchStudentPendingResult] = useState<ResponseProps>();
    const [addStudentBtnActive, setAddStudentBtnActive] = useState(false);

    const [prospectsCount, setProspectsCount] = useState(totalProspects);
    const [searchStudent, setSearchStudent] = useState('');
    const [searchStudentResult, setSearchStudentResult] = useState<ResponseProps>();
    const [statusDataReject, setStatusDataReject] = useState(false);
    const { searchUserUniversityRecord } = useSearchUserFirebase();
    const [isOpenSelectStatus, setIsOpenSelectStatus] = useState({ uuid: '', isOpen: false });

    const [userProfileData, setUserProfileData] = useState<IStudentToUniversity | null>(null);

    const {
      students: studentsPending,
      currentPage: currentPagePending,
      pageLimit: pageLimitPending,
      firstCurrentDoc: firstCurrentDocPending,
      secondCurrentDoc: secondCurrentDocPending,
      lastCurrentDoc: lastCurrentDocPending,
      status: statusPending,
    } = useAppSelector((state) => state.students.pendingStudents);

    const {
      students,
      currentPage,
      firstCurrentDoc,
      secondCurrentDoc,
      lastCurrentDoc,
      pageLimit,
      status,
    } = useAppSelector((state) => state.students.approvedStudents);

    const { fetchPendingStudentsDataFirebase } = useFetchFirebase();
    const { fetchApprovedStudentsDataFirebase } = useFetchFirebase();
    const { searchUserRecord } = useSearchUserFirebase();

    const dispatch = useAppDispatch();

    const firstRender = useRef(true);
    const userStatus = statusDataReject ? 'reject' : undefined;

    // TODO: newRequests заменить на запрос
    const newRequests = 1;

    /** запросить данные  Prospects для университета */
    const getProspectsHandler = async (universityID: string, where: 'pending' | 'approved') => {
      const quest =
        where === 'pending' ? fetchPendingStudentsDataFirebase : fetchApprovedStudentsDataFirebase;
      const slice =
        where === 'pending' ? setStudentsPendingToUniversity : setStudentsApprovedToUniversity;
      const pageLimitOpt = where === 'pending' ? pageLimitPending : pageLimit;

      const { List, firstVisible, secondVisible, lastVisible } = await quest({
        universityID,
        pageLimit: pageLimitOpt,
        order: 'email',
        userStatus: where === 'pending' ? undefined : userStatus,
      });
      dispatch(
        slice({
          students: List,
          currentPage: 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    };

    /** перезапросить данные списка Prospects/ProspectsPending */
    const getUpdateProspectsDefaultHandler = async (
      start: IStudentToUniversity,
      where: 'pending' | 'approved',
    ) => {
      const quest =
        where === 'pending' ? fetchPendingStudentsDataFirebase : fetchApprovedStudentsDataFirebase;
      const slice =
        where === 'pending' ? setStudentsPendingToUniversity : setStudentsApprovedToUniversity;

      const { List, firstVisible, secondVisible, lastVisible } = await quest({
        universityID: id,
        pageLimit: where === 'pending' ? pageLimitPending : pageLimit,
        start,
        order: 'email',
        userStatus: where === 'pending' ? undefined : userStatus,
      });

      dispatch(
        slice({
          students: List,
          currentPage: where === 'pending' ? currentPagePending : currentPage,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    };

    const searchStudentDefaultHandler = async (search: 'all' | 'forUniversity') => {
      const quest = search === 'all' ? searchUserRecord : searchUserUniversityRecord;

      const email = search === 'all' ? searchStudentPending : searchStudent;

      const response = await quest({
        nameCollection: 'Students',
        email,
        universityId: id,
      });
      search === 'all' ? setSearchStudentPendingResult(response) : setSearchStudentResult(response);
    };

    const inputProspectsPendingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStudentPending(event.target.value.trim());
    };
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchStudent(event.target.value.trim());
    };

    const paginationHandler = async ({ action, where, forcibly }: PaginationHandlerProps) => {
      const quest =
        where === 'pending' ? fetchPendingStudentsDataFirebase : fetchApprovedStudentsDataFirebase;
      const slice =
        where === 'pending' ? setStudentsPendingToUniversity : setStudentsApprovedToUniversity;

      if (action === 'down') {
        if (!forcibly && where === 'approved') {
          if (currentPage === 1) return;
          if (currentPage - 1 === 1) return getProspectsHandler(id, 'approved');
        }
        if (!forcibly && where === 'pending') {
          if (currentPagePending === 1) return;
          if (currentPagePending - 1 === 1) return getProspectsHandler(id, 'pending');
        }

        const { List, firstVisible, secondVisible, lastVisible } = await quest({
          universityID: id,
          pageLimit: where === 'pending' ? pageLimitPending : pageLimit,
          end: where === 'pending' ? firstCurrentDocPending : firstCurrentDoc,
          order: 'email',
          userStatus: where === 'pending' ? undefined : userStatus,
        });

        dispatch(
          slice({
            students: List,
            currentPage: where === 'approved' ? currentPage - 1 : currentPagePending - 1,
            firstCurrentDoc: firstVisible,
            lastCurrentDoc: lastVisible,
            secondCurrentDoc: secondVisible,
          }),
        );
      }

      if (
        (action === 'up' && students.length === pageLimit) ||
        (action === 'up' && studentsPending.length === pageLimitPending)
      ) {
        const { List, firstVisible, secondVisible, lastVisible } = await quest({
          universityID: id,
          pageLimit: where === 'pending' ? pageLimitPending : pageLimit,
          startAft: where === 'pending' ? lastCurrentDocPending : lastCurrentDoc,
          order: 'email',
          userStatus: where === 'pending' ? undefined : userStatus,
        });

        if (!List.length) return;

        dispatch(
          slice({
            students: List,
            currentPage: where === 'approved' ? currentPage + 1 : currentPagePending + 1,
            firstCurrentDoc: firstVisible,
            lastCurrentDoc: lastVisible,
            secondCurrentDoc: secondVisible,
          }),
        );
      }
    };

    /** верхний поисковик  и список pendingProspects  */
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
          if (studentsPending.length === 1)
            paginationHandler({ action: 'down', where: 'pending', forcibly: true });
          // if (studentsPending.length === 1) paginationProspectsPendingHandler('down', true);
          else if (studentsPending[0].id === studentId)
            getUpdateProspectsDefaultHandler(secondCurrentDocPending, 'pending');
          else getUpdateProspectsDefaultHandler(firstCurrentDocPending, 'pending');
          // обновить поиск
          if (search) searchStudentDefaultHandler('all');
        } catch (error) {
          console.log('setDoc ERROR ', error);
        }
      }
    };

    /** нижний список approvedProspects и поисковик, верхний поисковик когда пользователь со статусом 'apply' || 'commit'  */
    const deleteStudentFromUniversity = async (studentId: string, emailSearch?: string) => {
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
          if (!emailSearch) {
            if (students.length === 1)
              paginationHandler({ action: 'down', where: 'approved', forcibly: true });
            else if (students[0].id === studentId)
              getUpdateProspectsDefaultHandler(secondCurrentDoc, 'approved');
            else getUpdateProspectsDefaultHandler(firstCurrentDoc, 'approved');
          }

          // обновить поиск
          if (emailSearch) getProspectsHandler(id, 'approved');
          if (emailSearch === searchStudent) searchStudentDefaultHandler('all');
          if (emailSearch === searchStudentPending) searchStudentDefaultHandler('forUniversity');
        } catch (error) {
          console.log('setDoc ERROR ', error);
        }
      }
    };

    const ApprovedProspectsDefaultHandler = async (
      studentId: string,
      downPage: boolean = true,
      newStatus?: 'apply' | 'commit',
      search?: boolean,
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

          // перезапросить список  pendingProspects
          if (downPage) {
            if (studentsPending.length === 1)
              paginationHandler({ action: 'down', where: 'pending', forcibly: true });
            else if (studentsPending[0]?.id === studentId)
              getUpdateProspectsDefaultHandler(secondCurrentDocPending, 'pending');
            else getUpdateProspectsDefaultHandler(firstCurrentDocPending, 'pending');
          }

          // перезапросить список approvedProspects
          if (downPage) {
            if (students.length === 1)
              paginationHandler({ action: 'down', where: 'approved', forcibly: true });
            else if (students[0]?.id === studentId)
              getUpdateProspectsDefaultHandler(secondCurrentDoc, 'approved');
            else getUpdateProspectsDefaultHandler(firstCurrentDoc, 'approved');
          }

          if (search) getProspectsHandler(id, 'approved');
          // обновить поиск
          if (
            searchStudentResult &&
            searchStudentResult.user &&
            'uuid' in searchStudentResult.user &&
            studentId === searchStudentResult.user.uuid
          )
            searchStudentDefaultHandler('forUniversity');
          if (
            searchStudentPendingResult &&
            searchStudentPendingResult.user &&
            'uuid' in searchStudentPendingResult.user &&
            studentId === searchStudentPendingResult.user.uuid
          )
            searchStudentDefaultHandler('all');
        } catch (error) {
          console.log('setDoc ERROR ', error);
        }
      }
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

    const statusDataRejectHandler = () => {
      setStatusDataReject((prev) => {
        firstRender.current = true;
        return !prev;
      });
    };

    /**смена статуса студента через popup */
    const setSelectHandler = async (
      select: 'apply' | 'commit',
      studentId: string,
      search?: boolean,
    ) => {
      await ApprovedProspectsDefaultHandler(studentId, true, select, search);
      setIsOpenSelectStatus({ uuid: '', isOpen: false });
      if (
        searchStudentPendingResult?.user &&
        'uuid' in searchStudentPendingResult.user &&
        studentId === searchStudentPendingResult?.user?.uuid
      ) {
        searchStudentDefaultHandler('all');
      }
      if (
        searchStudentResult?.user &&
        'uuid' in searchStudentResult.user &&
        studentId === searchStudentResult?.user?.uuid
      ) {
        searchStudentDefaultHandler('forUniversity');
      }
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
        getProspectsHandler(id, 'approved');
        firstRender.current = false;
      }
    }, [statusDataReject]);

    useEffect(() => {
      getProspectsHandler(id, 'pending');
    }, []);

    return (
      <>
        {/* ProspectsPendingSearch */}
        <Container hidden={hiddenChildren}>
          <Line3 />
          <SubMenuAdd
            title='Add Student'
            isActive={addStudentBtnActive}
            setIsActive={setAddStudentBtnActive}
          />
          {addStudentBtnActive && (
            <CreateAccount role='student' universityId={id} setIsActive={setAddStudentBtnActive} />
          )}

          <ContentBlocks marginTop='35px'>
            <Title1>
              New Requests: {newRequests}
              <ImageWrapper url={reset} onClick={() => getProspectsHandler(id, 'pending')} />
            </Title1>

            {searchStudentPendingResult?.message && (
              <SearchResult color={searchStudentPendingResult.user ? '#02B0BB' : 'tomato'}>
                {searchStudentPendingResult.message}
              </SearchResult>
            )}

            <SearchBlocks>
              <input
                onChange={inputProspectsPendingHandler}
                value={searchStudentPending}
                placeholder='Enter Email Here'
              />
              <Logo
                src={searchIcon}
                width='24px'
                onClick={() => searchStudentDefaultHandler('all')}
                pointer
              />
            </SearchBlocks>
          </ContentBlocks>

          <BtnGroup>
            {searchStudentPendingResult?.user && searchStudentPendingResult.status === '' && (
              <>
                <Btn
                  onClick={() => {
                    if (
                      searchStudentPendingResult.user &&
                      'uuid' in searchStudentPendingResult.user
                    )
                      ApprovedProspectsDefaultHandler(
                        searchStudentPendingResult.user.uuid,
                        false,
                        'apply',
                      );
                  }}>
                  Application
                </Btn>
                <Btn
                  marginLeft='10px'
                  onClick={() => {
                    if (
                      searchStudentPendingResult.user &&
                      'uuid' in searchStudentPendingResult.user
                    )
                      ApprovedProspectsDefaultHandler(
                        searchStudentPendingResult.user.uuid,
                        false,
                        'commit',
                      );
                  }}>
                  Committed
                </Btn>
              </>
            )}
          </BtnGroup>

          {searchStudentPendingResult?.user &&
            'photo' in searchStudentPendingResult.user &&
            (searchStudentPendingResult.status === 'expected apply' ||
              searchStudentPendingResult.status === 'expected commit') && (
              <AllProspects height='0' marginBottom='20px'>
                <li key={searchStudentPendingResult.user.uuid}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={searchStudentPendingResult.user.photo}></IconWrapper>
                    {/* // todo tooltip for Title */}
                    <Title1
                      // mrl='23px'
                      list
                      width='117px'>{`${searchStudentPendingResult.user.name} ${searchStudentPendingResult.user.soname}`}</Title1>
                  </div>
                  <div className='email'>{searchStudentPendingResult.user.email}</div>
                  <div className='status'>{getExpectedStatus(searchStudentPendingResult.user)}</div>
                  <div className='icon-block'>
                    <ActionWrapper
                      acceptr
                      width='31px'
                      onClick={() => {
                        if (
                          searchStudentPendingResult?.user &&
                          'uuid' in searchStudentPendingResult.user
                        )
                          // ApprovedProspectsPendingHandler(
                          //   searchStudentPendingResult.user.uuid,
                          //   true,
                          // );
                          ApprovedProspectsDefaultHandler(searchStudentPendingResult.user.uuid);
                      }}>
                      <Logo src={acceptIcon} width='18px' />
                    </ActionWrapper>
                    <ActionWrapper
                      delete
                      width='31px'
                      onClick={() => {
                        if (
                          searchStudentPendingResult?.user &&
                          'uuid' in searchStudentPendingResult.user
                        )
                          RejectAmbassadorHandler(searchStudentPendingResult.user.uuid, true);
                      }}>
                      <Logo src={deleteIcon} width='16px' />
                    </ActionWrapper>
                  </div>
                </li>
              </AllProspects>
            )}

          {searchStudentPendingResult?.user &&
            'photo' in searchStudentPendingResult.user &&
            (searchStudentPendingResult.status === 'apply' ||
              searchStudentPendingResult.status === 'commit' ||
              searchStudentPendingResult.status === 'reject') && (
              <AllStudents>
                <li key={searchStudentPendingResult.user.id}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={searchStudentPendingResult.user.photo}></IconWrapper>
                    <Title width='130px'>{`${searchStudentPendingResult.user.name} ${searchStudentPendingResult.user.soname}`}</Title>
                  </div>
                  {/*  TODO inviteDate заглушка, если не удастся решить откуда брать данные, заменить на что-то другое */}
                  <div className='invitedDate'>
                    {getStudentInfo(searchStudentPendingResult.user, 'invite')}
                  </div>
                  <div className='email'>{searchStudentPendingResult.user.email}</div>
                  <div className='country'>{searchStudentPendingResult.user.country}</div>
                  {/* <div className='status'>{getStudentInfo(searchStudentResult.user, 'status')}</div> */}

                  <div
                    className='status'
                    onClick={() => {
                      if (
                        !isOpenSelectStatus.isOpen &&
                        searchStudentPendingResult.user &&
                        'uuid' in searchStudentPendingResult.user
                      )
                        setIsOpenSelectStatus({
                          uuid: searchStudentPendingResult.user.uuid,
                          isOpen: true,
                        });
                    }}>
                    {isOpenSelectStatus.uuid === searchStudentPendingResult.user.uuid ? (
                      <SelectStatus>
                        {getStudentInfo(searchStudentPendingResult.user, 'status') === 'reject' ? (
                          <>
                            <div
                              className='select'
                              onClick={() => {
                                if (
                                  searchStudentPendingResult.user &&
                                  'uuid' in searchStudentPendingResult.user
                                )
                                  setSelectHandler(
                                    'apply',
                                    searchStudentPendingResult.user.uuid,
                                    true,
                                  );
                              }}>
                              apply
                            </div>
                            <div
                              className='select'
                              onClick={() => {
                                if (
                                  searchStudentPendingResult.user &&
                                  'uuid' in searchStudentPendingResult.user
                                )
                                  setSelectHandler(
                                    'commit',
                                    searchStudentPendingResult.user.uuid,
                                    true,
                                  );
                              }}>
                              commit
                            </div>
                          </>
                        ) : getStudentInfo(searchStudentPendingResult.user, 'status') ===
                          'apply' ? (
                          <div
                            className='select'
                            onClick={() => {
                              if (
                                searchStudentPendingResult.user &&
                                'uuid' in searchStudentPendingResult.user
                              )
                                setSelectHandler(
                                  'commit',
                                  searchStudentPendingResult.user.uuid,
                                  true,
                                );
                            }}>
                            commit
                          </div>
                        ) : (
                          <div
                            className='select'
                            onClick={() => {
                              if (
                                searchStudentPendingResult.user &&
                                'uuid' in searchStudentPendingResult.user
                              )
                                setSelectHandler(
                                  'apply',
                                  searchStudentPendingResult.user.uuid,
                                  true,
                                );
                            }}>
                            apply
                          </div>
                        )}
                      </SelectStatus>
                    ) : (
                      getStudentInfo(searchStudentPendingResult.user, 'status')
                    )}
                  </div>
                  <div
                    className='delete'
                    onClick={() => {
                      if (
                        searchStudentPendingResult?.user &&
                        'uuid' in searchStudentPendingResult.user
                      )
                        deleteStudentFromUniversity(
                          searchStudentPendingResult.user.uuid,
                          searchStudentPending,
                        );
                    }}></div>
                </li>
              </AllStudents>
            )}

          <HeadListsProspectsPending>
            <div className='name'>
              Name <Logo src={vectorDown} width='16px' />
            </div>
            <div className='email'>Email</div>
            <div className='status'>Status</div>
            <div className='icon-block'></div>
          </HeadListsProspectsPending>
          <Line2a />
          <AllProspects>
            {studentsPending.map((student) => (
              <li key={student.uuid}>
                <div className='name'>
                  <IconWrapper width='50px' borderRadius='25px' url={student.photo}></IconWrapper>
                  {/* // todo tooltip for Title */}
                  <Title1
                    // mrl='23px'
                    list
                    width='117px'>{`${student.name} ${student.soname}`}</Title1>
                </div>
                <div className='email'>{student.email}</div>
                <div className='status'>{getExpectedStatus(student)}</div>
                <div className='icon-block'>
                  <ActionWrapper
                    acceptr
                    width='31px'
                    onClick={() => ApprovedProspectsDefaultHandler(student.uuid)}>
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

          {!!studentsPending.length && (
            <Pagination
              currentPage={currentPagePending}
              pageDown={() => paginationHandler({ action: 'down', where: 'pending' })}
              pageUp={() => paginationHandler({ action: 'up', where: 'pending' })}
            />
          )}
        </Container>

        {/* pendingProspects <<<=== waterline ===>>> approvedProspects  */}

        <Container onClick={selectHandler}>
          <div hidden={hiddenChildren}>
            <Line />
            <ContentBlocks marginBottom='20px'>
              <Title width='200px'>
                Total Prospects: {prospectsCount}
                <ImageWrapper url={reset} onClick={() => getProspectsHandler(id, 'approved')} />
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
                <input
                  onChange={inputHandler}
                  value={searchStudent}
                  placeholder='Enter Email Here'
                />
                <Logo
                  src={searchIcon}
                  width='24px'
                  onClick={() => searchStudentDefaultHandler('forUniversity')}
                  pointer
                />
              </SearchBlocks>
            </ContentBlocks>

            {searchStudentResult?.user && 'photo' in searchStudentResult.user && (
              <AllStudents>
                <li key={searchStudentResult.user.uuid}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={searchStudentResult.user.photo}></IconWrapper>
                    <Title width='130px'>{`${searchStudentResult.user.name} ${searchStudentResult.user.soname}`}</Title>
                  </div>
                  {/*  TODO inviteDate заглушка, если не удастся решить откуда брать данные, заменить на что-то другое */}
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
                        setIsOpenSelectStatus({
                          uuid: searchStudentResult.user.uuid,
                          isOpen: true,
                        });
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
                        deleteStudentFromUniversity(searchStudentResult.user.uuid, searchStudent);
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
                <li key={student.uuid}>
                  <div className='name'>
                    <IconWrapper width='50px' borderRadius='25px' url={student.photo}></IconWrapper>
                    <Title
                      pointer
                      width='130px'
                      onClick={() =>
                        setUserProfileData(students[ind])
                      }>{`${student.name} ${student.soname}`}</Title>
                  </div>
                  {/*  TODO inviteDate заглушка, если не удастся решить откуда брать данные, заменить на что-то другое */}
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
                pageDown={() => paginationHandler({ action: 'down', where: 'approved' })}
                pageUp={() => paginationHandler({ action: 'up', where: 'approved' })}
              />
            )}
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            {userProfileData && (
              <ProfileAsync
                user='student'
                closedFunc={setUserProfileData}
                userData={userProfileData}
              />
            )}
          </Suspense>
        </Container>
      </>
    );
  },
);

export default MenuProspects;
