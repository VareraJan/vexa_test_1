import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../auth/authSlice';

export interface IAmbassadorsToUniversity {
  birth: string;
  city: string;
  createdAt: { seconds: number; nanoseconds: number };
  email: string;
  firstName: string;
  id: string;
  image: string;
  language: string;
  lastName: string;
  status: string;
  universityID: string;
  universityName: string;
  videos: string[];
}

interface AmbassadorsSliceState {
  approvedAmbassadors: {
    ambassadors: IAmbassadorsToUniversity[];
    lastCurrentDoc: any;
    firstCurrentDoc: any;
    secondCurrentDoc: any;
    currentPage: number;
    pageLimit: number;
    status: Status;
  };
  pendingAmbassadors: {
    ambassadors: IAmbassadorsToUniversity[];
    lastCurrentDoc: any;
    firstCurrentDoc: any;
    secondCurrentDoc: any;
    currentPage: number;
    pageLimit: number;
    status: Status;
  };
}

const initialState: AmbassadorsSliceState = {
  approvedAmbassadors: {
    ambassadors: [],
    lastCurrentDoc: null,
    firstCurrentDoc: null,
    secondCurrentDoc: null,
    currentPage: 1,
    pageLimit: 2,
    status: Status.NOT,
  },
  pendingAmbassadors: {
    ambassadors: [],
    lastCurrentDoc: null,
    firstCurrentDoc: null,
    secondCurrentDoc: null,
    currentPage: 1,
    pageLimit: 2,
    status: Status.NOT,
  },
};

interface setAmbassadorsPayload {
  ambassadors: IAmbassadorsToUniversity[];
  lastCurrentDoc: any;
  firstCurrentDoc: any;
  secondCurrentDoc: any;
  currentPage: number;
  pageLimit?: number;
}

const ambassadorsSlice = createSlice({
  name: 'ambassadorsToUniversity',
  initialState,
  reducers: {
    setAmbassadorsApprovedToUniversity(state, action: PayloadAction<setAmbassadorsPayload>) {
      state.approvedAmbassadors.ambassadors = action.payload.ambassadors;
      state.approvedAmbassadors.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.approvedAmbassadors.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.approvedAmbassadors.currentPage = action.payload.currentPage;
      state.approvedAmbassadors.secondCurrentDoc = action.payload.secondCurrentDoc;
      // state.approvedVideos.pageLimit = action.payload.pageLimit;
    },
    setAmbassadorsPendingToUniversity(state, action: PayloadAction<setAmbassadorsPayload>) {
      state.pendingAmbassadors.ambassadors = action.payload.ambassadors;
      state.pendingAmbassadors.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.pendingAmbassadors.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.pendingAmbassadors.currentPage = action.payload.currentPage;
      state.pendingAmbassadors.secondCurrentDoc = action.payload.secondCurrentDoc;
      // state.approvedVideos.pageLimit = action.payload.pageLimit;
    },
  },
  extraReducers() {},
});

export const { setAmbassadorsApprovedToUniversity, setAmbassadorsPendingToUniversity } =
  ambassadorsSlice.actions;
export default ambassadorsSlice.reducer;
