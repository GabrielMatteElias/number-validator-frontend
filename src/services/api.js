// api.js
import axios from 'axios';

const API_BASE_URL = 'https://validawhats-bkd.onrender.com/v1';

const api = axios.create({
    baseURL: API_BASE_URL,
});

// Interceptor opcional para incluir o token automaticamente
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
