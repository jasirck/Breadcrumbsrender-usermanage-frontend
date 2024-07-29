import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

// Initial state
const initialState = {
    isAuthenticated: Cookies.get('isAuthenticated') || '',
    is_admin: Cookies.get('is_admin') === 'true',
    token: Cookies.get('token') || ''
};

const usermanage = createSlice({
    name: 'usermanage',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = action.payload.access;
            state.is_admin = action.payload.is_admin;
            state.token = action.payload.access;

            // Store in cookies
            Cookies.set('isAuthenticated', state.isAuthenticated);
            Cookies.set('is_admin', state.is_admin);
            Cookies.set('token', state.token);
        },
        logout: (state) => {
            state.isAuthenticated = '';
            state.is_admin = false;
            state.token = '';

            // Remove from cookies
            Cookies.remove('isAuthenticated');
            Cookies.remove('is_admin');
            Cookies.remove('token');
        }
    }
});

export default usermanage.reducer;
export const { login, logout } = usermanage.actions;
