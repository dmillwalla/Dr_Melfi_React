import _ from "lodash";
import { GET_SOLICITATION_UPDATES } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case GET_SOLICITATION_UPDATES:
      return { ...state, ..._.mapKeys(action.payload, "row_id") };
    default:
      return state;
  }
};
