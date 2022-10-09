import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IChatGroupToUniversity {
  access: 'all' | 'apply' | 'commit';
  ambassadorsId: string[];
  description: string;
  id: string;
  name: string;
  photo: string;
  universityId: string;
  universityName: string;
  usersId: string[];
  blackList: string[];
}

interface ChatGroupsSliceState {
  chatGroups: IChatGroupToUniversity[];
  lastCurrentDoc: any;
  firstCurrentDoc: any;
  secondCurrentDoc: any;
  currentPage: number;
  pageLimit: number;
}

interface SetChatGroupsPayload {
  chatGroups: IChatGroupToUniversity[];
  lastCurrentDoc: any;
  firstCurrentDoc: any;
  secondCurrentDoc: any;
  currentPage: number;
}

interface SetGroupImagePayload {
  groupId: string;
  url: string;
}

const initialState: ChatGroupsSliceState = {
  chatGroups: [],
  lastCurrentDoc: null,
  firstCurrentDoc: null,
  secondCurrentDoc: null,
  currentPage: 1,
  pageLimit: 10,
};

const chatGroupsSlice = createSlice({
  name: 'chatGroupUniversity',
  initialState,
  reducers: {
    setChatGroups(state, action: PayloadAction<SetChatGroupsPayload>) {
      state.chatGroups = action.payload.chatGroups;
      state.lastCurrentDoc = action.payload.lastCurrentDoc;
      state.firstCurrentDoc = action.payload.firstCurrentDoc;
      state.currentPage = action.payload.currentPage;
      state.secondCurrentDoc = action.payload.secondCurrentDoc;
    },
    setGroupImage(state, action: PayloadAction<SetGroupImagePayload>) {
      state.chatGroups = state.chatGroups.map((group) => {
        if (group.id === action.payload.groupId) {
          group.photo = action.payload.url;
        }
        return group;
      });
    },
  },
  extraReducers(builder) {},
});

export const { setChatGroups, setGroupImage } = chatGroupsSlice.actions;
export default chatGroupsSlice.reducer;
