import { configureStore } from '@reduxjs/toolkit';
import ProjectSlice from './reducers/project/project.slice';

export const store = configureStore({
  reducer: {
    project: ProjectSlice
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production'
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
