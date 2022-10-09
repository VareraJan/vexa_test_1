import React, { useState } from 'react';
import { useCreateFirebase } from '../../../hooks/useCreateFirebase';
import { ErrorMessage } from '../../../styled/dashboard';
import { Btn, Container, InputBlock } from './CreateAccount.styled';

interface CreateAccountProps {
  role: 'student' | 'ambassador';
  universityId: string;
  universityName?: string;
  setIsActive?: (active: boolean) => void;
}

interface UserData {
  email: string;
  name: string;
  lastName: string;
  birthday: string;
  status?: 'apply' | 'commit';
}

const CreateAccount: React.FC<CreateAccountProps> = ({
  role,
  universityId,
  universityName,
  setIsActive,
}) => {
  const [userData, setUserData] = useState<UserData>({
    email: '',
    name: '',
    lastName: '',
    birthday: '',
  });
  const [createError, setCreateError] = useState<string>();

  const { createAccount } = useCreateFirebase();

  const isEmailValid = (email: string) => {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return EMAIL_REGEXP.test(email);
  };

  const sendHandler = async () => {
    if (!userData.email) {
      setCreateError('missing email');
      return;
    }
    if (!isEmailValid(userData.email)) {
      setCreateError('no valid email');
      return;
    }
    if (!userData.name) {
      setCreateError('missing first name');
      return;
    }
    if (!userData.lastName) {
      setCreateError('missing last name');
      return;
    }
    if (!userData.birthday) {
      setCreateError('missing birthday');
      return;
    }
    if (role === 'student' && !userData.status) {
      setCreateError('missing status');
      return;
    }
    const birth = userData.birthday.split('-').reverse().join('/');

    const status = await createAccount({
      email: userData.email,
      role: role === 'student' ? 'Students' : 'Ambassadors',
      universityId,
      birth,
      name: userData.name,
      lastName: userData.lastName,
      studentStatus: userData.status,
      universityName,
    });
    if (status === true && setIsActive) setIsActive(false);
    else if (typeof status === 'string') setCreateError(status);
  };

  return (
    <Container>
      <InputBlock>
        <label>Email</label>
        <input
          name='email'
          value={userData.email}
          onChange={(e) => setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          type='text'
          placeholder='Email User'
        />
      </InputBlock>
      <InputBlock>
        <label>First Name</label>
        <input
          name='name'
          value={userData.name}
          onChange={(e) => setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          type='text'
          placeholder='First Name'
        />
      </InputBlock>
      <InputBlock>
        <label>Last Name</label>
        <input
          name='lastName'
          value={userData.lastName}
          onChange={(e) => setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          type='text'
          placeholder='Last Name'
        />
      </InputBlock>
      <InputBlock>
        <label>Birthday</label>
        <input
          name='birthday'
          value={userData.birthday}
          onChange={(e) => setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
          type='date'
        />
      </InputBlock>

      <InputBlock marginRight='0'>
        <label>{role === 'student' && 'Status'}</label>
        <div className='btn-group'>
          {role === 'student' ? (
            <>
              <Btn
                width='152px'
                marginRight='14px'
                onClick={() => setUserData((prev) => ({ ...prev, status: 'apply' }))}
                active={userData?.status === 'apply'}>
                Apply
              </Btn>
              <Btn
                onClick={() => setUserData((prev) => ({ ...prev, status: 'commit' }))}
                active={userData?.status === 'commit'}
                marginRight='36px'
                width='152px'>
                Commit
              </Btn>
            </>
          ) : (
            <div className='empty' />
          )}
          <Btn width='192px' active save onClick={sendHandler}>
            Send
          </Btn>
        </div>
      </InputBlock>
      {createError && <ErrorMessage>{createError}</ErrorMessage>}
    </Container>
  );
};

export default CreateAccount;
