import { LOGIN_ACTION, LOGOUT_ACTION } from "./userTypes";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return { ...initialState, user: action.payload };
    case LOGOUT_ACTION:
      return {
        user: null,
      };
    default:
      return initialState;
  }
};

export default userReducer;
