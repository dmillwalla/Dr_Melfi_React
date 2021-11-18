import { GET_PSYCHO_METADATA } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case GET_PSYCHO_METADATA:
      //   console.log("get actor reducer", action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
