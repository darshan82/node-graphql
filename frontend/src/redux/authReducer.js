import { CHANGE_EMAIL, CHANGE_PASSWORD } from "./actionType";

const initState = { email: "test@gmail.com", password: "", gender: "" };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initState, action) {
  switch (action.type) {
    case CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
}
