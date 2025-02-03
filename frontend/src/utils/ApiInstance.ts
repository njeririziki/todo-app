import axios from 'axios';

const token =sessionStorage.getItem('token') || ''; 

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL_LOCAL,
    headers: {
        'x-access-token': token,
    },
});

export default apiInstance;