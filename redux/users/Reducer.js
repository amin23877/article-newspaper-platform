import {
    SET_USER_INFO
} from "./Actions";

const defaultState = {
    userInfo: null,
};

export default (state = defaultState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: payload
            }
        default:
            return state;
    }
};