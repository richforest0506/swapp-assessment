import { configureStore } from '@reduxjs/toolkit';
import selectReducer from '../features/counter/selectSlice';

export const store = configureStore({
  reducer: {
    select: selectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
