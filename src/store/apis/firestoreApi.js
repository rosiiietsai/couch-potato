import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
} from 'firebase/firestore';

import { db } from '../../configs/firebase';

export const firestoreApi = createApi({
  reducerPath: 'firestore',
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    fetchCollection: builder.query({
      providesTags: (result, error, { subcollection }) => [subcollection],
      async queryFn({ user, subcollection }) {
        if (!user) return { error: 'Please login to fetch your data' };

        try {
          const ref = collection(db, 'users', user.id, subcollection);
          const querySnapshot = await getDocs(ref);

          if (querySnapshot.empty) return { error: 'No data to load' };
          let fetchedCollection = [];
          querySnapshot.forEach(doc => {
            fetchedCollection.push({ ...doc.data(), id: doc.id });
          });
          return { data: fetchedCollection };
        } catch (err) {
          return { error: err };
        }
      },
    }),
    addDocument: builder.mutation({
      invalidatesTags: (result, error, { subcollection }) => [subcollection],
      async queryFn({ user, subcollection, id, document }) {
        try {
          // id must be a string
          const ref = doc(db, 'users', user.id, subcollection, id.toString());
          const addedDocument = await setDoc(ref, document);
          return { data: addedDocument };
        } catch (err) {
          return { error: err };
          // return { error: err.message };
        }
      },
    }),
    deleteDocument: builder.mutation({
      invalidatesTags: (result, error, { subcollection }) => [subcollection],
      async queryFn({ user, subcollection, id }) {
        try {
          // id must be a string
          const ref = doc(db, 'users', user.id, subcollection, id.toString());
          await deleteDoc(ref);
          return { data: null };
        } catch (err) {
          return { error: 'Could not delete' };
        }
      },
    }),
    updateDocument: builder.mutation({
      invalidatesTags: (result, error, { subcollection }) => [subcollection],
      async queryFn({ user, subcollection, id, updates }) {
        try {
          // id must be a string
          const ref = doc(db, 'users', user.id, subcollection, id.toString());
          const updatedDocument = await updateDoc(ref, updates);
          return { data: updatedDocument };
        } catch (err) {
          return { error: err.message };
        }
      },
    }),
  }),
});

export const {
  useFetchCollectionQuery,
  useAddDocumentMutation,
  useDeleteDocumentMutation,
  useUpdateDocumentMutation,
} = firestoreApi;
