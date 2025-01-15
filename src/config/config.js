import axios from 'axios';
const URL = 'https://adminpanel-backend-1-4y7t.onrender.com/';
// const URL = 'http://localhost:7000/';
 


const Axios = axios.create({
    baseURL: URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json'
    },
});

Axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default Axios;