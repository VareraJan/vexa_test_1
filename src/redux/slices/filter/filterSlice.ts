import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAmbassadorsToUniversity } from '../ambassadors/ambassadorsSlice';
import { Status } from '../auth/authSlice';
import { fetchSearchAmbassador, fetchSearchStudent } from './asyncActions';

export interface StudentsColUniversities {
  universityId: string;
  userStatus: 'expected apply' | 'expected commit' | 'apply' | 'commit' | 'reject';
  // statusUpdate: { seconds: number; nanoseconds: number };
}
export interface IStudentToUniversity {
  birth: string;
  country: string;
  email: string;
  enrollment: string;
  id: string;
  information: string;
  language: string;
  liked: string[];
  name: string;
  parentInfo: string;
  photo: string;
  recordFrom: string;
  selectUniversity: string;
  soname: string;
  status: string;
  universities: StudentsColUniversities[];
  uuid: string;
}

export interface FilterSliceState {
  searchStudent: IStudentToUniversity | {};
  searchAmbassador: IAmbassadorsToUniversity | {};
  status: Status;
}

const initialState: FilterSliceState = {
  searchStudent: {},
  searchAmbassador: {},
  status: Status.NOT,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearchStudent.pending, (state, action) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchSearchStudent.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.searchStudent = action.payload;
    });

    builder.addCase(fetchSearchStudent.rejected, (state, action) => {
      state.status = Status.ERROR;
    });

    builder.addCase(fetchSearchAmbassador.pending, (state, action) => {
      state.status = Status.LOADING;
    });

    builder.addCase(fetchSearchAmbassador.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.searchAmbassador = action.payload;
    });

    builder.addCase(fetchSearchAmbassador.rejected, (state, action) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
