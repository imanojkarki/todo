import { configureStore } from '@reduxjs/toolkit';
import todoSlice from './slices/todoSlice';
import api from './api';

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
