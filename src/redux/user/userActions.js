import { LOGIN_ACTION, LOGOUT_ACTION } from "./userTypes";

export const login = (data) => {
  return {
    type: LOGIN_ACTION,
    payload: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT_ACTION,
    payload: null,
  };
};
