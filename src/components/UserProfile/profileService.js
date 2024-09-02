import axios from '../../axios';

const profileService = {
    getProfile: async (token) => {
        const response = await axios.get('profile/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Response:', response);
        return response.data;
    },
    updateProfile: async (profileData, token) => {
        const response = await axios.put('profile/', profileData, {
            headers: {
                'Content-Type'  : 'multipart/form-data',
                'Authorization' : `Bearer ${token}`
            }
        });
        return response.data;
    }
};

export default profileService;
