import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sellerInfo: localStorage.getItem('sellerInfo') ? JSON.parse(localStorage.getItem('sellerInfo')) : null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.sellerInfo = action.payload;
            localStorage.setItem('sellerInfo', JSON.stringify(action.payload))
        },
        logout: (state, action) => {
            state.sellerInfo = null;
            localStorage.removeItem('sellerInfo');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;