import _ from "lodash";
import { REQUEST_PENDING, REQUEST_COMPLETED } from "../actions/types";

export default (state = "", action) => {
  switch (action.type) {
    case REQUEST_PENDING:
      return REQUEST_PENDING;
    case REQUEST_COMPLETED:
      return REQUEST_COMPLETED;
    default:
      return state;
  }
};
