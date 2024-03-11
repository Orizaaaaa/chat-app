const UserAuthReducer = (state: any = null, action: any) => {
    if (action.type === 'SET USER') {
        return { ...state, user: action.user };
    } else if (action.type === 'SET_USER_NULL') {
        return { ...state, user: null };
    } else {
        return state
    }
};

export default UserAuthReducer