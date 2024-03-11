// Define action types
export const SET_USER = 'SET_USER';
export const SET_USER_NULL = 'SET_USER_NULL';

// Action creators
export const setUser = (user: any) => ({
    type: SET_USER,
    user: user
});

export const setUserNull = () => ({
    type: SET_USER_NULL
});
