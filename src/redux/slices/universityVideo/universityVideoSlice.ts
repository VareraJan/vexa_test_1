import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../auth/authSlice';

export type IVideo = {
  ambassadorID: string;
  ambassadorName: string;
  comments: string[];
  createdAt: { seconds: number; nanoseconds: number };
  duration: string;
  id: string;
  likes: string[];
  status: 'pending' | 'reject' | 'approved';
  tag: string;
  title: string;
  universityID: string;
  universityName: string;
  url: string;
};

export interface UniversityVideoState {
  approvedVideos: {
    videos: IVideo[];
    lastCurrentDoc: any;
    firstCurrentDoc: any;
    secondCurrentDoc: any;
    currentPage: number;
    pageLimit: number;
    status: Status;
  };
  allVideos: {
    videos: IVideo[];
    lastCurrentDoc: any;
    firstCurrentDoc: any;
    secondCurrentDoc: any;
    currentPage: number;
    pageLimit: number;
    status: Status;
  };
}
// export interface UniversityVideoState {
//   approvedVideos: IVideo[];
//   allVideos: {
//     videos: IVideo[];
//     currentPage: number;
//     fullPage: number;
//     itemsToPage: number;
//     status: Status;
//   };
//   currentPage: number;
//   fullPage: number;
//   itemsToPage: number;
//   status: Status;
// }
const initialState: UniversityVideoState = {
  approvedVideos: {
    videos: [],
    lastCurrentDoc: null,
    firstCurrentDoc: null,
    secondCurrentDoc: null,
    currentPage: 1,
    pageLimit: 6,
    status: Status.NOT,
  },
  allVideos: {
    videos: [],
    lastCurrentDoc: null,
    firstCurrentDoc: null,
    secondCurrentDoc: null,
    currentPage: 1,
    pageLimit: 6,
    status: Status.NOT,
  },
};

interface setVideosPayload {
  videos: IVideo[];
  lastCurrentDoc: any;
  firstCurrentDoc: any;
  secondCurrentDoc: any;
  currentPage: number;
  pageLimit?: number;
}

export const universityVideoSlice = createSlice({
  name: 'universityVideo',
  initialState,
  reducers: {
    setApprovedVideos(state, action: PayloadAction<setVideosPayload>) {
      state.approvedVideos.videos = action.payload.videos;
      state.approvedVideos.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.approvedVideos.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.approvedVideos.currentPage = action.payload.currentPage;
      state.approvedVideos.secondCurrentDoc = action.payload.secondCurrentDoc;
      // state.approvedVideos.pageLimit = action.payload.pageLimit;
    },
    setAllVideos(state, action: PayloadAction<setVideosPayload>) {
      state.allVideos.videos = action.payload.videos;
      state.allVideos.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.allVideos.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.allVideos.currentPage = action.payload.currentPage;
      state.allVideos.secondCurrentDoc = action.payload.secondCurrentDoc;
      // state.approvedVideos.pageLimit = action.payload.pageLimit;
    },
  },
  extraReducers(builder) {},
});

export const { setApprovedVideos, setAllVideos } = universityVideoSlice.actions;
export default universityVideoSlice.reducer;
