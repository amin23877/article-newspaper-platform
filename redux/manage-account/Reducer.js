import { CHANGE_ACTIVE_MENU } from "./Actions";

const defaultState = {
  activeMenu: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: payload,
      };
    default:
      return state;
  }
};
