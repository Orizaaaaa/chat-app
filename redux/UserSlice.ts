import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: {},
    },
    reducers: {
        addUser: (state, action) => {
            state.userList = action.payload;
        },
        logout: (state) => {
            state.userList = {};
        }
    }
});

export const { addUser, logout } = userSlice.actions;
export default userSlice.reducer;
