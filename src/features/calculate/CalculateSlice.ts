import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalculateResponse } from '../../app/sagas';
import { RootState } from '../../app/store';


// export type RoomsCategotyType = {
//     id: number
//     title: string
//     content: string
//     image: string
//     additionalImg: [{
//       id: number
//       image: string
//     }]
// }
type CalculateData = {
  price: number
  days: number
  avalibility: number
}


type CalculateState = {
  calculateData: CalculateData | {}
  isLoading: boolean
  error: string
}


const initialState: CalculateState = {
  calculateData: {},
  isLoading: false,
  error: '',
};


const CalculateSlice = createSlice({
    name: 'calculate',
    initialState,
    reducers: {

      calculateIsFetching : (state) => {
        state.isLoading = true
      },

      setCalculate: (state, action: PayloadAction<CalculateData>) => {
        state.isLoading = false
        state.error = ''
        state.calculateData = action.payload
      },
      FetchingError: (state, action: PayloadAction<string>) => {
        state.isLoading = false
        state.error = action.payload
      }
    }
});


// Export AC
export const { calculateIsFetching, setCalculate, FetchingError } = CalculateSlice.actions;
// Export SELECTORS
export const selectCalculateData = (state: RootState) =>  state.calculateReduser.calculateData


// selecting posts from origins 
// export const selectRoomsCategoty = (state: RootState) =>  state.roomsReducer.roomsCategory
// export const currentCategoty = (state: RootState) =>{
//   if (state.roomsReducer.currentCutegory){
//     let currentCat = state.roomsReducer.roomsCategory.find(p => p.id===state.roomsReducer.currentCutegory)
//     return currentCat
//   }
// }

 
export default CalculateSlice.reducer;
