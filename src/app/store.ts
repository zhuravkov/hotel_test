import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import roomsReducer, { RoomsSaga } from './../features/rooms/RoomsSlice';

import createSagaMiddleware from 'redux-saga'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// const middleware = [sagaMiddleware];
const middleware = [...getDefaultMiddleware({ thunk: true }), sagaMiddleware];



export const store = configureStore({
  reducer: {
    roomsReducer,
  },
   middleware
});

// then run the saga
sagaMiddleware.run(RoomsSaga)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
