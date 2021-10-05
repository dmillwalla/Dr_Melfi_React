import _ from "lodash";
import { GET_PREFERENCES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_PREFERENCES:
      return { ...action.payload };
    default:
      return state;
  }
};
