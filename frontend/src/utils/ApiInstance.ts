import axios from 'axios';

const token = 'your-access-token'; // Replace with your actual token

const apiInstance = axios.create({
    baseURL: 'http://localhost:1337', // Replace with your actual base URL
    headers: {
        'x-access-token': token,
    },
});

export default apiInstance;