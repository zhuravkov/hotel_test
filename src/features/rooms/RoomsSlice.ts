import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export type RoomsCategotyType = {
    id: number
    title: string
    content: string
    image: string
    category_slug:string
    price: number
    additionalImg: [{
      id: number
      image: string
    }]
}


type RoomsState = {
    roomsCategory: RoomsCategotyType[]
    isLoading: boolean
    error: string
    currentCutegory: string
}


const initialState: RoomsState = {
  roomsCategory: [],
  isLoading: false,
  error: '',
  currentCutegory: ''
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
        setCurrentCutegory: (state,action:PayloadAction<string>) => {

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
    let currentCat = state.roomsReducer.roomsCategory.find(p => p.category_slug===state.roomsReducer.currentCutegory)
    return currentCat  
  }
  else {return undefined}
}
export const selectMinPriceCategoty = (state: RootState) => {
  if (state.roomsReducer.roomsCategory.length>0){
    let minPrice = state.roomsReducer.roomsCategory.slice().sort((a,b) => a.price - b.price)[0][`price`];
  return minPrice
  }
}

 
export default RoomsSlice.reducer;
