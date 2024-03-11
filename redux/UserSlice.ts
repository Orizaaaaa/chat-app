import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: [],
    },
    reducers: {
        addUser: (state: any, action) => {
            state.userList.push(action.payload);
        },

    }
})

export const { addUser } = userSlice.actions
export default userSlice.reducer