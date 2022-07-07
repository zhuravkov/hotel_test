import axios from 'axios';
import { CalculatePayloud, CalculateResponse } from '../app/sagas';
import { RoomsCategotyType } from '../features/rooms/RoomsSlice';


export type CategoryResponse = {
  data: RoomsCategotyType[]
  resultCode: string
  messages: string
}

export type BookingResponseData = {
    adult: number
    agreement: boolean
    arrival_date: string
    child_age: string
    childeren: number
    client_name: string
    departure_date: string
    done: false
    id: number
    order_name: string
    paid: false
    phone: string
    room: number
    days: number
    price: number
  }

export type BookingResponse = {
  data: BookingResponseData
  resultCode: number
  messages: string
}


const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    // baseURL: 'http://project-django.ru/api/',
});


export const roomsAPI = {
    async getCategory() {
        const response = await instance.get<CategoryResponse>(`categories`);
        return response.data;
    },
    async getCalculatedPrice(payload:CalculatePayloud) {
     let {category, arrival_date, departure_date} = payload
      const response = await instance.get<CalculateResponse>
      (`calculate?category=${category}&arrival_date=${arrival_date}&departure_date=${departure_date}`) 
      return response.data;
  },
  async postOrder(payload:any) {
     const response = await instance.post<BookingResponse>(`order`,{...payload}) 
     return response.data;
 }
}