import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://render-usermanage-backend.onrender.com/api/', 
    baseURL: 'http://127.0.0.1:8000/api/', 
    headers: {
        'Content-Type': 'application/json',
    },
  });

export default instance;
