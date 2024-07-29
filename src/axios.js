import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://render-usermanage-backend.onrender.com/api/', 
    headers: {
        'Content-Type': 'application/json',
    },
  });

export default instance;
