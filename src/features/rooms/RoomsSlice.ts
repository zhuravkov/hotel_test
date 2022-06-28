import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { roomsAPI } from '../../api/api';
import { call, takeEvery, put } from "redux-saga/effects";
import { AxiosError } from 'axios';

export const sagaActions = {
  FETCH_ROOMS_CATEGORY_DATA: "FETCH_ROOMS_CATEGORY_DATA"
  };



export type RoomsCategotyType = {
    id: number
    title: string
    content: string
    image: string
    additionalImg: [{
      id: number
      image: string
    }]
}


type RoomsState = {
    roomsCategory: RoomsCategotyType[]
    isLoading: boolean
    error: string
    currentCutegory: number|null
}


const initialState: RoomsState = {
  roomsCategory: [],
  isLoading: false,
  error: '',
  currentCutegory: null
};


const RoomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {

        roomsCategoryFetching: (state) => {
            state.isLoading = true
        },

        setRoomsCategories: (state, action: PayloadAction<RoomsCategotyType[]>) => {
            state.isLoading = false
            state.error = ''
            state.roomsCategory = action.payload
        },

        FetchingError: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        setCurrentCutegory: (state,action:PayloadAction<number>) => {
          state.currentCutegory = action.payload
      },
    }
});


// Export AC
export const {roomsCategoryFetching, setRoomsCategories, FetchingError,setCurrentCutegory } = RoomsSlice.actions;



// selecting posts from origins 
export const selectRoomsCategoty = (state: RootState) =>  state.roomsReducer.roomsCategory
export const currentCategoty = (state: RootState) =>{
  if (state.roomsReducer.currentCutegory){
    let currentCat = state.roomsReducer.roomsCategory.find(p => p.id===state.roomsReducer.currentCutegory)
    return currentCat
  }
}



export type CategoryResponse = {
  data: RoomsCategotyType[]
  resultCode: string
  messages: string
}
// SAGA GET DATA
export function* fetchRoomsCategories() {
    try {
        yield put (roomsCategoryFetching())
        let result: CategoryResponse = yield call(roomsAPI.getCategory);
        yield put(setRoomsCategories(result.data));
    } catch (e: any) {
        let error: AxiosError = e
        yield put(FetchingError(error.message));
    }
}


export function* RoomsSaga() {
    yield takeEvery(sagaActions.FETCH_ROOMS_CATEGORY_DATA , fetchRoomsCategories);
  }
 
export default RoomsSlice.reducer;
