import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IAmbassadorsToUniversity } from '../ambassadors/ambassadorsSlice';
import { IStudentToUniversity } from './filterSlice';

export const fetchSearchStudent = createAsyncThunk<IStudentToUniversity, string>(
  'filters/fetchSearchStudentStatus',
  async (emailStudent) => {
    const { data } = await axios.post<IStudentToUniversity>(
      'url_searchStudent_farebase',
      {email: emailStudent},
    );
    return data;
  },
);

export const fetchSearchAmbassador = createAsyncThunk<IAmbassadorsToUniversity, string>(
  'filters/fetchSearchAmbassadorStatus',
  async (emailAmbassador) => {
    const { data } = await axios.post<IAmbassadorsToUniversity>(
      'url_searchAmbassador_farebase',
      {email: emailAmbassador},
    );
    return data;
  },
);
