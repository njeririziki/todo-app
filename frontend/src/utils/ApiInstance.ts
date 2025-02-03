import axios from 'axios';

const token = 'your-access-token'; // Replace with your actual token

const apiInstance = axios.create({
    baseURL: 'http://localhost:1337', //import.meta.env.VITE_API_URL_LOCAL 
    headers: {
        'x-access-token': token,
    },
});

export default apiInstance;