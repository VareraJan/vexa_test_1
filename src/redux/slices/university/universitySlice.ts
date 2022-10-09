import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../auth/authSlice';

export interface IUniversity {
  id: string;
  email: string;
  name: string;
  location: { latitude: number; longitude: number };
  region: string;
  form: 'community college' | 'university';
  website: string;
  image: string;
  photos: string[];
  // photos: string[];
  prospectsCount?: number;
  ambassadorsCount?: number;
  approvedVideosCount?: number;
  chatGroupCount?: number;
  type: { duration: string; belonging: string };
  size: { students: number; international: number };
  // admission: string;
  information: string;
  accomodation: string;
  phone: string;
  price: number;
  password?: { currency: string; new: string };
}

interface universitySliceState {
  status: Status;
  user: IUniversity | null;
}

const initialState: universitySliceState = {
  status: Status.NOT,
  user: null,
};

const universitySlice = createSlice({
  name: 'university',
  initialState,
  reducers: {
    setUserUniversity(state, action: PayloadAction<IUniversity>) {
      state.user = action.payload;
    },
    setUserUniversityImage(state, action: PayloadAction<string>) {
      if (state.user) state.user.image = action.payload;
    },
    removeUserUniversity(state) {
      state.status = Status.NOT;
      state.user = null;
    },
  },
  extraReducers(builder) {},
});

export const { setUserUniversity, removeUserUniversity, setUserUniversityImage } =
  universitySlice.actions;
export default universitySlice.reducer;
