import { SET_USER_INFO, SET_USER_INFO_SECTION } from "./Actions";

const defaultState = {
  userInfo: null,
};

export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: payload,
      };
    case SET_USER_INFO_SECTION:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...payload,
        },
      };
    default:
      return state;
  }
};
