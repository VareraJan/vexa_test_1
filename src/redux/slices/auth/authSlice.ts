import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUser, loginUser, signOutUser } from './asyncActions';

export type Auth = 'login' | 'registration' | '';

export enum AuthErrorCode {
  'auth/user-not-found' = 'user not found',
  'auth/wrong-password' = 'wrong password',
  'auth/invalid-email' = 'invalid email',
  'auth/internal-error' = 'internal error',
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  NOT = 'not',
}

// TODO дописать интерфейс юзера в соответствии с ответом сервера(Университет и Амбассадор)
export interface IUniversity {
  id: string;
  email: string;
  name: string;
  // location: string;
  // image: string;
  // prospectsCount: number;
  // ambassadorsCount: number;
  // approvedVideosCount: number;
  // type: string;
  // size: string;
  // admission: string;
  // unique: string;
  // information: string;
  // accomodation: string;
  // password: string;
  // phone: string;
}

export interface IAmbassador {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export type IUser =
  | {
      id: string;
      email: string;
    }
  | {};

export type AuthSliceState = {
  isOpen: Auth;
  isAuth: boolean;
  status: Status;
  errorMessage?: string | null;
  user: IUser;
};

const initialState: AuthSliceState = {
  isOpen: '',
  isAuth: false,
  status: Status.NOT,
  errorMessage: null,
  user: {},
};
interface setStatusPayloadParams {
  status: Status;
  errorMessage?: string;
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setOpen(state, action: PayloadAction<Auth>) {
      state.isOpen = action.payload;
    },

    setUserAuth(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = true;
      state.status = Status.SUCCESS;
      state.errorMessage = null;
    },

    logOutAuth(state) {
      state.errorMessage = null;
      state.isOpen = '';
      state.isAuth = false;
      state.status = Status.NOT;
      state.user = {};
    },

    setStatus(state, action: PayloadAction<setStatusPayloadParams>) {
      state.status = action.payload.status;
      state.errorMessage = action.payload.errorMessage;
    },
    clearStatus(state) {
      state.status = Status.NOT;
      state.errorMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(createUser.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(createUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.isAuth = true;
      state.user = action.payload;
    });

    builder.addCase(createUser.rejected, (state) => {
      state.status = Status.ERROR;
    });

    builder.addCase(signOutUser.pending, (state) => {
      state.status = Status.LOADING;
    });

    builder.addCase(signOutUser.fulfilled, (state) => {
      state.status = Status.NOT;
      state.isAuth = false;
      state.user = {};
    });

    builder.addCase(signOutUser.rejected, (state) => {
      state.status = Status.NOT;
      state.isAuth = false;
      state.user = {};
    });
  },
});

export const { setOpen, setUserAuth, setStatus, clearStatus, logOutAuth } = authSlice.actions;
export default authSlice.reducer;
