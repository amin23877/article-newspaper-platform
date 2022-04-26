export const SET_USER_INFO = "setUserInfo";
export const SET_USER_INFO_SECTION = "setUserInfoSection";
export const SET_TIMEZONES = "setTimezones";

export const setUserInfo = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: SET_USER_INFO,
      payload: payload,
    });
    return;
  } catch (e) {
    console.log(e);
  }
};

export const setUserInfoSection = (section, value) => async (dispatch) => {
  try {
    dispatch({
      type: SET_USER_INFO_SECTION,
      payload: { [section]: value },
    });
  } catch (e) {
    console.log(e);
  }
};
