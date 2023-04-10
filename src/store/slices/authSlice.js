import { createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from '../thunks/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    authIsChecked: false,
  },
  reducers: {
    authIsChecked(state, action) {
      state.user = action.payload;
      state.authIsChecked = true;
    },
  },
  // from async thunk
  extraReducers: builder => {
    builder
      // login
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message.replace('Firebase: ', '');
      })
      // logout
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message.replace('Firebase: ', '');
      })
      // signup
      .addCase(signup.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message.replace('Firebase: ', '');
      });
  },
});

export const { authIsChecked } = authSlice.actions;
export const authReducer = authSlice.reducer;
