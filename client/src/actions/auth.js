import * as api from "../api/index.js";
import { SIGN_IN, SIGN_UP } from "../constants/actionTypes.js";

export const signUp = (authData, navigatTo) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    if (data) {
      dispatch({ type: SIGN_UP, payload: data });
      navigatTo("/");
    } else dispatch({ type: SIGN_UP, payload: {} });
  } catch (error) {
    console.log(error);
  }
};
export const signIn = (authData, navigateTo) => async (dispatch) => {
  try {
    const { data } = await api.signIn(authData);
    console.log(data);
    if (data) {
      dispatch({ type: SIGN_IN, payload: data });
      navigateTo("/");
    } else dispatch({ type: SIGN_IN, payload: null });
  } catch (error) {
    console.log(error);
  }
};
