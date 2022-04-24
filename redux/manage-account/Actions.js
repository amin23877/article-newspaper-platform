export const CHANGE_ACTIVE_MENU = "changeActiveMenu";

export const changeActiveMenu = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_ACTIVE_MENU,
      payload: payload,
    });
  } catch (e) {
    console.log(e);
  }
};
