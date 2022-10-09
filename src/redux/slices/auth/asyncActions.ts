import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IUserDataLogin } from '../../../components/Auth/SIgnIn/SignIn';
import { IUserDataCreate } from '../../../components/Auth/SignUp/SignUp';
// import { IUserDataCreate } from '../../../components/SignUp';
import { IUser } from './authSlice';

// TODO any - пока что неизвестно что вернет сервер, позже пофиксить
export const loginUser = createAsyncThunk<IUser, IUserDataLogin>(
  'auth/loginUserStatus',
  async (userData) => {
    // TODO заглушка запроса, urlServer
    // const { data } = await axios.post<>('url_login_farebase', userData);
    // return data;

    // заглушка университета
    return {
      id: 1,
      email: userData.email,
      name: 'Tomsk University',
    };
  },
);

export const createUser = createAsyncThunk<any, IUserDataCreate>(
  'auth/createUserStatus',
  async (userData) => {
    const { data } = await axios.post<any>('url_registration_farebase', userData);
    return data;
  },
);

export const signOutUser = createAsyncThunk<any, undefined>('auth/signOutUserStatus', async () => {
  const { data } = await axios.get('url_signout_farebase');
  return data;
});
