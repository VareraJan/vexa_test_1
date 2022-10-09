import React, { useEffect, useRef, useState } from 'react';

import searchIcon from '../../../assets/img/dashboard/search-2.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import reset from '../../../assets/img/dashboard/reset.svg';
import delGrey from '../../../assets/img/dashboard/bin-grey.svg';
import delOrange from '../../../assets/img/dashboard/bin-orange.svg';
import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';

import { useAppDispatch, useAppSelector } from '../../../../redux/store';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import {
  IAmbassadorsToUniversity,
  setAmbassadorsApprovedToUniversity,
} from '../../../../redux/slices/ambassadors/ambassadorsSlice';
import {
  AllAmbassadors,
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
} from './AmbassadorsSearch.styled';
import { useFetchFirebase } from '../../../../hooks/useFetchFirebase';
import { DateToString } from '../../../../hooks/useDateToString';
import { ResponseProps, useSearchUserFirebase } from '../../../../hooks/useSearchFirebase';

import Profile from '../../../../pages/Profile/Profile';
import Pagination from '../../Pagination';
import { ActionWrapper, ImageWrapper } from '../../../../styled/dashboard';
interface AmbassadorsSearchProps {
  totalAmbassadors: number;
  id: string;
  setHidden: (hidden: boolean) => void;
  hiddenChildren: boolean;
}

const AmbassadorsSearch: React.FC<AmbassadorsSearchProps> = ({
  totalAmbassadors,
  id,
  setHidden,
  hiddenChildren,
}) => {
  const [ambassadorsCount, setAmbassadorsCount] = useState(totalAmbassadors);
  const [searchAmbassador, setSearchAmbassador] = useState('');
  const [searchAmbassadorResult, setSearchAmbassadorResult] = useState<ResponseProps>();
  const [statusDataReject, setStatusDataReject] = useState(false);
  const [userProfileData, setUserProfileData] = useState<IAmbassadorsToUniversity | null>(null);

  const { fetchDataFirebase } = useFetchFirebase();
  const { searchUserUniversityRecord } = useSearchUserFirebase();

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

  const firstRender = useRef(true);
  const queryStatus = statusDataReject ? 'reject' : 'approved';

  const getAmbassadorsApprovedHandler = async (universityID: string) => {
    const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
      universityID,
      nameCollection: 'Ambassadors',
      queryStatus,
      pageLimit,
    });

    dispatch(
      setAmbassadorsApprovedToUniversity({
        ambassadors: List,
        currentPage: 1,
        firstCurrentDoc: firstVisible,
        lastCurrentDoc: lastVisible,
        secondCurrentDoc: secondVisible,
      }),
    );
  };

  /** перезапросить данные текущей страницы */
  const getUpdateAmbassadorsApprovedHandler = async (start: IAmbassadorsToUniversity) => {
    const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
      universityID: id,
      nameCollection: 'Ambassadors',
      queryStatus,
      pageLimit,
      start,
    });

    dispatch(
      setAmbassadorsApprovedToUniversity({
        ambassadors: List,
        currentPage,
        firstCurrentDoc: firstVisible,
        lastCurrentDoc: lastVisible,
        secondCurrentDoc: secondVisible,
      }),
    );
  };

  const searchAmbassadorHandler = async () => {
    const response = await searchUserUniversityRecord({
      nameCollection: 'Ambassadors',
      email: searchAmbassador,
      universityId: id,
    });
    setSearchAmbassadorResult(response);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAmbassador(event.target.value.trim());
  };

  const paginationHandler = async (action: 'up' | 'down', forcibly?: boolean) => {
    if (action === 'down') {
      if (!forcibly) {
        if (currentPage === 1) return;
        if (currentPage - 1 === 1) return getAmbassadorsApprovedHandler(id);
      }

      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID: id,
        nameCollection: 'Ambassadors',
        queryStatus,
        pageLimit,
        end: firstCurrentDoc,
      });

      dispatch(
        setAmbassadorsApprovedToUniversity({
          ambassadors: List,
          currentPage: currentPage - 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }

    if (action === 'up' && ambassadors.length === pageLimit) {
      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID: id,
        nameCollection: 'Ambassadors',
        queryStatus,
        pageLimit,
        startAft: lastCurrentDoc,
      });

      if (!List.length) return;

      dispatch(
        setAmbassadorsApprovedToUniversity({
          ambassadors: List,
          currentPage: currentPage + 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }
  };

  // TODO взято из  AmbassadorsPendingSearch, будет время => вынести все в хуки или один компонент и переписать код =======>
  const ApprovedAmbassadorHandler = async (ambassadorId: string, search?: boolean) => {
    const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
    try {
      await setDoc(ambassador, { status: 'approved' }, { merge: true });
      // перезапросить даннфе
      if (!search) {
        if (ambassadors.length === 1) paginationHandler('down', true);
        else if (ambassadors[0].id === ambassadorId)
          getUpdateAmbassadorsApprovedHandler(secondCurrentDoc);
        else getUpdateAmbassadorsApprovedHandler(firstCurrentDoc);
      }
      // обновить поиск
      if (search) {
        searchAmbassadorHandler();
        getAmbassadorsApprovedHandler(id);
      }
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
  };

  // TODO используеться в AmbassadorsPendingSearch, вынести в кастомный хук
  const deleteAmbassadorFromUniversity = async (ambassadorId: string, search?: boolean) => {
    const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
    try {
      await setDoc(ambassador, { status: 'reject' }, { merge: true });

      // перезапросить страницу
      if (!search) {
        if (ambassadors.length === 1) paginationHandler('down', true);
        else if (ambassadors[0].id === ambassadorId)
          getUpdateAmbassadorsApprovedHandler(secondCurrentDoc);
        else getUpdateAmbassadorsApprovedHandler(firstCurrentDoc);
      }

      // обновить поиск
      if (search) {
        searchAmbassadorHandler();
        getAmbassadorsApprovedHandler(id);
      }
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
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
      getAmbassadorsApprovedHandler(id);
      firstRender.current = false;
    }
  }, [statusDataReject]);

  return (
    <Container>
      <div hidden={hiddenChildren}>
        <Line />
        <ContentBlocks marginBottom='20px'>
          <Title>
            Total Ambassadors: {ambassadorsCount}{' '}
            <ImageWrapper url={reset} onClick={() => getAmbassadorsApprovedHandler(id)} />
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
                {/* // todo tooltip for Title */}
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
                      deleteAmbassadorFromUniversity(searchAmbassadorResult.user.id, true);
                  }}></div>
              ) : (
                <ActionWrapper
                  // acceptr
                  accept
                  width='31px'
                  onClick={() => {
                    if (searchAmbassadorResult.user)
                      ApprovedAmbassadorHandler(searchAmbassadorResult.user.id, true);
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
                <IconWrapper width='50px' borderRadius='25px' url={ambassador.image}></IconWrapper>
                {/* // todo tooltip for Title */}
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
                    // acceptr
                    accept
                    width='31px'
                    onClick={() => ApprovedAmbassadorHandler(ambassador.id, false)}>
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
            pageDown={() => paginationHandler('down')}
            pageUp={() => paginationHandler('up')}
          />
        )}
      </div>

      {userProfileData && (
        <Profile user='ambassador' closedFunc={setUserProfileData} userData={userProfileData} />
      )}
    </Container>
  );
};

export default AmbassadorsSearch;
