import axios from 'axios';
import { CategoryResponse } from '../features/rooms/RoomsSlice';


const instance = axios.create({
    baseURL: 'http://localhost:8000/api/',
    // baseURL: 'http://project-django.ru/api/',
});


export const roomsAPI = {
    async getCategory() {
        const response = await instance.get<CategoryResponse>(`categories`);
        return response.data;
    }
}