import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Status } from '../auth/authSlice';
import { IStudentToUniversity } from '../filter/filterSlice';

interface StudentSliceState {
  approvedStudents: {
    students: IStudentToUniversity[];
    lastCurrentDoc: any;
    firstCurrentDoc: any;
    secondCurrentDoc: any;
    currentPage: number;
    pageLimit: number;
    status: Status;
  };
  pendingStudents: {
    students: IStudentToUniversity[];
    lastCurrentDoc: any;
    firstCurrentDoc: any;
    secondCurrentDoc: any;
    currentPage: number;
    pageLimit: number;
    status: Status;
  };
}

const initialState: StudentSliceState = {
  approvedStudents: {
    students: [],
    lastCurrentDoc: null,
    firstCurrentDoc: null,
    secondCurrentDoc: null,
    currentPage: 1,
    pageLimit: 2,
    status: Status.NOT,
  },
  pendingStudents: {
    students: [],
    lastCurrentDoc: null,
    firstCurrentDoc: null,
    secondCurrentDoc: null,
    currentPage: 1,
    pageLimit: 2,
    status: Status.NOT,
  },
};

interface setStudentsPayload {
  students: IStudentToUniversity[];
  lastCurrentDoc: any;
  firstCurrentDoc: any;
  secondCurrentDoc: any;
  currentPage: number;
  pageLimit?: number;
}

const studentsSlice = createSlice({
  name: 'studentsToUniversity',
  initialState,
  reducers: {
    setStudentsApprovedToUniversity(state, action: PayloadAction<setStudentsPayload>) {
      state.approvedStudents.students = action.payload.students;
      state.approvedStudents.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.approvedStudents.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.approvedStudents.currentPage = action.payload.currentPage;
      state.approvedStudents.secondCurrentDoc = action.payload.secondCurrentDoc;
      // state.approvedVideos.pageLimit = action.payload.pageLimit;
    },
    setStudentsPendingToUniversity(state, action: PayloadAction<setStudentsPayload>) {
      state.pendingStudents.students = action.payload.students;
      state.pendingStudents.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.pendingStudents.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.pendingStudents.currentPage = action.payload.currentPage;
      state.pendingStudents.secondCurrentDoc = action.payload.secondCurrentDoc;
      // state.approvedVideos.pageLimit = action.payload.pageLimit;
    },
  },
  extraReducers(builder) {},
});

export const { setStudentsApprovedToUniversity, setStudentsPendingToUniversity } =
  studentsSlice.actions;
export default studentsSlice.reducer;
