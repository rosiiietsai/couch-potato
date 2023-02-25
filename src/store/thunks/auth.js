import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from '../../configs/firebase';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = {
      id: res.user.uid,
      displayName: res.user.displayName,
      email: res.user.email,
    };
    return user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await signOut(auth);
});

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ email, password, displayName }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // add display name to user
    await updateProfile(res.user, { displayName });
    const user = {
      id: res.user.uid,
      displayName: displayName,
      email: res.user.email,
    };
    return user;
  }
);
