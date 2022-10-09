import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../redux/store';

import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';
import deleteIcon from '../../../assets/img/dashboard/apprVideoReject.svg';
import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import searchIcon from '../../../assets/img/dashboard/search-2.svg';
import reset from '../../../assets/img/dashboard/reset.svg';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase';
import {
  IAmbassadorsToUniversity,
  setAmbassadorsPendingToUniversity,
} from '../../../../redux/slices/ambassadors/ambassadorsSlice';
import {
  ActionWrapper,
  AllAmbassadors,
  Btn,
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
} from './AmbassadorsPendingSearch.styled';
import { useFetchFirebase } from '../../../../hooks/useFetchFirebase';
import { ResponseProps, useSearchUserFirebase } from '../../../../hooks/useSearchFirebase';
import { DateToString } from '../../../../hooks/useDateToString';
// import { ImageWrapper } from '../ProspectsSearch/ProspectsSearch.styled';
import SubMenuAdd from '../../SubMenuAdd';
import CreateAccount from '../../CreateAccount';
import Pagination from '../../Pagination';
import { ImageWrapper } from '../../../../styled/dashboard';

interface AmbassadorsPendingSearchProps {
  id: string;
  hiddenChildren: boolean;
  universityName: string;
}

const AmbassadorsPendingSearch: React.FC<AmbassadorsPendingSearchProps> = ({
  id,
  hiddenChildren,
  universityName,
}) => {
  const [searchAmbassador, setSearchAmbassador] = useState('');
  const [searchAmbassadorResult, setSearchAmbassadorResult] = useState<ResponseProps>();
  const [addAmbassadorBtnActive, setAddAmbassadorBtnActive] = useState(false);

  const { fetchDataFirebase } = useFetchFirebase();
  const { searchUserRecord } = useSearchUserFirebase();

  const {
    ambassadors,
    currentPage,
    pageLimit,
    firstCurrentDoc,
    secondCurrentDoc,
    lastCurrentDoc,
    status,
  } = useAppSelector((state) => state.ambassadors.pendingAmbassadors);

  const dispatch = useAppDispatch();

  // TODO: newRequests заменить на запрос
  const newRequests = 0;

  const getAmbassadorsPendingHandler = async (universityID: string) => {
    const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
      universityID,
      nameCollection: 'Ambassadors',
      queryStatus: 'pending',
      pageLimit,
    });

    dispatch(
      setAmbassadorsPendingToUniversity({
        ambassadors: List,
        currentPage: 1,
        firstCurrentDoc: firstVisible,
        lastCurrentDoc: lastVisible,
        secondCurrentDoc: secondVisible,
      }),
    );
  };

  /** перезапросить данные текущей страницы */
  const getUpdateAmbassadorsPendingHandler = async (start: IAmbassadorsToUniversity) => {
    const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
      universityID: id,
      nameCollection: 'Ambassadors',
      queryStatus: 'pending',
      pageLimit,
      start,
    });

    dispatch(
      setAmbassadorsPendingToUniversity({
        ambassadors: List,
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
        if (currentPage - 1 === 1) return getAmbassadorsPendingHandler(id);
      }
      const { List, firstVisible, secondVisible, lastVisible } = await fetchDataFirebase({
        universityID: id,
        nameCollection: 'Ambassadors',
        queryStatus: 'pending',
        pageLimit,
        end: firstCurrentDoc,
      });

      dispatch(
        setAmbassadorsPendingToUniversity({
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
        queryStatus: 'pending',
        pageLimit,
        startAft: lastCurrentDoc,
      });

      if (!List.length) return;

      dispatch(
        setAmbassadorsPendingToUniversity({
          ambassadors: List,
          currentPage: currentPage + 1,
          firstCurrentDoc: firstVisible,
          lastCurrentDoc: lastVisible,
          secondCurrentDoc: secondVisible,
        }),
      );
    }
  };

  const RejectAmbassadorHandler = async (ambassadorId: string, search?: boolean) => {
    const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
    try {
      await setDoc(ambassador, { status: 'reject' }, { merge: true });
      // перезапросить страницу
      if (ambassadors.length === 1) paginationHandler('down', true);
      else if (ambassadors[0].id === ambassadorId)
        getUpdateAmbassadorsPendingHandler(secondCurrentDoc);
      else getUpdateAmbassadorsPendingHandler(firstCurrentDoc);
      // обновить поиск
      if (search) searchAmbassadorHandler();
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
  };

  // TODO дублируеться в AmbassadorsSearch, будет время => вынести все в хуки или один компонент и переписать код =======>
  const ApprovedAmbassadorHandler = async (
    ambassadorId: string,
    search?: boolean,
    downPage: boolean = true,
  ) => {
    const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
    try {
      await setDoc(ambassador, { status: 'approved' }, { merge: true });
      // перезапросить страницу
      if (downPage) {
        if (ambassadors.length === 1) paginationHandler('down', true);
        else if (ambassadors[0].id === ambassadorId)
          getUpdateAmbassadorsPendingHandler(secondCurrentDoc);
        else getUpdateAmbassadorsPendingHandler(firstCurrentDoc);
      }
      // обновить поиск
      if (search) {
        searchAmbassadorHandler();
      }
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
  };

  // TODO deleteAmbassadorFromUniversity взято из AmbassadorsSearch, будет время => вынести все в хуки и переписать код =======>
  const deleteAmbassadorFromUniversity = async (ambassadorId: string, search?: boolean) => {
    const ambassador = doc(db, `Ambassadors/${ambassadorId}`);
    try {
      await setDoc(ambassador, { status: 'reject' }, { merge: true });
      // перезапросить страницу
      // if (ambassadors.length === 1) paginationHandler('down', true);
      // обновить поиск
      if (search) searchAmbassadorHandler();
    } catch (error) {
      console.log('setDoc ERROR ', error);
    }
  };

  const searchAmbassadorHandler = async () => {
    const response = await searchUserRecord({
      nameCollection: 'Ambassadors',
      email: searchAmbassador,
      universityId: id,
    });
    setSearchAmbassadorResult(response);
    // if (searchAmbassador) dispatch(fetchSearchAmbassador(searchAmbassador));
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAmbassador(event.target.value.trim());
  };

  useEffect(() => {
    getAmbassadorsPendingHandler(id);
  }, []);

  return (
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

      <ContentBlocks>
        <Title>
          New Requests: {newRequests}
          <ImageWrapper url={reset} onClick={() => getAmbassadorsPendingHandler(id)} />
        </Title>

        {searchAmbassadorResult?.message && (
          <SearchResult color={searchAmbassadorResult.user ? '#02B0BB' : 'tomato'}>
            {searchAmbassadorResult.message}
          </SearchResult>
        )}
        <Btn
          width='90px'
          height='30px'
          opacity={searchAmbassadorResult?.status === 'reject' ? 1 : 0}
          onClick={() => {
            if (searchAmbassadorResult?.user && searchAmbassadorResult?.status === 'reject')
              ApprovedAmbassadorHandler(searchAmbassadorResult.user.id, true, false);
          }}>
          Invite
        </Btn>

        <SearchBlocks>
          <input onChange={inputHandler} value={searchAmbassador} placeholder='Enter Email Here' />
          <Logo src={searchIcon} width='24px' onClick={searchAmbassadorHandler} pointer />
        </SearchBlocks>
      </ContentBlocks>

      {searchAmbassadorResult?.user &&
        'image' in searchAmbassadorResult.user &&
        searchAmbassadorResult.status === 'pending' && (
          <AllAmbassadors height='0' marginBottom='20px'>
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
              <div className='email'>{searchAmbassadorResult.user.email}</div>
              <div className='icon-block'>
                <ActionWrapper
                  acceptr
                  width='31px'
                  onClick={() => {
                    if (searchAmbassadorResult.user)
                      ApprovedAmbassadorHandler(searchAmbassadorResult.user.id, true);
                  }}>
                  <Logo src={acceptIcon} width='18px' />
                </ActionWrapper>
                <ActionWrapper
                  delete
                  width='31px'
                  onClick={() => {
                    if (searchAmbassadorResult.user)
                      RejectAmbassadorHandler(searchAmbassadorResult.user.id, true);
                  }}>
                  <Logo src={deleteIcon} width='16px' />
                </ActionWrapper>
              </div>
            </li>
          </AllAmbassadors>
        )}

      {searchAmbassadorResult?.user &&
        'image' in searchAmbassadorResult.user &&
        (searchAmbassadorResult.status === 'approved' ||
          searchAmbassadorResult.status === 'reject') && (
          <AllAmbassadors height='0' marginBottom='20px'>
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
                <div style={{ width: '20px' }}></div>
              )}
            </li>
          </AllAmbassadors>
        )}

      <HeadLists>
        <div className='name'>
          Name <Logo src={vectorDown} width='16px' />
        </div>
        <div className='email'>Email</div>
        <div className='icon-block'></div>
      </HeadLists>
      <Line2 />
      <AllAmbassadors>
        {ambassadors.map((ambassador) => (
          <li key={ambassador.id}>
            <div className='name'>
              <IconWrapper width='50px' borderRadius='25px' url={ambassador.image}></IconWrapper>
              {/* // todo tooltip for Title */}
              <Title
                mrl='23px'
                list
                width='117px'>{`${ambassador.lastName} ${ambassador.firstName}`}</Title>
            </div>
            <div className='email'>{ambassador.email}</div>
            <div className='icon-block'>
              <ActionWrapper
                acceptr
                width='31px'
                onClick={() => ApprovedAmbassadorHandler(ambassador.id)}>
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
      </AllAmbassadors>

      {!!ambassadors.length && (
        <Pagination
          currentPage={currentPage}
          pageDown={() => paginationHandler('down')}
          pageUp={() => paginationHandler('up')}
        />
      )}
    </Container>
  );
};

export default AmbassadorsPendingSearch;
