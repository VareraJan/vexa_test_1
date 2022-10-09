import React, { useEffect, useRef, useState } from 'react';
import { FetchDataFirebaseParams, useFetchFirebase } from '../../../hooks/useFetchFirebase';
import { IAmbassadorsToUniversity } from '../../../redux/slices/ambassadors/ambassadorsSlice';
import { IChatGroupToUniversity } from '../../../redux/slices/chatGroups/chatGroupsSlice';
import { ContainerClick } from '../../Auth/SignUp/SignUp';
import { AmbassadorsBlock, Container, Frame } from './ChatGroupProfile.styled';

import deleteIcon from '../../../assets/img/dashboard/apprVideoReject.svg';
import acceptIcon from '../../../assets/img/dashboard/apprVideoAccept.svg';
import { ActionWrapper, Logo } from '../../../styled/dashboard';
import { useUpdateCollectionFirebase } from '../../../hooks/useUpdateCollectionFirebase';

interface ChatGroupProfileProps {
  groupData: IChatGroupToUniversity;
  setGroupData: (groupData: IChatGroupToUniversity | undefined) => void;
  setIsOpen: (arg: boolean) => void;
  updateGroups: () => void;
}

export const ChatGroupProfile: React.FC<ChatGroupProfileProps> = ({
  groupData,
  setGroupData,
  setIsOpen,
  updateGroups,
}) => {
  const [allAmbassadors, setAllAmbassadors] = useState<IAmbassadorsToUniversity[]>();
  const [ambassadorsInGroup, setAmbassadorsInGroup] = useState<IAmbassadorsToUniversity[]>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { updateCollection } = useUpdateCollectionFirebase();

  const frameRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { fetchDataFirebase } = useFetchFirebase();

  const getAmbassadorsHandler = async () => {
    const options: FetchDataFirebaseParams = {
      universityID: groupData.universityId,
      nameCollection: 'Ambassadors',
      queryStatus: 'approved',
      pageLimit: 999,
    };
    const { List } = await fetchDataFirebase(options);
    const groupAmbassadors: IAmbassadorsToUniversity[] = [];
    const groupOther: IAmbassadorsToUniversity[] = [];

    List.forEach((ambassador) => {
      if (groupData.ambassadorsId.find((id) => ambassador.id === id))
        groupAmbassadors.push(ambassador);
      else groupOther.push(ambassador);
    });

    setAllAmbassadors(groupOther);
    setAmbassadorsInGroup(groupAmbassadors);
  };

  const ambassadorsToggle = async (ambassadorId: string, action: 'add' | 'delete') => {
    let newAmbassadors;
    if (action === 'add') newAmbassadors = [...groupData.ambassadorsId, ambassadorId];
    else newAmbassadors = groupData.ambassadorsId.filter((id) => id !== ambassadorId);

    const status = await updateCollection({
      collectionName: 'Groups',
      id: groupData.id,
      updateData: { ambassadorsId: newAmbassadors },
    });
    if (status) {
      updateGroups();
    } else {
      console.log('update ERROR');
      setErrorMessage('Update ERROR');
      // TODO: вывести сообщение об ошибке пользователю
    }
  };

  useEffect(() => {
    const clickOutsideHandler = (event: MouseEvent) => {
      const _event = event as ContainerClick;

      if (
        containerRef.current &&
        frameRef.current &&
        _event.path.includes(frameRef.current) &&
        !_event.path.includes(containerRef.current)
      ) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', clickOutsideHandler);

    return () => {
      document.body.removeEventListener('click', clickOutsideHandler);
      setGroupData(undefined);
    };
  }, []);

  useEffect(() => {
    getAmbassadorsHandler();
  }, [groupData]);

  useEffect(() => {
    if (errorMessage)
      setTimeout(() => {
        setErrorMessage(undefined);
      }, 3500);
  }, [errorMessage]);

  return (
    <Frame ref={frameRef}>
      <Container ref={containerRef}>
        <h2>{groupData.name}</h2>
        {errorMessage && <h2 style={{ color: 'tomato', textAlign: 'center' }}>{errorMessage}</h2>}
        <AmbassadorsBlock>
          <ul>
            <p>Ambassadors in group:</p>
            {ambassadorsInGroup && !ambassadorsInGroup.length && <h3>Not Ambassadors</h3>}
            {ambassadorsInGroup &&
              ambassadorsInGroup.map((ambassador) => (
                <li key={ambassador.id}>
                  {`${ambassador.firstName} ${ambassador.lastName}`}{' '}
                  <ActionWrapper
                    delete
                    width='26px'
                    onClick={() => ambassadorsToggle(ambassador.id, 'delete')}>
                    <Logo src={deleteIcon} width='16px' />
                  </ActionWrapper>
                </li>
              ))}
          </ul>

          {allAmbassadors && (
            <ul>
              <p>Other ambassadors:</p>
              {allAmbassadors && !allAmbassadors.length && <h3>Not Ambassadors</h3>}
              {allAmbassadors &&
                allAmbassadors.map((ambassador) => (
                  <li key={ambassador.id}>
                    {`${ambassador.firstName} ${ambassador.lastName}`}{' '}
                    <ActionWrapper
                      accept
                      width='26px'
                      onClick={() => ambassadorsToggle(ambassador.id, 'add')}>
                      <Logo src={acceptIcon} width='18px' />
                    </ActionWrapper>
                  </li>
                ))}
            </ul>
          )}
        </AmbassadorsBlock>
      </Container>
    </Frame>
  );
};

// export default ChatGroupProfile
