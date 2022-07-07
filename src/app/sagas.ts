import { call, takeEvery, put, all, ActionPattern, ActionChannelEffect } from "redux-saga/effects";
import { AxiosError } from 'axios';
import { FetchingError, roomsCategoryFetching, RoomsCategotyType, setRoomsCategories } from "../features/rooms/RoomsSlice";
import { roomsAPI } from "../api/api";
import { calculateIsFetching, setCalculate } from "../features/calculate/CalculateSlice";


export const sagaActions = {
  FETCH_ROOMS_CATEGORY_DATA: "FETCH_ROOMS_CATEGORY_DATA",
  FETCH_CALCULATE_PRICE: "FETCH_CALCULATE_PRICE"
  };

export type CategoryResponse = {
    data: RoomsCategotyType[]
    resultCode: string
    messages: string
}

export type CalculatePayloud = {
  category: string
  arrival_date: string
  departure_date: string
}

export type CalculateResponse = {
    data: { price: number
            days : number
            avalibility: number
          }
    resultCode: string
    messages: string
  }

  
// SAGA GET DATA
function* fetchRoomsCategories() {
  try {
      yield put (roomsCategoryFetching())
      let result: CategoryResponse = yield call(roomsAPI.getCategory);
      yield put(setRoomsCategories(result.data));
  } catch (e: any) {
      let error: AxiosError = e
      yield put(FetchingError(error.message));
  }
}

function* fetchCalculate(action:{type:string, payload:CalculatePayloud}) {
// получаем от компонента данные и передаем для запроса в API вторым параметром
  try {
      yield put (calculateIsFetching())
      let result: CalculateResponse = yield call(roomsAPI.getCalculatedPrice, action.payload);
      yield put(setCalculate(result.data));
      
  } catch (e: any) {
      let error: AxiosError = e
      console.log (error)
      // yield put(FetchingError(error.message));
  }
}



function* watchRoomsFetch() {
  yield takeEvery(sagaActions.FETCH_ROOMS_CATEGORY_DATA , fetchRoomsCategories, );
}
function* watchCalculateFetch() {
  yield takeEvery(sagaActions.FETCH_CALCULATE_PRICE , fetchCalculate );
}

export default function* rootSaga() {
  yield all([
    watchRoomsFetch(),
    watchCalculateFetch(),
  ])
}