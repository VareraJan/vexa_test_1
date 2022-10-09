import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ambassadorsSlice from './slices/ambassadors/ambassadorsSlice';
import authSlice from './slices/auth/authSlice';
import chatGroupsSlice from './slices/chatGroups/chatGroupsSlice';
import filterSlice from './slices/filter/filterSlice';
import studentsSlice from './slices/students/studentsSlice';
import universitySlice from './slices/university/universitySlice';
import universityVideoSlice from './slices/universityVideo/universityVideoSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  filter: filterSlice,
  students: studentsSlice,
  ambassadors: ambassadorsSlice,
  universityVideos: universityVideoSlice,
  university: universitySlice,
  chatGroupUniversity: chatGroupsSlice,
});

export function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
