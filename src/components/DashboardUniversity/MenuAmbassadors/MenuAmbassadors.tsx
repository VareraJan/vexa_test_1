import React, { memo, useEffect, useRef, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { DateToString } from '../../../hooks/useDateToString';
import { useFetchFirebase } from '../../../hooks/useFetchFirebase';
import { ResponseProps, useSearchUserFirebase } from '../../../hooks/useSearchFirebase';
import Profile from '../../../pages/Profile/Profile';
import {
  IAmbassadorsToUniversity,
  setAmbassadorsApprovedToUniversity,
  setAmbassadorsPendingToUniversity,
} from '../../../redux/slices/ambassadors/ambassadorsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import {
  ActionWrapper,
  Container,
  ContentBlocks,
  ImageWrapper,
  Line,
  Logo,
} from '../../../styled/dashboard';
import Pagination from '../Pagination';
import {
  AllAmbassadors,
  AllAmbassadorsPending,
  Btn,
  HeadLists,
  HeadListsPending,
  IconWrapper,
  Line2,
  SearchBlocks,
  SearchResult,
  Title,
} from './MenuAmbassadors.styled';

import searchIcon from '../../../assets/img/dashboard/search-2.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import reset from '../../../assets/img/dashboard/reset.svg';
import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';
import deleteIcon from '../../../assets/img/dashboard/apprVideoReject.svg';
import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';
import SubMenuAdd from '../SubMenuAdd';
import CreateAccount from '../CreateAccount';

interface MenuAmbassadorsProps {
  totalAmbassadors: number;
  id: string;
  universityName: string;
  setHidden: (hidden: boolean) => void;
  hiddenChildren: boolean;
}

interface PaginationHandlerProps {
  action: 'up' | 'down';
  where: 'approved' | 'pending';
  forcibly?: boolean;
}
// TODO: будет время - вынести логику в хуки; списки и элемент li  в отдельные компоненты для отрисовки
const MenuAmbassadors: React.FC<MenuAmbassadorsProps> = memo(
  ({ id, universityName, totalAmbassadors, hiddenChildren, setHidden }) => {
    const [searchAmbassadorPending, setSearchAmbassadorPending] = useState('');
    const [searchAmbassadorPendingResult, setSearchAmbassadorPendingResult] =
      useState<ResponseProps>();
    const [addAmbassadorBtnActive, setAddAmbassadorBtnActive] = useState(false);

    const [ambassadorsCount, setAmbassadorsCount] = useState(totalAmbassadors);
    const [searchAmbassador, setSearchAmbassador] = useState('');
    const [searchAmbassadorResult, setSearchAmbassadorResult] = useState<ResponseProps>();
    const [statusDataReject, setStatusDataReject] = useState(false);
    const [userProfileData, setUserProfileData] = useState<IAmbassadorsToUniversity | null>(null);

    const { fetchDataFirebase } = useFetchFirebase();
    const { searchUserRecord } = useSearchUserFirebase();
    const { searchUserUniversityRecord } = useSearchUserFirebase();

    const {
      ambassadors: ambassadorsPending,
      currentPage: currentPagePending,
      pageLimit: pageLimitApproved,
      firstCurrentDoc: firstCurrentDocApproved,
      secondCurrentDoc: secondCurrentDocApproved,
      lastCurrentDoc: lastCurrentDocApproved,
      status: statusApproved,
    } = useAppSelector((state) => state.ambassadors.pendingAmbassadors);

    const {
      ambassadors,
      currentPage,
      pageLimit,
      firstCurrentDoc,
      secondCurrentDoc,
      lastCurrentDoc,
      status,
    } = useAppSelector((state) => state.ambassadors.approvedAmbassadors);

    const dispatch = useAppDispatch();

    // TODO: newRequests заменить на запрос
    const newRequests = 0;

    const firstRender = useRef(true);
    const queryStatus = statusDataReject ? 'reject' : 'approved';

    /** запросить данные списка */
    const getAmbassadorsHandler = async (universityID: string, where: 'pending' | 'approved') => {
      const queryStatusOpt = where === 'pending' ? 'pending' : queryStatus;
      const pageLimitOpt = where === 'pending' ? pageLimitApproved : pageLimit;
      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID,
        nameCollection: 'Ambassadors',
        queryStatus: queryStatusOpt,
        pageLimit: pageLimitOpt,
      });

      const slice =
        where === 'pending'
          ? setAmbassadorsPendingToUniversity
          : setAmbassadorsApprovedToUniversity;
      dispatch(
        slice({
          ambassadors: List,
          currentPage: 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    };

    /** перезапросить данные списка */
    const getUpdateAmbassadorsHandler = async (
      start: IAmbassadorsToUniversity,
      where: 'pending' | 'approved',
    ) => {
      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID: id,
        nameCollection: 'Ambassadors',
        queryStatus: where === 'pending' ? 'pending' : queryStatus,
        pageLimit: where === 'pending' ? pageLimitApproved : pageLimit,
        start,
      });

      const slice =
        where === 'pending'
          ? setAmbassadorsPendingToUniversity
          : setAmbassadorsApprovedToUniversity;
      dispatch(
        slice({
          ambassadors: List,
          currentPage: where === 'pending' ? currentPagePending : currentPage,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    };

    const paginationHandler = async ({ action, where, forcibly }: PaginationHandlerProps) => {
      if (action === 'down') {
        if (!forcibly && where === 'approved') {
          if (currentPage === 1) return;
          if (currentPage - 1 === 1) return getAmbassadorsHandler(id, 'approved');
        }
        if (!forcibly && where === 'pending') {
          if (currentPagePending === 1) return;
          if (currentPagePending - 1 === 1) return getAmbassadorsHandler(id, 'pending');
        }

        const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
          universityID: id,
          nameCollection: 'Ambassadors',
          queryStatus: where === 'pending' ? 'pending' : queryStatus,
          pageLimit: where === 'pending' ? pageLimitApproved : pageLimit,
          end: where === 'pending' ? firstCurrentDocApproved : firstCurrentDoc,
        });

        const slice =
          where === 'pending'
            ? setAmbassadorsPendingToUniversity
            : setAmbassadorsApprovedToUniversity;

        dispatch(
          slice({
            ambassadors: List,
            currentPage: where === 'approved' ? currentPage - 1 : currentPagePending - 1,
            firstCurrentDoc: firstVisible,
            lastCurrentDoc: lastVisible,
            secondCurrentDoc: secondVisible,
          }),
        );
      }

      if (
        (action === 'up' && ambassadors.length === pageLimit) ||
        (action === 'up' && ambassadorsPending.length === pageLimitApproved)
      ) {
        const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
          universityID: id,
          nameCollection: 'Ambassadors',
          queryStatus: where === 'pending' ? 'pending' : queryStatus,
          pageLimit: where === 'pending' ? pageLimitApproved : pageLimit,
          startAft: where === 'pending' ? lastCurrentDocApproved : lastCurrentDoc,
        });

        if (!List.length) return;

        const slice =
          where === 'pending'
            ? setAmbassadorsPendingToUniversity
            : setAmbassadorsApprovedToUniversity;

        dispatch(
          slice({
            ambassadors: List,
            currentPage: where === 'approved' ? currentPage + 1 : currentPagePending + 1,
            firstCurrentDoc: firstVisible,
            lastCurrentDoc: lastVisible,
            secondCurrentDoc: secondVisible,
          }),
        );
      }
    };

    /** верхний поисковик и список когда статус pending */
    const RejectAmbassadorHandler = async (ambassadorId: string, search?: boolean) => {
      const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
      try {
        await setDoc(ambassador, { status: 'reject' }, { merge: true });

        // перезапросить страницу
        if (ambassadorsPending.length === 1)
          paginationHandler({ action: 'down', where: 'pending', forcibly: true });
        else if (ambassadorsPending[0].id === ambassadorId)
          getUpdateAmbassadorsHandler(secondCurrentDocApproved, 'pending');
        else getUpdateAmbassadorsHandler(firstCurrentDocApproved, 'pending');
        // обновить  список approvedAmbassadors
        getAmbassadorsHandler(id, 'approved');
        // обновить поиск
        if (search) searchAmbassadorPendingHandler();
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    };

    /** нижний поисковик и список approvedAmbassadors если статус не reject (status = 'apply' || 'commit') */
    const deleteAmbassadorFromUniversity = async (ambassadorId: string, emailSearch?: string) => {
      const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
      try {
        await setDoc(ambassador, { status: 'reject' }, { merge: true });

        // перезапросить страницу
        if (!emailSearch) {
          if (ambassadors.length === 1)
            paginationHandler({ action: 'down', where: 'approved', forcibly: true });
          else if (ambassadors[0].id === ambassadorId)
            getUpdateAmbassadorsHandler(secondCurrentDoc, 'approved');
          else getUpdateAmbassadorsHandler(firstCurrentDoc, 'approved');
        }

        // обновить поиск
        if (emailSearch) getAmbassadorsHandler(id, 'approved');
        if (emailSearch === searchAmbassador) searchAmbassadorHandler();
        if (emailSearch === searchAmbassadorPending) searchAmbassadorPendingHandler();
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    };

    // TODO перенести функционал в ApprovedAmbassadorPendingHandler(обновление списка и поиска правильно выстроить) =======>
    /** нижний поиск и список approvedVideos */
    const ApprovedAmbassadorHandler = async (ambassadorId: string, search?: boolean) => {
      const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
      try {
        await setDoc(ambassador, { status: 'approved' }, { merge: true });
        // перезапросить approvedVideos
        if (!search) {
          if (ambassadors.length === 1)
            paginationHandler({ action: 'down', where: 'approved', forcibly: true });
          else if (ambassadors[0].id === ambassadorId)
            getUpdateAmbassadorsHandler(secondCurrentDoc, 'approved');
          else getUpdateAmbassadorsHandler(firstCurrentDoc, 'approved');
        }
        // обновить поиск
        if (search) {
          searchAmbassadorHandler();
          getAmbassadorsHandler(id, 'approved');
        }
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    };

    // TODO  =======> ApprovedAmbassadorHandler
    /** верхний поиск и список pendingAmbassadors */
    const ApprovedAmbassadorPendingHandler = async (
      ambassadorId: string,
      emailSearch?: string,
      downPage: boolean = true,
    ) => {
      const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
      try {
        await setDoc(ambassador, { status: 'approved' }, { merge: true });
        // перезапросить если статус pending
        if (downPage) {
          if (ambassadorsPending.length === 1)
            paginationHandler({ action: 'down', where: 'pending', forcibly: true });
          else if (ambassadorsPending[0].id === ambassadorId)
            getUpdateAmbassadorsHandler(secondCurrentDocApproved, 'pending');
          else getUpdateAmbassadorsHandler(firstCurrentDocApproved, 'pending');
          getAmbassadorsHandler(id, 'approved');
        }

        // обновить поиск
        if (emailSearch) getAmbassadorsHandler(id, 'approved');
        if (emailSearch === searchAmbassador) searchAmbassadorHandler();
        if (emailSearch === searchAmbassadorPending) searchAmbassadorPendingHandler();
      } catch (error) {
        console.log('setDoc ERROR ', error);
      }
    };

    const searchAmbassadorHandler = async () => {
      const response = await searchUserUniversityRecord({
        nameCollection: 'Ambassadors',
        email: searchAmbassador,
        universityId: id,
      });
      setSearchAmbassadorResult(response);
    };

    const searchAmbassadorPendingHandler = async () => {
      const response = await searchUserRecord({
        nameCollection: 'Ambassadors',
        email: searchAmbassadorPending,
        universityId: id,
      });
      setSearchAmbassadorPendingResult(response);
      // if (searchAmbassador) dispatch(fetchSearchAmbassador(searchAmbassador));
    };

    const inputPendingHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchAmbassadorPending(event.target.value.trim());
    };

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchAmbassador(event.target.value.trim());
    };

    const statusDataRejectHandler = () => {
      setStatusDataReject((prev) => {
        firstRender.current = true;
        return !prev;
      });
    };

    useEffect(() => {
      setAmbassadorsCount(totalAmbassadors);
    }, [totalAmbassadors]);

    useEffect(() => {
      if (userProfileData) setHidden(true);
      else setHidden(false);
    }, [userProfileData]);

    useEffect(() => {
      if (firstRender.current) {
        getAmbassadorsHandler(id, 'approved');
        firstRender.current = false;
      }
    }, [statusDataReject]);

    useEffect(() => {
      getAmbassadorsHandler(id, 'pending');
    }, []);

    return (
      <>
        {/* // TODO: START ===>>> */}
        <Container hidden={hiddenChildren}>
          <Line />
          <SubMenuAdd
            title='Add Ambassador'
            isActive={addAmbassadorBtnActive}
            setIsActive={setAddAmbassadorBtnActive}
          />
          {addAmbassadorBtnActive && (
            <CreateAccount
              role='ambassador'
              universityId={id}
              universityName={universityName}
              setIsActive={setAddAmbassadorBtnActive}
            />
          )}

          <ContentBlocks marginTop='35px'>
            <Title>
              New Requests: {newRequests}
              <ImageWrapper url={reset} onClick={() => getAmbassadorsHandler(id, 'pending')} />
            </Title>

            {searchAmbassadorPendingResult?.message && (
              <SearchResult color={searchAmbassadorPendingResult.user ? '#02B0BB' : 'tomato'}>
                {searchAmbassadorPendingResult.message}
              </SearchResult>
            )}
            {/* Btn: opacity переделать на hidden/display:none */}
            <Btn
              width='90px'
              height='30px'
              opacity={searchAmbassadorPendingResult?.status === 'reject' ? 1 : 0}
              onClick={() => {
                if (
                  searchAmbassadorPendingResult?.user &&
                  searchAmbassadorPendingResult?.status === 'reject'
                )
                  ApprovedAmbassadorPendingHandler(
                    searchAmbassadorPendingResult.user.id,
                    searchAmbassadorPending,
                    false,
                  );
              }}>
              Invite
            </Btn>

            <SearchBlocks>
              <input
                onChange={inputPendingHandler}
                value={searchAmbassadorPending}
                placeholder='Enter Email Here'
              />
              <Logo
                src={searchIcon}
                width='24px'
                onClick={searchAmbassadorPendingHandler}
                pointer
              />
            </SearchBlocks>
          </ContentBlocks>

          {searchAmbassadorPendingResult?.user &&
            'image' in searchAmbassadorPendingResult.user &&
            searchAmbassadorPendingResult.status === 'pending' && (
              <AllAmbassadorsPending height='0' marginBottom='20px'>
                <li key={searchAmbassadorPendingResult.user.id}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={searchAmbassadorPendingResult.user.image}></IconWrapper>
                    {/* // todo tooltip for Title */}
                    <Title
                      mrl='23px'
                      list
                      width='117px'>{`${searchAmbassadorPendingResult.user.lastName} ${searchAmbassadorPendingResult.user.firstName}`}</Title>
                  </div>
                  <div className='email'>{searchAmbassadorPendingResult.user.email}</div>
                  <div className='icon-block'>
                    <ActionWrapper
                      accept
                      width='31px'
                      onClick={() => {
                        if (searchAmbassadorPendingResult.user)
                          ApprovedAmbassadorPendingHandler(
                            searchAmbassadorPendingResult.user.id,
                            searchAmbassadorPending,
                          );
                      }}>
                      <Logo src={acceptIcon} width='18px' />
                    </ActionWrapper>
                    <ActionWrapper
                      delete
                      width='31px'
                      onClick={() => {
                        if (searchAmbassadorPendingResult.user)
                          RejectAmbassadorHandler(searchAmbassadorPendingResult.user.id, true);
                      }}>
                      <Logo src={deleteIcon} width='16px' />
                    </ActionWrapper>
                  </div>
                </li>
              </AllAmbassadorsPending>
            )}

          {searchAmbassadorPendingResult?.user &&
            'image' in searchAmbassadorPendingResult.user &&
            (searchAmbassadorPendingResult.status === 'approved' ||
              searchAmbassadorPendingResult.status === 'reject') && (
              <AllAmbassadors height='0'>
                <li key={searchAmbassadorPendingResult.user.id}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={searchAmbassadorPendingResult.user.image}></IconWrapper>
                    {/* // todo tooltip for Title */}
                    <Title
                      mrl='23px'
                      list
                      width='117px'>{`${searchAmbassadorPendingResult.user.lastName} ${searchAmbassadorPendingResult.user.firstName}`}</Title>
                  </div>
                  <div className='invitedDate'>
                    {DateToString(searchAmbassadorPendingResult.user.createdAt.seconds)}
                  </div>
                  <div className='email'>{searchAmbassadorPendingResult.user.email}</div>
                  <div className='city'>{searchAmbassadorPendingResult.user.city}</div>
                  <div className='downloaded'>{searchAmbassadorPendingResult.user.status}</div>
                  {searchAmbassadorPendingResult.user.status !== 'reject' ? (
                    <div
                      className='delete'
                      onClick={() => {
                        if (searchAmbassadorPendingResult.user)
                          deleteAmbassadorFromUniversity(
                            searchAmbassadorPendingResult.user.id,
                            searchAmbassadorPending,
                          );
                      }}></div>
                  ) : (
                    <div style={{ width: '20px' }}></div>
                  )}
                </li>
              </AllAmbassadors>
            )}

          <HeadListsPending>
            <div className='name'>
              Name <Logo src={vectorDown} width='16px' />
            </div>
            <div className='email'>Email</div>
            <div className='icon-block'></div>
          </HeadListsPending>
          <Line2 />
          <AllAmbassadorsPending>
            {ambassadorsPending.map((ambassador) => (
              <li key={ambassador.id}>
                <div className='name'>
                  <IconWrapper
                    width='50px'
                    borderRadius='25px'
                    url={ambassador.image}></IconWrapper>
                  {/* // todo tooltip for Title */}
                  <Title
                    mrl='23px'
                    list
                    width='117px'>{`${ambassador.lastName} ${ambassador.firstName}`}</Title>
                </div>
                <div className='email'>{ambassador.email}</div>
                <div className='icon-block'>
                  <ActionWrapper
                    accept
                    width='31px'
                    onClick={() => ApprovedAmbassadorPendingHandler(ambassador.id)}>
                    <Logo src={acceptIcon} width='18px' />
                  </ActionWrapper>
                  <ActionWrapper
                    delete
                    width='31px'
                    onClick={() => RejectAmbassadorHandler(ambassador.id)}>
                    <Logo src={deleteIcon} width='16px' />
                  </ActionWrapper>
                </div>
              </li>
            ))}
          </AllAmbassadorsPending>

          {!!ambassadorsPending.length && (
            <Pagination
              currentPage={currentPagePending}
              pageDown={() => paginationHandler({ action: 'down', where: 'pending' })}
              pageUp={() => paginationHandler({ action: 'up', where: 'pending' })}
            />
          )}
        </Container>
        {/* // TODO: END <<<===*/}

        <Container>
          <div hidden={hiddenChildren}>
            <Line />
            <ContentBlocks marginBottom='20px'>
              <Title>
                Total Ambassadors: {ambassadorsCount}{' '}
                <ImageWrapper url={reset} onClick={() => getAmbassadorsHandler(id, 'approved')} />
                <ImageWrapper
                  url={statusDataReject ? delOrange : delGrey}
                  onClick={statusDataRejectHandler}
                />
              </Title>
              {searchAmbassadorResult?.message && (
                <SearchResult color={searchAmbassadorResult.user ? '#02B0BB' : 'tomato'}>
                  {searchAmbassadorResult.message}
                </SearchResult>
              )}
              <SearchBlocks>
                <input
                  onChange={inputHandler}
                  value={searchAmbassador}
                  placeholder='Enter Email Here'
                />
                <Logo src={searchIcon} width='24px' onClick={searchAmbassadorHandler} pointer />
              </SearchBlocks>
            </ContentBlocks>

            {searchAmbassadorResult?.user && 'image' in searchAmbassadorResult.user && (
              <AllAmbassadors height='0'>
                <li key={searchAmbassadorResult.user.id}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={searchAmbassadorResult.user.image}></IconWrapper>
                    <Title
                      mrl='23px'
                      list
                      width='117px'>{`${searchAmbassadorResult.user.lastName} ${searchAmbassadorResult.user.firstName}`}</Title>
                  </div>
                  <div className='invitedDate'>
                    {DateToString(searchAmbassadorResult.user.createdAt.seconds)}
                  </div>
                  <div className='email'>{searchAmbassadorResult.user.email}</div>
                  <div className='city'>{searchAmbassadorResult.user.city}</div>
                  <div className='downloaded'>{searchAmbassadorResult.user.status}</div>
                  {searchAmbassadorResult.user.status !== 'reject' ? (
                    <div
                      className='delete'
                      onClick={() => {
                        if (searchAmbassadorResult.user)
                          deleteAmbassadorFromUniversity(
                            searchAmbassadorResult.user.id,
                            searchAmbassador,
                          );
                      }}></div>
                  ) : (
                    <ActionWrapper
                      accept
                      width='31px'
                      onClick={() => {
                        if (searchAmbassadorResult.user)
                          ApprovedAmbassadorHandler(searchAmbassadorResult.user.id, true);
                        // ApprovedAmbassadorPendingHandler(
                        //   searchAmbassadorResult.user.id,
                        //   searchAmbassador,
                        //   false,
                        // );
                      }}>
                      <Logo src={acceptIcon} width='18px' />
                    </ActionWrapper>
                  )}
                </li>
              </AllAmbassadors>
            )}

            <HeadLists>
              <div className='name'>
                Name <Logo src={vectorDown} width='16px' />
              </div>
              <div className='invitedDate'>Reg. Date</div>
              <div className='email'>Email</div>
              <div className='city'>City</div>
              <div className='downloaded'>Status</div>
              <div className='delete'></div>
            </HeadLists>
            <Line2 />
            <AllAmbassadors>
              {ambassadors.map((ambassador, ind) => (
                <li key={ambassador.id}>
                  <div className='name'>
                    <IconWrapper
                      width='50px'
                      borderRadius='25px'
                      url={ambassador.image}></IconWrapper>
                    <Title
                      mrl='23px'
                      list
                      pointer
                      onClick={() => setUserProfileData(ambassadors[ind])}
                      width='117px'>{`${ambassador.lastName} ${ambassador.firstName}`}</Title>
                  </div>
                  <div className='invitedDate'>{DateToString(ambassador.createdAt.seconds)}</div>
                  <div className='email'>{ambassador.email}</div>
                  <div className='city'>{ambassador.city}</div>
                  <div className='downloaded'>{ambassador.status}</div>
                  {ambassador.status !== 'reject' ? (
                    <div
                      className='delete'
                      onClick={() => deleteAmbassadorFromUniversity(ambassador.id)}></div>
                  ) : (
                    <div style={{ width: '20px' }}>
                      <ActionWrapper
                        accept
                        width='31px'
                        onClick={() => {
                          ApprovedAmbassadorHandler(ambassador.id, false);
                          // ApprovedAmbassadorPendingHandler(ambassador.id, '', false);
                        }}>
                        <Logo src={acceptIcon} width='18px' />
                      </ActionWrapper>
                    </div>
                  )}
                </li>
              ))}
            </AllAmbassadors>

            {!!ambassadors.length && (
              <Pagination
                currentPage={currentPage}
                pageDown={() => paginationHandler({ action: 'down', where: 'approved' })}
                pageUp={() => paginationHandler({ action: 'up', where: 'approved' })}
              />
            )}
          </div>

          {userProfileData && (
            <Profile user='ambassador' closedFunc={setUserProfileData} userData={userProfileData} />
          )}
        </Container>
      </>
    );
  },
);

export default MenuAmbassadors;
