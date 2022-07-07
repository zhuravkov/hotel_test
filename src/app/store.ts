import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';

import roomsReducer from './../features/rooms/RoomsSlice';
import calculateReduser from './../features/calculate/CalculateSlice'

import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// const middleware = [sagaMiddleware];
const middleware = [...getDefaultMiddleware({ thunk: true }), sagaMiddleware];



export const store = configureStore({
  reducer: {
    roomsReducer,
    calculateReduser,
  },
   middleware
});

// then run the saga
sagaMiddleware.run(rootSaga)


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
