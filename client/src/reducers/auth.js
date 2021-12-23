import { AUTH, SIGN_IN, SIGN_UP } from "../constants/actionTypes.js";

const reducer = (authData = null, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;

    case SIGN_UP:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    case SIGN_IN:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    default:
      return authData;
  }
};

export default reducer;
