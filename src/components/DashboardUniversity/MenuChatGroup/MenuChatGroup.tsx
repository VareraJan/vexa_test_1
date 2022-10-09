import React, { useEffect, useRef, useState } from 'react';
import { useCreateFirebase } from '../../../hooks/useCreateFirebase';
import { useFetchFirebase } from '../../../hooks/useFetchFirebase';
import { useDeleteFirebase } from '../../../hooks/useDeleteDocFirebase';
import {
  IChatGroupToUniversity,
  setChatGroups,
  setGroupImage,
} from '../../../redux/slices/chatGroups/chatGroupsSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import SubMenuAdd from '../SubMenuAdd';
import {
  AllChatGroups,
  Container,
  HeadLists,
  IconWrapper,
  // ImageWrapper,
  Line2,
  Logo,
  Title,
} from './MenuChatGroup.styled';

import vectorDown from '../../../assets/img/dashboard/vectorDown.svg';
import reset from '../../../assets/img/dashboard/reset.svg';
import { ErrorMessage, ImageWrapper } from '../../../styled/dashboard';
import CreateChatGroup from '../CreateChatGroup';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { ChatGroupProfile } from '../ChatGroupProfile';

interface ChatGroupProps {
  id: string;
  universityName: string;
}
export interface ChatData {
  groupName: string;
  description: string;
  access: 'apply' | 'commit' | 'all';
}

const MenuChatGroup: React.FC<ChatGroupProps> = ({ id, universityName }) => {
  const [isOpenGroupProfile, setIsOpenGroupProfile] = useState(false);
  const [groupProfileData, setGroupProfileData] = useState<IChatGroupToUniversity>();
  const [addGroupActive, setAddGroupActive] = useState(false);
  const [createError, setCreateError] = useState<string>();
  const [chatData, setChatData] = useState<ChatData>({
    groupName: '',
    description: '',
    access: 'apply',
  });
  const [chengeAvatarGroupId, setChengeAvatarGroupId] = useState<string>();

  const { chatGroups } = useAppSelector((state) => state.chatGroupUniversity);

  const { createChatGroup } = useCreateFirebase();
  const { fetchChatGroupsDataFirebase } = useFetchFirebase();
  const { deleteDocFirebase } = useDeleteFirebase();

  const LIMIT_GROUPS = 10;

  const dispatch = useAppDispatch();
  const storage = getStorage();

  // const filePicker = new Array(chatGroups.length).fill(useRef<HTMLInputElement>(null));
  const filePicker = useRef<HTMLInputElement>(null);

  const getChatGroupHandler = async () => {
    const { List, firstVisible, secondVisible, lastVisible } = await fetchChatGroupsDataFirebase({
      universityId: id,
      order: 'name',
      pageLimit: 10,
    });

    dispatch(
      setChatGroups({
        chatGroups: List,
        currentPage: 1,
        firstCurrentDoc: firstVisible,
        secondCurrentDoc: secondVisible,
        lastCurrentDoc: lastVisible,
      }),
    );
  };

  const submitHandler = async () => {
    if (!chatData.groupName) {
      setCreateError('missing group name');
      return;
    }
    if (!chatData.description) {
      setCreateError('missing short description');
      return;
    }

    const status = await createChatGroup({
      name: chatData.groupName,
      universityId: id,
      universityName,
      access: chatData.access,
      description: chatData.description,
    });

    if (status === true) {
      setChatData({
        groupName: '',
        description: '',
        access: 'apply',
      });
      setCreateError('');
      setAddGroupActive(false);
      getChatGroupHandler();
    } else if (typeof status === 'string') setCreateError(status);
  };

  /** add and change avatars trigger */
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>, groupId: string) => {
    setChengeAvatarGroupId(groupId);
    filePicker.current?.click();
  };

  /** смена аватарки группы */
  const clickFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && chengeAvatarGroupId) {
      const storageRef = ref(storage, `Group/${chengeAvatarGroupId}/${e.target.files[0].name}`);
      const uploadImage = uploadBytesResumable(storageRef, e.target.files[0]);
      uploadImage.on(
        'state_changed',
        /** progress */
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // TODO: progressbar for user
          // console.log(`Upload is ${progress}% done`);
        },
        /** error */
        (error) => {
          // TODO: обработчики ошибок для вывода данных пользователю
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        /** completed */
        () => {
          getDownloadURL(uploadImage.snapshot.ref).then(async (downloadURL) => {
            const firestoreDbGroup = doc(db, `Groups/${chengeAvatarGroupId}`);
            try {
              await setDoc(firestoreDbGroup, { photo: downloadURL }, { merge: true });
              dispatch(setGroupImage({ groupId: chengeAvatarGroupId, url: downloadURL }));
            } catch (err) {
              // todo: обработчик ошибки, вывод сообщения пользователю
              console.log('setDoc ERROR ', err);
            }
          });
        },
      );
    }
  };

  // TODO добавляет лишний рендер(убрать отработку при первой загрузке, useRef)
  useEffect(() => {
    if (!addGroupActive) setCreateError('');
  }, [addGroupActive]);

  useEffect(() => {
    if (groupProfileData) {
      setGroupProfileData(chatGroups.find((group) => group.id === groupProfileData.id));
    }
  }, [chatGroups]);

  useEffect(() => {
    getChatGroupHandler();
  }, []);

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <SubMenuAdd
          title='Add Group'
          isActive={addGroupActive}
          setIsActive={setAddGroupActive}
          isLimit={chatGroups.length >= LIMIT_GROUPS}
        />
        {chatGroups.length >= LIMIT_GROUPS && (
          <ErrorMessage width='700px'>{`The ${LIMIT_GROUPS} chat group max limit has been reached`}</ErrorMessage>
        )}
      </div>
      {addGroupActive && (
        <CreateChatGroup
          chatData={chatData}
          createError={createError}
          setChatData={setChatData}
          submitHandler={submitHandler}
        />
      )}

      <Title width='200px' marginTop='32px'>
        Total Chat Groups: {chatGroups.length}
        <ImageWrapper url={reset} onClick={() => getChatGroupHandler()} />
      </Title>

      {/* //TODO сравнить стили и по возможности объеденить HeadLists и AllChatGroups  */}
      <HeadLists>
        <div className='name'>
          Name <Logo src={vectorDown} width='16px' />
        </div>
        <div className='description'>Short Description</div>
        <div className='numberOfUsers'>Number of Users</div>
        <div className='restrictions'>Restrictions</div>
        <div className='delete'></div>
      </HeadLists>
      <Line2 />

      <AllChatGroups marginBottom='22px'>
        {chatGroups.map((group, ind) => (
          <li key={group.id}>
            <div className='name'>
              <IconWrapper
                width='50px'
                borderRadius='25px'
                url={group.photo}
                onClick={(e) => clickHandler(e, group.id)}></IconWrapper>
              {/* // todo tooltip for Title */}
              <Title
                pointer
                width='117px'
                onClick={() => {
                  setIsOpenGroupProfile(true);
                  setGroupProfileData(group);
                }}>
                {group.name}
              </Title>
            </div>
            <div className='description'>{group.description}</div>
            <div className='numberOfUsers'>{group.usersId.length}</div>
            <div className='restrictions'>
              {group.access === 'all' ? 'Apply+Commit' : group.access}
            </div>
            <div
              className='delete'
              onClick={async () => {
                await deleteDocFirebase('Groups', group.id);
                getChatGroupHandler();
              }}
            />
          </li>
        ))}
      </AllChatGroups>
      <input
        className='uploader'
        ref={filePicker}
        type='file'
        onChange={(e) => clickFileHandler(e)}
        accept='image/*,.png,.jpg,.gif,.web'
      />
      {isOpenGroupProfile && groupProfileData && (
        <ChatGroupProfile
          groupData={groupProfileData}
          setGroupData={setGroupProfileData}
          setIsOpen={setIsOpenGroupProfile}
          updateGroups={getChatGroupHandler}
        />
      )}
    </Container>
  );
};

export default MenuChatGroup;
